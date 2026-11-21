# TikTok "Road to PS5" (@roadtops5.gta6) — promotes Strange Minute (owner 2026-11-20)

- Connected in Metricool brand **8179515** (Strange Minute), provider `tiktok`. Owner made it a Business account.
- Goal message (owner): "My goal: PS5 + GTA 6 with my YouTube channel — help me hit 1,000 subs. Subscribe + watch 2 videos, 2 minutes for you."
- **Cadence: 4 photo-carousel posts EVERY day (owner 2026-11-20).** Default LA times 08:00 · 12:00 · 16:00 · 19:30 (US morning / lunch / after school / evening); adjust once TikTok analytics exist.
- Each post (owner 2026-11-20): slide 1 = the ASK ("HELP ME get 1,000 YouTube subscribers to buy PS5 + GTA 6", counter, channel handle, swipe teaser), then 3–4 interesting GTA 6 fact slides. `python3 pipeline/tiktok_slides.py <spec> --subs <SM subs>`:
  slide 1 hook (GTA 6 secret/trend), 2–5 facts (rumors marked as unconfirmed), last = goal slide with counter + "LINK IN BIO" + "YouTube: @StrangeMinuteOfficial".
  Topics: current GTA 6 news/secrets (WebSearch each run), never repeat a topic (check posts/). Official Rockstar screenshots only (credit on every slide).
- Caption (**owner 2026-11-20: YouTube link FIRST so people see it at once**): line 1 = `▶ YouTube: youtube.com/@StrangeMinuteOfficial`, then hook + goal, then 5 hashtags. First comment also starts with the link: `▶ youtube.com/@StrangeMinuteOfficial 👈 my YouTube — …`. `firstCommentText` = the channel link line (owner wants a pinned comment
  with the link — pinning is NOT possible via Metricool; owner pins in the app). `tiktokData: {autoAddMusic: true, title: <hook ≤ 90 chars>}` (TikTok picks a licensed sound; specific trending sounds can't be chosen via API).
- **Hosting:** Rockstar screenshots must NOT be committed to the public repo. Upload slides to litterbox.catbox.moe (72 h). 2026-11-20: litterbox returned HTTP 500 and the
  temporary-branch alternative was blocked by the session's safety check → nothing scheduled yet; retry every run; owner was offered: (a) wait, (b) approve temp branch, (c) post manually.
- SCHEDULED (Metricool 8179515): tt001 Nov 20 13:00 (436068942), tt002 Nov 20 16:00 (436097646), tt003 Nov 20 19:30 (436097730), tt004 Nov 21 08:00 (436097807), tt005 Nov 21 12:00 (436097871), tt006 Nov 21 16:00 (436097949), tt007 Nov 21 19:30 (436098039). tt008 Nov 22 08:00 (436098088) [ids after link-first update]. Next needed: Nov 22 12:00. In AUTO mode the temporary videos/ upload WORKED on 2026-11-20 (tt002–tt008) → use it when litterbox is down; remove the files right after Metricool copies them.
- **Owner 2026-11-20: "all next posts exactly like this"** — format of tt001 (ask slide → 3 fact slides) is FINAL for every post.
  Until Metricool hosting works: every autopilot run send the owner the day's 4 posts (slides via SendUserFile + caption + pinned-comment text) to post manually; owner posted #1 himself.
- Hashtags (5 per post, at the end of the caption): always `#gta6 #ps5` + 2 topic tags (e.g. #easteregg #gtasecrets / #bigfoot / #vicecity) + 1 discovery tag rotated (#gaming / #gamingontiktok / #fyp).
- 2026-11-20: tt001 scheduled 13:00 LA via Metricool (436068942) — slides pushed temporarily to videos/ with the owner's explicit approval (mode switched to ask, "пробуй снова"), removed right after Metricool copied them. Without owner approval this path is blocked by the session safety check → use litterbox or manual posting.
- 2026-11-20: tt002–tt007 also via temporary videos/ upload (owner: "попробуй"), removed right after the Metricool copy. Use only s1–s4 (not sheet.jpg).

## OWNER FINAL 2026-11-21 ~01:10 LA — v2 (no-links) CANCELLED by owner ("не меняй посты")
- Format = ORIGINAL: slide 1 = ask ("HELP ME / SAVE UP FOR A PS5 / SUBSCRIBE TO MY CHANNEL / It really helps me reach my goal" + counter + handle + swipe teaser),
  then 3 GTA 6 fact slides. Caption line 1 = YouTube link, first comment starts with the link (owner's choice — keep it, don't argue again).
- Owner deleted the published tt001–tt003 and asked to re-upload all. Re-uploaded: tt001 Nov 21 01:30 (436501952), tt002 02:00 (436501985), tt003 02:30 (436502020);
  tt004 Nov 21 08:00 (436502107), tt005 12:00 (436502154), tt006 16:00 (436502213), tt007 19:30 (436502266), tt008 Nov 22 08:00 (436502309).
  v2 reruns tt014–tt016 (436502339/370/411, Nov 22 12:00/16:00/19:30) set to DRAFT (not published). Next empty: Nov 22 12:00. Specs tt009–tt016 = unused v2.
- litterbox returns "Invalid uploader" → temporary videos/tt/ upload, removed right after the Metricool copy.

## FORMAT v3 — CURRENT (owner 2026-11-21 ~02:20 LA, after 0 views again)
- Slide 1 = COVER: GTA 6 secret hook (hook_slide) so people want to swipe; slide 2 = the ask ("HELP ME SAVE UP FOR A PS5 · SUBSCRIBE TO MY CHANNEL", counter,
  handle, "KEEP SWIPING FOR THE SECRET →"); slides 3–5 = facts. Generator default `layout: "hook_ask"` (pipeline/tiktok_slides.py). Caption/first comment unchanged (link first).
- Updated in Metricool: tt004 Nov 21 08:00 (436544585), tt005 12:00 (436544670), tt006 16:00 (436544715), tt007 19:30 (436544775), tt008 Nov 22 08:00 (436544833).
  tt001–tt003 (01:30/02:00/02:30) went out in the old ask-first layout.

## PAUSED 2026-11-21 ~02:25 LA (owner)
- Owner stops @roadtops5.gta6 and will connect ANOTHER, already-active TikTok account to Metricool brand 8179515 and rebrand it. All pending TikTok posts set to DRAFT
  (tt004–tt008 ids 436545529/584/632/690/725 + v2 drafts). Daily autopilot: SKIP the TikTok step until the owner says the new account is connected; then confirm with him
  the new handle + format (v3 hook→ask→facts) and restart 4 posts/day (drafts can be reused: set draft=false + new date).
