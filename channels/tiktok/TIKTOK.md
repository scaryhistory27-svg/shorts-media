# TikTok "Road to PS5" (@roadtops5.gta6) — promotes Strange Minute (owner 2026-11-20)

- Connected in Metricool brand **8179515** (Strange Minute), provider `tiktok`. Owner made it a Business account.
- Goal message (owner): "My goal: PS5 + GTA 6 with my YouTube channel — help me hit 1,000 subs. Subscribe + watch 2 videos, 2 minutes for you."
- **Cadence: 4 photo-carousel posts EVERY day (owner 2026-11-20).** Default LA times 08:00 · 12:00 · 16:00 · 19:30 (US morning / lunch / after school / evening); adjust once TikTok analytics exist.
- Each post (owner 2026-11-20): slide 1 = the ASK ("HELP ME get 1,000 YouTube subscribers to buy PS5 + GTA 6", counter, channel handle, swipe teaser), then 3–4 interesting GTA 6 fact slides. `python3 pipeline/tiktok_slides.py <spec> --subs <SM subs>`:
  slide 1 hook (GTA 6 secret/trend), 2–5 facts (rumors marked as unconfirmed), last = goal slide with counter + "LINK IN BIO" + "YouTube: @StrangeMinuteOfficial".
  Topics: current GTA 6 news/secrets (WebSearch each run), never repeat a topic (check posts/). Official Rockstar screenshots only (credit on every slide).
- Caption: hook + goal + `▶ YouTube: youtube.com/@StrangeMinuteOfficial` + 5–6 hashtags. `firstCommentText` = the channel link line (owner wants a pinned comment
  with the link — pinning is NOT possible via Metricool; owner pins in the app). `tiktokData: {autoAddMusic: true, title: <hook ≤ 90 chars>}` (TikTok picks a licensed sound; specific trending sounds can't be chosen via API).
- **Hosting:** Rockstar screenshots must NOT be committed to the public repo. Upload slides to litterbox.catbox.moe (72 h). 2026-11-20: litterbox returned HTTP 500 and the
  temporary-branch alternative was blocked by the session's safety check → nothing scheduled yet; retry every run; owner was offered: (a) wait, (b) approve temp branch, (c) post manually.
- Ready, not yet scheduled: tt001 easter-egg, tt002 dexter, tt003 chiliad, tt004 gellhorn, tt005 regions, tt006 cat-car, tt007 bigfoot, tt008 jetski-dog.
- **Owner 2026-11-20: "all next posts exactly like this"** — format of tt001 (ask slide → 3 fact slides) is FINAL for every post.
  Until Metricool hosting works: every autopilot run send the owner the day's 4 posts (slides via SendUserFile + caption + pinned-comment text) to post manually; owner posted #1 himself.
- Hashtags (5 per post, at the end of the caption): always `#gta6 #ps5` + 2 topic tags (e.g. #easteregg #gtasecrets / #bigfoot / #vicecity) + 1 discovery tag rotated (#gaming / #gamingontiktok / #fyp).
