# DECISIONS (newest last; why each choice was made)
- 2026-11-14 Style copied from the owner's reference video: dark flat-vector night scenes, slow push-ins, word-by-word captions with yellow/red keywords, header with series title + time stamp.
- 2026-11-14 Each story = 3 episodes with cliffhangers (owner). New story invented after Part 3 from channel analytics + web trends.
- 2026-11-14 Publishing via Metricool (YouTube connected there). Metricool needs a public URL → repo `videos/` on raw.githubusercontent.com; files removed after Metricool copies them. GitHub releases are blocked for these sessions; file hosts blocked by network.
- 2026-11-14 Scheduler runs in the persistent session (not fresh sessions) because routines created from this session cannot carry the Metricool connector.
- 2026-11-14 Cadence: daily for the first 1.5 weeks (until 2026-11-24), then every 2 days (owner).
- 2026-11-14 Posting hour from Metricool best-time (16:00 LA, Tue–Thu strongest); re-check daily (owner).
- 2026-11-14 Mandatory cover thumbnail + mandatory QA (1-fps contact sheet, loudness −14 LUFS, peak ≤ −0.5 dB) (owner: "must be perfect").
- 2026-11-14 Voice: owner liked samples 1 (Michael+FX) and 2 (Onyx+FX) → blend 60/40 + mystic FX. Quiet procedural music (owner).
- 2026-11-14 Loudness bug: alimiter default level=true re-normalised to 0 dB → mastering now iterative in timeline.py with level=false.
- 2026-11-14 Memory system: docs/ + jobs.py + hooks. Raw transcript NOT archived in this public repo (privacy).
- 2026-11-14 Same session kept (owner). Use built-in auto-compaction (~90 %) instead of rotation; hooks save before / reload after. Owner's raw requests extracted only locally (.claude/state) because the repo is public.
- 2026-11-14 Owner: 2 videos/day for the first days → Nov 16–18 at 10:00 + 16:00 LA (two activity peaks, 6 h apart); explicit slot schedule in log.json + `jobs.py next-slots` (max 2 per run).
- 2026-11-14 Owner moved Part 2 to today 16:39 LA (+2 h); no video on Nov 15; rest of the schedule unchanged.
- 2026-11-14 Owner: fill Nov 15 16:00 with Part 3 (no empty day).
- 2026-11-15 YouTube rejected the custom thumbnail (channel not verified) → stop sending videoThumbnailUrl, use videoCoverMilliseconds until the owner verifies the channel (log.json custom_thumbnails).
- 2026-11-15 Thumbnail fallback chain custom → frame → none, auto-detected from Metricool detailedStatus; probe a NEW custom cover every 3rd video to detect channel verification (owner: re-do the cover automatically).
- 2026-11-15 Voice research (web): horror Shorts mostly use ElevenLabs deep narrators (e.g. 'Adam'); delivery matters most — deep, slow 0.7–0.85, dry close-mic, pauses. Owner picked sample B 'storyteller' (style imitation, no clone of a specific voice).
- 2026-11-15 Owner: add mystical / gripping stories, people should rewatch → genre rotation + ≥2 rewatch mechanics per episode (hidden clue, loop, open question, recontextualizing twist).
- 2026-11-15 Owner: the start must grab instantly, never 'hello' → hook patterns in CLAUDE.md + automated gate pipeline/check_hook.py in QA.
- 2026-11-15 Owner: mix several genres inside one 3-part series → genre-blend arc rule in CLAUDE.md.
- 2026-11-15 Owner: plots must differ (e.g. stuck in an elevator — never do X), not 2 AM every time → situation bank + no-repeat rule + story-specific header stamp.
- 2026-11-15 Owner: after each post decide the best time for the next one → log.json slot_overrides honoured by jobs.py next-slots.
- 2026-11-15 Owner: report = video + cover + title + why this time (+ next post time); no video length.
- 2026-11-15 Owner: concrete report on everything (what/why) → fixed report template with real numbers in CLAUDE.md.
- 2026-11-15 Owner: Part 3 at 22:15 Yerevan (10:15 LA) and the new series' Part 1 the same day → Nov 15 slots 10:15 + 16:00 (Sunday best hour 16:00).
- 2026-11-15 Owner schedule: Nov 15 Part 3 + new Part 1 (best hour), Nov 16–17 2/day, Nov 18–22 1/day, from Nov 24 every 2 days.
- 2026-11-15 Owner: don't fix on 16:00 — autopilot decides each video's hour from Metricool activity + own results + web research, any hour 07–22 LA, ≥5 h apart; schedule only fixes the count per day.
- 2026-11-15 Owner: after Nov 22 mix 1/day and every-2-days randomly → schedule mixed_days [1,2], seeded by date (stable across runs).
- 2026-11-15 Owner: videos must be animated, not a slideshow → walker/crawler/life helpers in engine.js + motion rule in style & QA; caption pop reduced to 7 % (words were touching).
- 2026-11-15 Owner: redo Missing Floor Part 1 with more animation, prettier, scarier → engine punch-zoom, sting glitch, shaded characters, fog, light cones, jerky(), heartbeat(); Parts 1–2 re-rendered and replaced in Metricool (same times).
- 2026-11-15 Owner: don't forget covers → always send cover.jpg with every video (incl. re-renders); verify the cover frame is clean (not inside a glitch).
- 2026-11-16 Owner: make videos a bit longer → 60–75 s, 14–17 lines, beat every ≤ 6 s (web research: horror/story Shorts 45–60 s common; 50–60 s correlate with more views; longer needs a new beat every 5–7 s). First: Missing Floor Part 3.
- 2026-11-16 Owner: "do it as you found" → length 50–60 s, 13–15 lines, beat every ≤ 6 s (replaces the 60–75 s rule).
- 2026-11-16 Owner: Part 2 says "Yesterday…", Part 3 "Two days ago…" — 3 consecutive days of one story; check_hook accepts these openers.
- 2026-11-16 Owner (final): all 3 parts happen the same day back to back — no 'yesterday'/'two days ago'; Part 2/3 continue the same minute.

- 2026-11-17: Channel 2 Strange Minute connected to Metricool (brand 8179515). Owner: same standard as channel 1, own identity (US voice am_fenrir, question-first + small ding, light captions, no horror sounds); autopilot picks every hour itself to maximise views, channel visits and subscribers.

- 2026-11-17: Horror hook sound — owner: the loud start boom masked the first word "Never". Now line 1 plays clean over the drone and a short `thud` lands right after it (check_hook enforces it). Applied from Mile Marker 214 Part 2 on.
- 2026-11-17 (later): owner — remove the opening impact sound entirely (it talks over the text). Horror line 1/2 carry no hit/sting/thud; check_hook enforces it.
- 2026-11-18: Owner delegates ALL posting decisions (time, topic, format) to the autopilot: use every connector/skill, Windsor own-results by publish hour + Metricool activity + US time zones + research; start with ET-lunch / ET-evening windows.

- 2026-11-18: Owner approved the animated Subscribe CTA (slogan + SUBSCRIBE button tapped by a cursor) on the end card of every video on both channels; visual only, not spoken.
- 2026-11-18: Owner: end-card Subscribe CTAs must differ between channels → horror neon plate + eye + shadow hand; Strange Minute ribbon + gold pill + Tick + confetti. Today's two pending posts re-rendered and updated.
- 2026-11-18: Owner shared YouTube Studio analysis (2 AM Knock P1 best, P2 1213 views / 53.6 % / 24 s) → pacing template added to CREATIVE_RULES.md, used for every new series.
- 2026-11-18: Owner: same pacing settings for Strange Minute → beat map added to channels/strange-minute/CHANNEL.md.
- 2026-11-19: Owner: GTA 6 trend series on Strange Minute (secrets/what-happens-if, official Rockstar screenshots credited, GTA keywords for search). New environment 'shorts-media' allows rockstargames.com. Jupiter postponed.
- 2026-11-19: Owner: 3–4 GTA 6 videos total is enough → one more (Secrets #2, Nov 21 09:30), then normal rotation; Jupiter Nov 20 18:30.
- 2026-11-19: Owner: never reply to his own comments → hashed skip list series/log.json owner_comment_hashes.
- 2026-11-19: Owner: both channels 2 videos/day until further notice (from Nov 21: horror 07:00+15:30, SM 10:00+18:30).
- 2026-11-19: GROWTH MODE (owner: views + subscribers). Horror: future series = standalone stories (Part 3s were dying: 25–130 views). SM: 70 % space/physics catastrophes + 30 % trends (winners 1.1–1.2k views).
- 2026-11-19: Owner: full review of both channels every run (pipeline/analytics.py + vidIQ + Windsor) decides topics and publish hours; scheduled task prompt updated.
- 2026-11-19: Owner: no repeated videos; every run checks current internet trends (WebSearch extended + vidIQ) before choosing topics.
- 2026-11-20: Owner: horror channel (FearFiles) keeps the current animated format for ONE MONTH (until ~2026-12-20), then review together; if it doesn't take off, possible switch to Reddit-style story format (original stories in that style, not copied posts).
- 2026-11-20: Strange Minute FORMAT v2 from competitor research (35–45 s, speed 1.0, new shot every line via engine fastcuts, catastrophe-first first frame, 'you' POV, '...For 5 Seconds' / body what-ifs).
- 2026-11-20: Owner liked the v2 demo ('fast, straight to the point; the others feel slow') → v2 confirmed; pending SM #7/#8 re-cut in v2.

## 2026-11-20 — autopilot stays in ONE persistent chat (owner)
- Owner declined a fresh session per day ("мне не надо новый чат"). Daily task trig_019AGWEVNZ2pSkvrmwq8VS2V (10:41 LA, this session) stays.
- A fresh-session task trig_01SjW1hhbzXET1ZG972U1QRD was created and then DISABLED (it had no connectors; deleting was blocked) — keep it disabled, never enable it.
- To save the weekly limit: be economical with context in every run (Read sheets/frames only as QA needs, no re-reading).

## 2026-11-22 — Subscribe conversion (owner: "find a solution and do everything yourself")
Web research: numbered series identity, mid-video subscribe prompt ~20 s, concrete next-video promise, pinned comment with a reason. Implemented: engine midCta pill + NEXT promise (timeline.py fields next/midCta), title numbering + first-comment rule in CLAUDE.md. Applies from the next rendered videos.

## 2026-11-25 — Channel signature + mid-video subscribe fragment (owner)
- Owner: "add our own trademark so people recognise my videos" → FearFiles "The Watcher" (hidden eyes once per video + eyes & lullaby on the end card);
  Strange Minute "Hidden Tick" (mascot peeks from the edge once per video + 3 rising bells on the end card). Doubles as a spot-it rewatch hook.
- Owner: 3-s "+ SUBSCRIBE / SO YOU DON'T MISS NEW VIDEOS" fragment at the middle of every Short (visual only).
- Daily compaction trigger deleted (owner).
- Owner: signature voice tag on the end card — FearFiles "Sleep tight. The Watcher won't.", SM "That's one Strange Minute." (assets/sig).
- 2026-11-26: Titles hook-first, numbered prefix dropped (data: #3–#5 31–66 views vs 700–1400 for plain hook titles).
- 2026-11-27: Variety gate check_variety.py (owner: avoid repetitive-content demonetization). Rotate hook first word (max 2 in a row), new scenes, unique metadata, rotating CTA/end titles.
- 2026-11-27: Detective channel pilot (60 Second Detective) — pseudo-3D toolkit channels/detective/lib.js loaded via render.js per-channel lib; waiting for owner to create channel + Metricool brand.
