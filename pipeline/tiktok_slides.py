"""TikTok photo-carousel generator for the "Road to PS5" account (roadtops5.gta6, Metricool brand 8179515).

Usage:  python3 pipeline/tiktok_slides.py channels/tiktok/posts/<id>.json [--subs N]
Output: channels/tiktok/build/<id>/s1.jpg … sN.jpg (1080x1920) + sheet.jpg (git-ignored: official Rockstar
screenshots must never be committed). Source screenshots: channels/tiktok/build/src/<Name>_0n.jpg from
rockstargames.com/VI/downloads/screenshots (Rockstar "download and share"; credit on every slide).

Spec: {"slides":[{"img":"Vice_City_01","kicker":"GTA 6 SECRET","title":"NEVER STEAL\\nTHIS CAR","sub":"…","hl":"y|r|c"}, …],
       "goal": true}   → a final goal slide (PS5 + GTA 6, subscriber counter, LINK IN BIO) is appended.
Slide 1 = full-bleed hook slide; other slides = picture card + text.
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "channels", "tiktok", "build", "src")
F = "/usr/share/fonts/opentype/inter/Inter-%s.otf"
W, H = 1080, 1920
COL = {"y": (255, 214, 64), "r": (255, 77, 77), "c": (110, 210, 255), "w": (255, 255, 255)}


def font(w, s):
    return ImageFont.truetype(F % w, s)


def cover(img, w, h):
    r = max(w / img.width, h / img.height)
    im = img.resize((int(img.width * r + 1), int(img.height * r + 1)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def wrap(d, text, f, maxw):
    out = []
    for para in text.split("\n"):
        line = ""
        for wd in para.split():
            t = (line + " " + wd).strip()
            if d.textlength(t, font=f) <= maxw:
                line = t
            else:
                if line: out.append(line)
                line = wd
        out.append(line)
    return out


def text_block(d, y, text, f, fill, maxw=980, gap=12, shadow=True):
    text = "".join(ch for ch in text if ord(ch) < 0x2190 or ch in "→")  # Inter has no emoji glyphs
    for ln in wrap(d, text, f, maxw):
        tw = d.textlength(ln, font=f)
        x = (W - tw) / 2
        if shadow:
            d.text((x + 4, y + 5), ln, font=f, fill=(0, 0, 0))
        d.text((x, y), ln, font=f, fill=fill)
        y += f.size + gap
    return y


def fit_font(d, text, weight, start, maxw, minsize=60):
    s = start
    while s > minsize and max(d.textlength(l, font=font(weight, s)) for l in text.split("\n")) > maxw:
        s -= 4
    return font(weight, s)


def backdrop(src):
    bg = cover(src, W, H).filter(ImageFilter.GaussianBlur(28))
    bg = ImageEnhance.Brightness(bg).enhance(0.42)
    return bg


def card(canvas, src, y, h=560):
    w = 1000
    im = cover(src, w, h)
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w, h), 26, fill=255)
    x = (W - w) // 2
    ImageDraw.Draw(canvas).rounded_rectangle((x - 5, y - 5, x + w + 5, y + h + 5), 30, fill=(255, 255, 255))
    canvas.paste(im, (x, y), m)
    d = ImageDraw.Draw(canvas)
    f = font("Bold", 22)
    t = "IMAGE: ROCKSTAR GAMES"
    d.text((x + w - d.textlength(t, font=f) - 6, y + h + 14), t, font=f, fill=(220, 220, 220))
    return y + h


def hook_slide(s):
    src = Image.open(os.path.join(SRC, s["img"] + ".jpg")).convert("RGB")
    c = cover(src, W, H)
    grad = Image.new("L", (1, H))
    for i in range(H):
        a = 0.75 if i < 700 else (0.15 if i < 1250 else 0.15 + 0.7 * (i - 1250) / 670)
        if i < 700: a = 0.78 - 0.6 * i / 700
        grad.putpixel((0, i), int(255 * a))
    c = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), c, grad.resize((W, H)))
    d = ImageDraw.Draw(c)
    y = 250
    if s.get("kicker"):
        fk = font("Black", 54)
        tw = d.textlength(s["kicker"], font=fk)
        d.rounded_rectangle(((W - tw) / 2 - 26, y - 12, (W + tw) / 2 + 26, y + 70), 16, fill=COL["r"])
        d.text(((W - tw) / 2, y), s["kicker"], font=fk, fill=(255, 255, 255))
        y += 120
    ft = fit_font(d, s["title"], "Black", 128, 1000)
    y = text_block(d, y, s["title"], ft, COL[s.get("hl", "w")], gap=8)
    if s.get("sub"):
        text_block(d, 1560, s["sub"], font("ExtraBold", 54), (255, 255, 255))
    f = font("Bold", 24); t = "IMAGE: ROCKSTAR GAMES"
    d.text((W - d.textlength(t, font=f) - 30, H - 60), t, font=f, fill=(200, 200, 200))
    return c


def info_slide(s):
    src = Image.open(os.path.join(SRC, s["img"] + ".jpg")).convert("RGB")
    c = backdrop(src)
    y = card(c, src, 230, 760) + 110
    d = ImageDraw.Draw(c)
    if s.get("kicker"):
        y = text_block(d, y, s["kicker"], font("Black", 62), COL["c"]) + 10
    ft = font("Black", 112)
    y = text_block(d, y, s["title"], ft, COL[s.get("hl", "y")], gap=4) + 26
    if s.get("sub"):
        text_block(d, y, s["sub"], font("ExtraBold", 62), (255, 255, 255), maxw=960, gap=10)
    return c


def goal_slide(img, subs):
    src = Image.open(os.path.join(SRC, img + ".jpg")).convert("RGB")
    c = backdrop(src)
    y = card(c, src, 230, 560) + 100
    d = ImageDraw.Draw(c)
    y = text_block(d, y, "MY GOAL:", font("Black", 78), COL["y"])
    y = text_block(d, y, "PS5 + GTA 6", font("Black", 112), (255, 255, 255)) + 20
    y = text_block(d, y, "Help me hit 1,000 subscribers", font("ExtraBold", 50), COL["c"])
    y = text_block(d, y, "Subscribe + watch 2 videos.\n2 min for you, a dream for me.", font("ExtraBold", 50), (255, 255, 255), gap=8) + 30
    bx, bw = 110, W - 220
    d.rounded_rectangle((bx, y, bx + bw, y + 46), 23, fill=(40, 40, 60))
    fw = max(46, int(bw * min(subs, 1000) / 1000))
    d.rounded_rectangle((bx, y, bx + fw, y + 46), 23, fill=COL["r"])
    y += 80
    y = text_block(d, y, f"{subs:,} / 1,000", font("Black", 58), (255, 255, 255)) + 16
    y = text_block(d, y, "LINK IN BIO", font("Black", 74), COL["y"]) + 10
    text_block(d, y, "@StrangeMinuteOfficial", font("ExtraBold", 44), (255, 255, 255))
    return c


def goal_hook(img, subs, teaser):
    """Slide 1 (owner 2026-11-20): the ask first — help me get YouTube subs for PS5 + GTA 6 — then the facts."""
    src = Image.open(os.path.join(SRC, img + ".jpg")).convert("RGB")
    c = cover(src, W, H)
    grad = Image.new("L", (1, H))
    for i in range(H):
        a = 0.82 - 0.55 * i / 800 if i < 800 else (0.27 if i < 1150 else 0.27 + 0.63 * (i - 1150) / 770)
        grad.putpixel((0, i), int(255 * max(0, min(1, a))))
    c = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), c, grad.resize((W, H)))
    d = ImageDraw.Draw(c)
    y = text_block(d, 190, "HELP ME", font("Black", 150), COL["y"], gap=0)
    y = text_block(d, y, "GET 1,000 YOUTUBE\nSUBSCRIBERS", font("Black", 88), (255, 255, 255), gap=4) + 20
    fk = font("Black", 64); t = "TO BUY PS5 + GTA 6"
    tw = d.textlength(t, font=fk)
    d.rounded_rectangle(((W - tw) / 2 - 30, y - 10, (W + tw) / 2 + 30, y + 86), 18, fill=COL["r"])
    d.text(((W - tw) / 2, y), t, font=fk, fill=(255, 255, 255))
    y = 1240
    bx, bw = 110, W - 220
    d.rounded_rectangle((bx, y, bx + bw, y + 46), 23, fill=(40, 40, 60))
    d.rounded_rectangle((bx, y, bx + max(46, int(bw * min(subs, 1000) / 1000)), y + 46), 23, fill=COL["r"])
    y = text_block(d, y + 76, f"{subs:,} / 1,000 SUBSCRIBERS", font("Black", 60), (255, 255, 255)) + 6
    y = text_block(d, y, "YouTube: @StrangeMinuteOfficial  ·  link in bio", font("ExtraBold", 42), COL["c"]) + 40
    text_block(d, y, teaser, font("Black", 62), COL["y"], gap=6)
    f = font("Bold", 24); t = "IMAGE: ROCKSTAR GAMES"
    d.text((W - d.textlength(t, font=f) - 30, H - 60), t, font=f, fill=(200, 200, 200))
    return c


def main():
    spec_path = sys.argv[1]
    subs = int(sys.argv[sys.argv.index("--subs") + 1]) if "--subs" in sys.argv else 10
    spec = json.load(open(spec_path))
    pid = os.path.splitext(os.path.basename(spec_path))[0]
    out = os.path.join(ROOT, "channels", "tiktok", "build", pid)
    os.makedirs(out, exist_ok=True)
    imgs = []
    if spec.get("goal_first", True):
        h = spec["slides"][0]
        teaser = spec.get("teaser") or ("SWIPE: " + h["title"].replace("\n", " ") + " →")
        imgs.append(goal_hook(h["img"], subs, teaser))
        imgs += [info_slide(s) for s in spec["slides"][1:]]  # slide 0 = teaser only
    else:
        imgs = [hook_slide(s) if i == 0 else info_slide(s) for i, s in enumerate(spec["slides"])]
    if spec.get("goal", True) and not spec.get("goal_first", True):
        imgs.append(goal_slide(spec.get("goal_img", spec["slides"][-1]["img"]), subs))
    paths = []
    for i, im in enumerate(imgs, 1):
        p = os.path.join(out, f"s{i}.jpg")
        im.save(p, quality=90)
        paths.append(p)
    sw = 270
    sheet = Image.new("RGB", (sw * len(imgs), 480), (0, 0, 0))
    for i, im in enumerate(imgs):
        sheet.paste(im.resize((sw, 480)), (i * sw, 0))
    sheet.save(os.path.join(out, "sheet.jpg"), quality=85)
    print("\n".join(paths))


if __name__ == "__main__":
    main()
