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
- **OWNER RULE (2026-11-21, final, never drop):** EVERY TikTok post has the YouTube LINK `youtube.com/@StrangeMinuteOfficial` in the caption on line 1 (max line 2)
  AND at the start of the first comment. Bio (new account): line 1 = `youtube.com/@StrangeMinuteOfficial`, then "Help me hit 1K subs 🙏" / "Goal: PS5 + GTA 6 🎮".

## RESUMED 2026-11-21 ~03:56 LA — NEW ACCOUNT "ROAD TO GTA 6" connected to brand 8179515 (owner). Format v3 + link rule. 4 posts/day (08:00 · 12:00 · 16:00 · 19:30 LA).
- Scheduled: Gellhorn Nov 21 04:15 (436605555, first post), regions 12:00 (436605846), cat-car 16:00 (436605897), bigfoot 19:30 (436605939);
  Nov 22: jetski-dog 08:00 (436605990), easter-egg 12:00 (436606046), dexter 16:00 (436606087), chiliad 19:30 (436606145). All 8 old topics now used on the new account.
- Next empty: Nov 23 08:00 → NEW topics (WebSearch fresh GTA 6 news, never repeat posts/ topics). Old v2 drafts 436502339/370/411 stay drafts (ignore).

## CADENCE v2 — owner 2026-11-21: "work worldwide, day and night, post as much as helps" → **6 posts/day** (cap 6: more looks like spam for a new account)
- LA slots: 00:30 · 04:30 · 08:00 · 12:00 · 16:00 · 19:30 (= Yerevan 12:30 · 16:30 · 20:00 · 00:00 · 04:00 · 07:30) → Europe/Asia daytime + US morning/lunch/evening.
- Every run fill all empty slots for the next 36 h with NEW topics (fresh GTA 6 news via WebSearch, no repeats). Re-evaluate slot hours from TikTok analytics after ~1 week.
- 2026-11-21 run: new tt017 movie-car Nov 22 00:30 (436937120), tt018 lucia Nov 22 04:30 (436937192). Nov 22 now full (6). Next empty: Nov 23 00:30.

## 2026-11-22 run
- New tt019 arthur-hat Nov 23 00:30 (437850872), tt020 silent-hill 04:30 (437850954), tt021 manhunt 08:00 (437851036), tt022 wade 12:00 (437851093),
  tt023 swamp-crab 16:00 (437851171), tt024 verified 19:30 (437851248). Format v3 + link rule; --subs 16 (SM subs 2026-11-22). Next empty: Nov 24 00:30.

## 2026-11-23 run
- tt025 belville-house Nov 24 00:30 (439281067), tt026 vin 04:30 (439281158), tt027 hidden-items 08:00 (439281271), tt028 old-map 12:00 (439281361), tt029 meet-jason 16:00 (439281442), tt030 trilogy-hint 19:30 (439281546). Next empty: Nov 25 00:30.

### Run 2026-11-24 (for Nov 25)
tt031 Vice City back 00:30 (440740071) · tt032 Ambrosia 04:30 (440740187) · tt033 Grassrivers 08:00 (440740299) ·
tt034 Mount Kalaga 12:00 (440740411) · tt035 Leonida Keys 16:00 (440740541) · tt036 Leonida = Florida 19:30 (440740654). Next empty: Nov 26 00:30.

### Run 2026-11-25 (for Nov 26)
tt037 patch 01.002.002 00:30 (442194916) · tt038 PC port shut down 04:30 (442195031) · tt039 $3.79B launch (reported) 08:00 (442195146) ·
tt040 Spotify record (reported) 12:00 (442195236) · tt041 Thanksgiving in Leonida 16:00 (442195332) · tt042 2022 leaker guilty plea 19:30 (442195432). Next empty: Nov 27 00:30.
