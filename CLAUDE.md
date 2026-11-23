# Horror Shorts autopilot (YouTube channel of the owner)

## Memory & recovery (read first)
- Startup state: `docs/CURRENT_STATE.md` + `docs/SESSION_HANDOFF.md` (printed by the SessionStart hook). Details on demand: docs/PROJECT_MEMORY.md,
  WORKFLOW.md, DECISIONS.md, CREATIVE_RULES.md, RECOVERY_GUIDE.md, AUTOMATION_STATUS.md, SESSION_HISTORY.md (sanitized history).
- **Every episode is a job in `pipeline/jobs.py`** (series/jobs.json): `resume` first; advance stages as you go (docs/WORKFLOW.md);
  `can-schedule` MUST print OK before any Metricool createScheduledPost; on an unknown outcome use `uncertain` + reconcile, never re-create blindly.
- After meaningful milestones update CURRENT_STATE.md (overwrite, keep it short), prepend a dated entry to SESSION_HANDOFF.md,
  append to DECISIONS.md / CHANGELOG.md / TASKS.md as relevant. Stop/PreCompact hooks commit + push these automatically.
- Context: ONE persistent session; Claude Code auto-compacts at ~90 % (901,600/1,000,000 tokens). PreCompact hook saves + pushes memory;
  after compaction the SessionStart hook (source=compact) reloads it — then continue the unfinished task. Check usage with get_session (context_usage).
- After every push verify the remote: `git ls-remote origin refs/heads/main` must equal `git rev-parse HEAD`.
- This repo is PUBLIC: never write personal data, emails, credentials or tokens into any file.

Goal: original animated horror stories for YouTube Shorts. **GROWTH MODE (owner 2026-11-19: "work for views and subscribers — we've been stuck at 13–14 subs"):**
data (vidIQ 2026-11-19): Part 1 of 2 AM Knock 1363 views, but later Part 3s die (Mile Marker P3 25 views, Missing Floor P3 110, Note Under Sink 130) —
the Shorts feed shows each video to strangers who never saw Part 1. → **From the next NEW horror series: every Short is a COMPLETE standalone story**
(hook → escalation → twist → loop, understandable without any other video), released as an anthology under one recurring title ("FearFiles: <case name>").
A Part 2 is made ONLY when a video is a clear hit (≥ 1,000 views or ≥ 5 subs in its first 24 h) — and even then Part 2 must work standalone (line 1 re-states the setup).
Who's Home (started 2026-11-19 as 3 parts) is finished as planned, but P2/P3 must be standalone-understandable. Old rule kept for reference: 3 episodes per story.
**Cadence = explicit slot schedule in `series/log.json` → "schedule"** (LA time, owner 2026-11-15): Nov 15: Part 3 10:15 + new series
Part 1 (autopilot picks the best hour, default 16:00); Nov 16–17: 10:00 + 16:00 (2/day); Nov 18–20: 1 video/day; **from Nov 21: 2 videos EVERY day (owner 2026-11-19: "both channels 2/day until I say otherwise")** — defaults horror 07:00 + 15:30, Strange Minute 10:00 + 18:30 (≥ 3 h apart across channels). Each run: `python3 pipeline/jobs.py next-slots` lists the EMPTY slots
due in the next 36 h (max 2) — make one full episode (job + QA + publish) per listed slot, in order. Exit 1 / empty = nothing to make
→ do only the posting-time check and stop (1–2 lines). Job slot = the slot string, e.g. `--slot 2026-11-16T10:00`.
**Slot times are only defaults (owner: "don't fix on 4 PM") — the schedule fixes HOW MANY videos per day; the autopilot decides the
exact hour for every video itself** (see "Posting time"), any hour 07:00–22:00 LA, ≥ 5 h between two videos of the same day.
Everything is done end-to-end without asking the owner: story → 2D animation → English voice-over → upload → schedule in Metricool.

## Style (match exactly — the owner likes it)
- **LENGTH UPDATE (owner 2026-11-22 delegated: "decide the rest yourself"): horror target 45–50 s (11–13 lines)** — best retention was the 50-s 2 AM Knock (105 %). Overrides the 50–60 s below.
- **LONG VIDEOS — 2 PER WEEK PER CHANNEL (owner 2026-11-23: "2 long videos a week for each channel, ~6-7 min, research the best options and decide everything yourself"):**
  FearFiles = MONDAY + THURSDAY runs, Strange Minute = TUESDAY + FRIDAY runs; publish ~17:00–18:00 LA (ET prime time), ≥ 3 h from that channel's Shorts.
  Length 6–8 min (research 2026-11-23: retention beats length; tight 6-min > padded 10-min; mid-roll at 8 min is a bonus, never pad).
  Format = THEMED SET of 7–8 published Shorts of that channel ("7 Scary Phone Stories", "8 What Ifs About Space"), built with
  `python3 compilations/make_comp.py compilations/<id>.json` (v2: cold-open teaser of 3 scariest moments + title card, 1.3-s case cards, per-Short end cards/CTAs cut,
  10-s outro for end-screen elements, chapters incl. "0:00 Intro"). Every Short appears in at most ONE long video (supply = 14 Shorts/week/channel).
  YouTube type "video", custom 16:9 thumbnail (big 2–3-word text + one face/creature/planet), title = number + theme + emoji + "| FearFiles"/"| Strange Minute",
  description = 1 hook line + chapters + 4–5 hashtags; first comment = "which one…?" question. File must be < 95 MB for raw hosting (crf 21, maxrate 1200k).
- **WEEKLY LONG VIDEO (FearFiles, from 2026-11-22):** every MONDAY run build a 10–15 min 16:9 compilation of already-published FearFiles Shorts
  (`python3 compilations/make_comp.py compilations/compNNN.json`, title cards "CASE n · NAME", chapters in the description) → YouTube type "video" on brand 8091052,
  custom 16:9 thumbnail, publish evening LA. Goal: watch hours for YPP (3,000 h/365 d) — Shorts views don't count as watch hours.
- Vertical 1080x1920, 30 fps, **50–60 s (owner 2026-11-16: "as the research found" — horror/story Shorts 45–60 s, best views at 50–60 s)** — a new visual/story beat every ≤ 6 s (new scene, reveal,
  character action or camera move) so retention holds; keep the 2-second hook. Dark flat-vector night palette, slow camera push-ins, film grain, vignette, dust.
- Header: `<SERIES TITLE> · PART n` + orange stamp that FITS THE STORY (e.g. `FLOOR 13 · STUCK 00:47`, `DAY 3 · 11:47 AM`, `ROUTE 9 · KM 214`) —
  `NIGHT n · 02:00` only for The 2 AM Knock. Blinking red rec dot.
- Big word-by-word captions (Inter Black), key words highlighted yellow (`y`) or red (`r`).
- **REAL ANIMATION, not a slideshow (owner 2026-11-15):** every scene must have something MOVING besides the camera zoom.
  Engine helpers (pipeline/engine.js): `walker(x,y,s,t,{speed,dir,look,reach,scared,top,skin,hair,pants})` — walking person with
  leg/arm cycle, body bob, breathing, blinking, head turn, reaching arm, scared shake; `moveAlong(p,x0,x1)` to walk across a scene;
  `crawler(x,y,s,t,speed)` — crawling creature with limb cycle; `life.sway/breathe/flicker` for props and lights.
  Rules: ≥ 50 % of scenes show a character in motion (walking in/out, turning, reaching, backing away, crawling);
  idle characters still breathe/blink/sway; lights flicker, doors swing, phones vibrate, background parallax (layers move at
  different speeds). Put a glow/rim light behind dark creatures so their motion reads on the dark background.
  Demo of the style: tests/anim_demo/scenes.js.
  **Look & dynamics (owner 2026-11-15: "prettier, scarier, more dynamic"):** perspective sets (see series/the-missing-floor/ep1 `liftInterior`),
  `lightCone()` + `fog()` in every set, `heartbeat()` in tense scenes, `jerky()` stop-motion for creepy movement, characters react
  (stumble, flinch, back away, run). Camera punch-zoom on hit/sting/knock and a glitch+red flash on every sting are automatic (engine).
  Reference episode for the new standard: series/the-missing-floor/ep1.
- Narrator (chosen by the owner 2026-11-15, sample B "storyteller" = trending horror-Shorts delivery): Kokoro blend
  `am_michael:0.45,am_onyx:0.55`, speed 0.80, `voice_fx: storyteller` (deep, slow, dry close-mic, slight grit, short room) and
  0.5 s pauses between lines (timeline default `gap`) — the defaults in tts.py/timeline.py; don't change them unless the owner asks.
  Scripts: 13–15 short lines so the video lands at 50–60 s (≤ 6 s per line incl. pause; split long lines). Dark drone bed + synced SFX.
- Quiet mystical music under the voice (owner's request): procedural minor pads + sparse music-box notes + long reverb,
  auto-ducked under speech (timeline.py `music_bed`, melody seeded per episode). `music_level` in episode.json, default 0.11 — keep it quiet.
- **THE FIRST SECOND (owner, mandatory for EVERY episode):** the video starts mid-tension — NO greeting, intro, channel name,
  "today I'll tell you", "story time". Line 1 (≤ 12 words, spoken by 0.4 s, done by 2.8 s) is one of:
  · a warning: "Never answer a call from your own number." / "Don't look at the window after 3 AM." / "Whatever you do, don't count the stairs."
  · what happens if you try: "If you ever try this at night, here's what happens." / "This is what happens when you whisper your name into a mirror."
  · "I tried / I found" proof: "I tried the elevator game. The 10th floor wasn't empty." / "I found a photo of me from 1962."
  · an impossible fact: "My clock stopped at 3:07. Again." / "My mom texted me. She died in 2019."
  First frame = the most striking image of the episode. **Sound (owner 2026-11-17, final: "remove that sound completely, it talks
  over the text"): NO hit/sting/thud at the start — not under line 1 and not right after it.** Line 1 plays clean over the quiet
  drone only; the first sfx may come at the earliest with line 3. Never put `hit`/`sting`/`thud` on line 1 or 2.
  `python3 pipeline/check_hook.py $E` must print PASS before publishing (part of QA).
  Short punchy sentences, 13–15 lines (50–60 s).
- Last line of Part 1/2 = cliffhanger; end card `PART 2?` / `PART 3?`. Part 3 resolves with a twist; end card `THE END?`.
- **Subscribe CTA on EVERY video, both channels (owner approved 2026-11-18):** episode.json `"cta": {"text": "<SLOGAN>", "hl": "<words to highlight>"}`
  → engine draws, under the end card, a channel-specific design (owner 2026-11-18: "the endings must not look alike"): horror = typewriter slogan,
  black plate with flickering red neon + blinking eye, a shadow hand rises and presses it (glitch flash); Strange Minute = slogan on a cyan ribbon,
  gold pill button with "+", Tick hops onto it → SUBSCRIBED ✓ + confetti. Soft pop on the tap; +0.9 s end time.
  Visual only — never spoken (keeps the loop). Slogan ALL CAPS, ≤ 40 chars, rotate it, fit to the part. Horror P1/P2: "DON'T LOSE PART 3. IT WON'T WAIT." /
  "SUBSCRIBE… OR MISS WHAT HAPPENS NEXT."; P3: "A NEW NIGHTMARE EVERY DAY." / "SOME STORIES FIND YOU. SUBSCRIBE FIRST.".
  QA: the button and slogan are fully visible and not overlapping the end-card text in the last frames.
- **SUBSCRIBE CONVERSION (owner 2026-11-22: "find online how to make people subscribe, and do exactly that"; web research 2026-11-22):**
  1. Numbered collection in every title: "FearFiles #N: <case>" / "Strange Minute #N: <what-if>" (series identity = higher sub rate).
  2. Mid-video VISUAL subscribe pop at ~20 s (small pill "+ SUBSCRIBE · new case daily", 2 s, top-right, never over captions/faces; not spoken).
  3. End card adds a concrete promise of the NEXT video ("TOMORROW: <next topic>") above the subscribe CTA (topic must really be scheduled next).
  4. First comment = a reason to subscribe + question ("New case every day 🕯 Which one scared you most? 👇"); owner pins it.
  Engine (2026-11-22): mid pill is automatic (episode.json `mid_cta` false to disable, `mid_cta_at` seconds, `mid_cta_text`);
  promise = episode.json `"next_promise": "<NEXT TOPIC, ≤ 30 chars>"` drawn as "NEXT: …" under the button — set it only when the next video's topic is already decided (ready queue / planned), else omit.
  5. Strange Minute: lean on the winning SPACE niche; horror: keep one look/voice/naming. Measure subs/1k views per video in analytics.
- **Continuity (owner 2026-11-16, final): all 3 parts happen on the SAME day/night, back to back** — Part 2 starts the very moment
  Part 1 ended (continue straight from the cliffhanger), Part 3 starts the moment Part 2 ended. NO "yesterday" / "two days ago" / time jumps.
  Part 2/3 line 1 = a present-tense hook that re-states the cliffhanger ("My GPS just said I'd arrived. In the middle of nowhere."),
  then keep going in the same scene/minute. Header stamp keeps the same day and only the clock moves on (e.g. 7:13 → 7:21 → 7:34 PM).
- Original stories and characters only (no existing IPs), YouTube-safe (creepy, no gore, nothing involving harm to kids).

## FULL CHANNEL REVIEW — every autopilot run, both channels (owner 2026-11-19)
`vidiq_get_videos_by_ids` (all published ids of both channels, 1 call, 5 credits) → `python3 pipeline/analytics.py add <json>` →
`python3 pipeline/analytics.py report` (reports/analytics-latest.md: ranking by ~24-h views, views/hour, average views by publish hour LA;
snapshots accumulate in reports/stats_history.jsonl) + Windsor retention/subs. From it the autopilot DECIDES what took off / flopped,
which topics to make next, and the publish hour of every slot (slot_overrides), and reports top-3 / flop-3 + decisions to the owner.
**Then TREND CHECK + NO REPEATS (owner 2026-11-19: "videos must never repeat; check the internet for what is current, then decide"):**
- Every run, before choosing topics: WebSearch (mode extended) for what is trending NOW in each niche — horror/creepy Shorts formats & topics,
  and science / space / what-if / big news & gaming events for Strange Minute (+ one vidIQ trending/outliers call when credits ≥ 40).
  Pick topics that are BOTH current (trend, news, season, launch) AND match what took off on our channels.
- NEVER repeat a video: before writing, compare the planned topic, premise, hook and title against ALL earlier videos of both channels
  (series/log.json series[].episodes, series/jobs.json titles, channels/strange-minute/log.json episodes + jobs.json). Same subject = only with
  a clearly new angle (e.g. GTA 6 launch ≠ GTA 6 secrets); never the same hook line, title or story premise twice.

## Before EVERY episode — learn from the published ones
1. Metricool `getScheduledPosts` (last 14 days) → YouTube `publicUrl`s of published episodes; Metricool YouTube analytics
   (`getAnalyticsAvailableMetrics`, then `getAnalyticsDataByMetrics`) → views, average view duration / % viewed, likes, comments, subs per episode.
2. Adapt the episode you are about to make (write what you changed and why into the run summary):
   - low % viewed / quick drop → shorter, harder hook (≤ 1.5 s), faster first 5 s, fewer recap words
   - high views + many comments on a series → keep the same tone; if the 3rd part is next and the story is clearly a hit, you may plan a 4th part (note it in plan.md)
   - a theme/hook style that clearly beat the others → reuse that style in the next new series
3. If there is no data yet (videos < 24 h old), say so and continue with the plan.

## Genres & rewatch mechanics (owner 2026-11-15: not only horror — mystical, gripping, "watch it again and again")
Rotate genres across series (never 2 pure-horror series in a row once analytics allow comparison):
- **Horror** (rules horror, something wearing a familiar face, night-shift jobs, home invasion by the impossible).
- **Mystic / supernatural** (curses, omens, doppelgängers, a house that remembers, dreams that come true, old photos that change).
- **Unexplained mystery** (a stranger who knows the future, a town missing from maps, a message from yourself, a number that keeps calling).
- **Time & reality bends** (time loops, a minute that repeats, a door that leads to yesterday, déjà vu with a cost).
- **Eerie true-feeling "documented" tales** (found notes, CCTV logs, voicemails) — always fiction, never claim real events or real people.
**Variety (owner 2026-11-15): every series is a DIFFERENT everyday situation — not "2 AM" / night / door / knocking again.**
Premise = "If you ever end up in <situation>, never do <X>" or "When <situation> happens to you, don't <Y>". Situation bank (extend it):
stuck in an elevator · lost signal on a highway at night · an unknown number calling during a storm · a hotel room that's
not on the floor plan · a babysitting / house-sitting job with one rule · the last train that stops at an unlisted station ·
a smart speaker answering a question nobody asked · a parking garage level that shouldn't exist · a hiking trail marker that
moves · a lost-and-found item with your name · a dentist/doctor waiting room where nobody gets called · a gas station at 4 AM ·
a family photo with one extra person · a voicemail from tomorrow · a dating-app match who knows too much · a library book
returned 50 years late in your handwriting · an online game NPC who remembers you · a stranger at your bus stop every day.
Rules: no repeat of the previous 3 series' setting, time-of-day, monster type or key prop; vary time (day/evening/night),
place (indoor/outdoor/transport/work/online) and the "rule". plan.md must state how it differs from the last 3 series.

**Genre blend (owner 2026-11-15): every NEW series mixes 2–3 genres inside its 3 parts**, so the story keeps changing shape:
- Typical arc: Part 1 = the hook genre (horror/mystic scare) → Part 2 = a different engine (mystery investigation, "documented"
  CCTV/voicemail evidence) → Part 3 = a genre-flip twist (time loop, doppelgänger, reality bend) that explains the clues.
- Examples: horror + time loop ("the knock comes every night at 2:00 — because it's ME from tomorrow");
  mystic + documented ("old photos that change" told through found photos + a voicemail);
  mystery + horror + time ("a town missing from maps" → people there know your name → it's your town, 40 years later).
- The blend must stay ONE coherent story with one rule/logic — no random genre jumps; every clue planted earlier must pay off.
- plan.md lists the genres per part and how the twist connects them. Rotate the genre mix between series.
Every episode must contain at least TWO rewatch hooks:
1. **Hidden clue** placed early (a reflection, a number, a background figure for 0.3–0.6 s) that only makes sense after the twist.
2. **Loop ending** — the last line/shot connects to the first one so the Short flows into itself.
3. **Open question** in the last 2 s that viewers argue about in comments (who/what was it? which one is real?).
4. **Twist that recontextualizes** the opening (viewers rewatch to see it with new eyes).
5. **Counting / spotting challenge** occasionally: "Did you notice how many times she blinked?" (only if a clue really is there).
Plan.md must list the clue(s) for each part and where they appear (time + scene). Captions must NOT spell out the hidden clue.
Keep YouTube-safe and original; mystery/mystic series use the same visual style, voice and music (music_level may go up to 0.14 for mystic).
Title formulas that pull clicks without lying: "I Found A Photo Of Me From 1962", "My Clock Stopped At 3:07 Again", "Don't Answer If It's Your Number".

## New series (after Part 3 of the previous one) — make it go viral
Do this research BEFORE writing anything, then decide on your own:
1. **What works on this channel:** Metricool analytics for YouTube (blogId 8091052, `getAnalyticsAvailableMetrics` then
   `getAnalyticsDataByMetrics`): views, average view duration / retention, likes, subs gained per published episode.
   Note which hooks/themes/episodes did best and lean into them; drop what flopped.
2. **What works on Shorts right now:** WebSearch (load with ToolSearch) for currently trending horror / creepy story Shorts
   formats and topics (e.g. "viral horror shorts this week", "trending scary story shorts", rules-horror, liminal spaces,
   "if you see X, don't Y", phone/text horror, night-shift jobs, AI/smart-home horror). Take formats and themes, never copy a story.
3. **Pick the premise** from 5 candidates FROM AT LEAST 3 DIFFERENT GENRES (see Genres), scored 1–10 on: hook strength in the first 2 s,
   relatable everyday setting (home, phone, elevator, job, family), clear rule or "never do this" / impossible fact,
   rewatch potential (hidden clue + loop + open question), a twist that makes people rewatch/comment, room for 2 cliffhangers. Must be different from all previous series in `series/log.json`.
4. **Series title**: 2–5 words, mysterious, searchable (e.g. "The 2 AM Knock", "Room 9 Rule"). Write it into plan.md with
   the scores and the reason for the choice.
5. **Hook rules (first 2 s decide everything):** first line is a direct warning or impossible fact addressed to the viewer
   ("Never answer a call from your own number.", "My smart speaker started whispering my name at 3 AM."), first frame is
   already striking (red clock, face, phone screen), first words clean with no impact sound, no intro, no logo, no slow fade.
   Keep the last line looping back to the first line so the Short replays.
6. **YouTube title** ≤ 60 chars: the hook as a promise + emoji + `#shorts` (e.g. "Never Answer Your Own Number 📞😨 #shorts").
   Description: 1 teaser line + "Part 2? 👀" + 5–6 hashtags (#horrorstory #scary #creepy #shorts + 2 topic tags). 6–8 tags.

## Channel 2 — Strange Minute (owner 2026-11-17: make its videos together with the horror ones)
Second YouTube channel ("What if…?" / hidden history / science mysteries, English, US audience). Rules, format, topic bank and
the autopilot steps are in `channels/strange-minute/CHANNEL.md`; state in `channels/strange-minute/log.json`.
**Connected 2026-11-17: Metricool brand `8179515`** (`brand_id` in log.json). Every daily run, AFTER the horror slots: fill every
empty Strange Minute slot from `next-slots` (max 2/run; ready queue first), full QA, publish with blogId 8179515, report like channel 1.
Cadence is in its log.json schedule: **2 videos EVERY day until the owner says otherwise** (owner 2026-11-19; the switch to 1/day is cancelled); the exact hour is the
autopilot's choice (best-time chart of brand 8179515 + own results), ≥ 3 h from any horror post, ≥ 5 h between its own posts.
jobs.py for channel 2 always with `JOBS_FILE=channels/strange-minute/jobs.json LOG_FILE=channels/strange-minute/log.json`.

## Channel 3 — TikTok "Road to PS5" (owner 2026-11-20)
**4 photo-carousel posts every day** promoting Strange Minute; rules, hosting status and queue in `channels/tiktok/TIKTOK.md`. Every run, after the YouTube slots: schedule the TikTok posts for the next 36 h (Metricool brand 8179515, provider tiktok).

## Sound design (owner 2026-11-17: "make all sounds realistic — they were too loud and out of place")
- timeline.py SFX are realistic (filtered knock/creak/heartbeat/whoosh/phone-buzz, soft low impacts, eerie string sting), go through one
  SFX bus (lowpass 7 kHz + short room) that is DUCKED under the voice; bus level `sfx_level` in episode.json (default 0.22 — keep it).
- Use SFX only where the picture shows the action (knock = a door is knocked, buzz = a phone vibrates…), at most one per line,
  ≤ 6 per video, never on line 1–2, `sting` max twice per video (key reveal + final line). The voice must always be on top.

## Connected tools (owner 2026-11-17: "use all skills and connectors I installed")
- **vidIQ** (free plan: 150 credits/month, renews on the 17th; most calls cost 5) — budget ≤ 5 credits/day on average, check
  `vidiq_balance` first, stop at < 20 credits. Use it for: (1) NEW series / new Strange Minute topic research — one
  `vidiq_trending_videos` (videoFormat short, titleQuery = niche) or `vidiq_outliers` (contentType short) call; (2) once per
  new series `vidiq_score_title` on the Part 1 title (pick the better of the planned title and one alternative only if credits
  allow); (3) when the owner connects the channels in vidIQ, `vidiq_channel_analytics` once a week per channel (retention,
  traffic sources, subs per video) — fresher than Metricool. Free: `vidiq_user_channels`, `vidiq_balance`.
  Never upload/publish through vidIQ (Metricool stays the only publisher — no duplicates).
- **Windsor.ai** (connector youtube; accounts: horror = 100877, Strange Minute = 100879 (re-connected 2026-11-17 read-only; if an id is rejected, call get_connectors for the current ids)) — the MAIN source for per-video YouTube
  analytics (fresher than Metricool): `get_data` fields video, video_title, views, engaged_views, average_view_duration,
  average_view_percentage, likes, comments, shares, subscribers_gained (also traffic_source, audience retention with
  elapsed_video_time_ratio + video filter). Use it in every run's statistics step. Data lags ~1–2 days.
  Write actions available: update_video_details (fix a published video's title/description/tags), add_video_to_playlist /
  remove_video_from_playlist (series playlists — needs a playlist id the owner created), reply_to_comment / moderate_comment
  (needs the optional Windsor reconnect for comments). Use writes only for this project's own videos; never delete anything.
  **2026-11-17: Google BLOCKS Windsor's write/comment permissions for this account ("App blocked") — Windsor is READ-ONLY.
  Do not try comment replies or playlist writes via Windsor; don't ask the owner to retry it. Statistics only.**
- **Canva**: channel art and promo images when needed (banners/avatars); not for Short covers (YouTube rejects custom covers until
  the channels are phone-verified — frame covers are used).
- **Metricool**: the only scheduler/publisher for both channels.

## Use EVERY connected tool and skill (owner 2026-11-17: "use everything I connected — not for nothing")
Daily (every autopilot run):
- **Windsor.ai** → statistics step for both channels (per-video views, engaged views, avg view %, likes, comments, shares, subs;
  traffic sources). Decide what to change from it and quote the numbers in the report.
- **Comment replies via vidIQ (owner 2026-11-17: "I give all permissions" — reply AUTOMATICALLY, no approval needed)** → horror channel
  UCB3NwyYj_kBAG98a09RzJFQ and Strange Minute UCxWzQpiga2KXr5Tru1OF5Ew (both connected in vidIQ with reply permission since 2026-11-17):
  `vidiq_video_comments` (channelId, order time, 5 credits) → reply with `vidiq_reply_to_comment` (1 credit) to EVERY new genuine
  viewer comment our channel hasn't answered yet (byChannelOwner false and no reply from us), max 10 per run, one at a time
  (vidIQ rate-limits bursts — on "Too many replies" stop and retry the rest next run; never re-post after an uncertain result).
  Replies: English, ≤ 120 chars, friendly, in character, 1–2 emoji, answer/tease without spoilers, point to the next part when it exists,
  no links, no begging for subs. Skip the owner's own comments, spam and rude ones. List every reply in the report.
  **NEVER reply to the owner's own accounts (owner 2026-11-19: "don't answer my comments").** Handles are not stored here (public repo) —
  compare sha256(lowercased author handle incl. '@')[:16] with `owner_comment_hashes` in series/log.json and skip on a match.
- **Windsor.ai playlists** → if `series/log.json` → `playlists` has ids (owner creates them in YouTube), add every new horror part to its
  series playlist and every Strange Minute video to its playlist after it is published.
- **vidIQ** → research only, budget ≤ 5 credits/day (see above).
- **WebSearch** → once per run: best posting times + one fresh trend check for the niche of the next new series/topic.
- **Metricool** → publishing only.
Weekly (in the run on MONDAY, LA time; one extra 10–20 min block):
- **deep-research skill** → "what horror/mystery Shorts and what-if/science Shorts are taking off right now (formats, hooks,
  lengths, topics)" → append a dated summary with sources to docs/RESEARCH_NOTES.md and use it for the next 7 days' topics.
- **xlsx skill** → `reports/weekly-YYYY-MM-DD.xlsx`: one sheet per channel (video, publish time LA, views, engaged, avg view %,
  likes, comments, subs gained) + a summary sheet; send it to the owner with SendUserFile.
- **docs skill / Claude Docs** → a short weekly report doc (what worked, what changed, plan for next week) and send the owner the link.
- **Canva** → when a thumbnail PROBE is due (custom cover test), design the probe cover in Canva (generate/edit, export PNG/JPG) instead
  of the engine cover; if Canva fails, fall back to the engine cover. Also use Canva for any channel art refresh the owner asks for.
Not used (no fit for this cloud session): computer-use / chrome / built-in browser (local only), pptx, google-workspace, morning,
import-memory, skill-creator, artifact-emulator — use them only if the owner asks.

## Skills from the owner's plugins (social-media-skills, marketing, youtube-transcriber) — load ON DEMAND with the Skill tool
Use the ones that fit; load a skill only at the step that needs it (they are long — don't load all every run):
- New horror series / new Strange Minute topic: `social-media-skills:youtube-shorts`, `social-media-skills:idea-generation-and-ideation`,
  `social-media-skills:viral-reverse-engineering` (tear down 1–2 trending Shorts found with vidIQ; transcribe them with
  `youtube-transcriber:youtube-transcriber` when captions help), `social-media-skills:trend-jacking` (only original takes, no IP).
- Script: `social-media-skills:hook-writer` (line 1), `social-media-skills:short-form-video-script` / `storytelling-and-narrative`.
- Strange Minute facts: `social-media-skills:content-research-and-sourcing` (verify every number before publishing).
- Metadata: `social-media-skills:youtube-publishing-and-metadata` (title, description, tags), `social-media-skills:hashtag-strategy`.
- Covers on a probe: `social-media-skills:thumbnail-design` + Canva.
- Comment replies (vidIQ): `social-media-skills:reply-and-comment-writer` for tone.
- Weekly Monday report: `social-media-skills:analytics-and-reporting` or `marketing:performance-report`, plus xlsx + docs.
- Sound questions: `social-media-skills:ai-music-and-sound` (licensing-safe audio only; our audio stays procedural/original).
Never use a skill to publish anywhere else (WoopSocial etc. are not connected) — Metricool stays the only publisher.
Marketing plugin MCP servers (ahrefs, figma, notion, slack…) fail to connect in this cloud session (proxy) — ignore them.

## Repo layout
- `pipeline/engine.js` shared canvas engine: helpers (`sky stars moon glow ell rr door clock phone building mom creature`),
  captions, header, camera, effects. `shakeAt(t,types)`, `lastEv(t,types)` react to sfx events.
- `pipeline/tts.py`, `pipeline/timeline.py`, `pipeline/render.js`, `pipeline/anim.html`.
- `series/<slug>/plan.md` 3-part arc (write it FIRST when starting a new series).
- `series/<slug>/ep<n>/episode.json` script + metadata, `scenes.js` defines `SCN` (scene draw fns `(lt,p,t,d,seg)`) and `CAM` (`{scene:[zoomStart,zoomEnd]}`).
  Start from the previous episode's files and reuse/adapt scenes; add new characters/props to scenes.js (or engine.js if reusable).
- `series/log.json` what is published and when. `videos/` temporary public hosting for Metricool.

episode.json line fields: `scene, text, hl{word:'y'|'r'}, say` (pronunciation override, e.g. "2 AM" -> "two A.M."), `gap` (pause after, default 0.3),
`sfx:[{word|at:'start', type, offset}]` with types `knock knockglass buzz sting hit heart whoosh creak`, optional `stamp`.
Words in `hl`/`sfx` must match the whitespace-split token exactly, punctuation included.

## Run (one episode per run)
```
bash setup.sh                                  # deps + Kokoro model in /tmp/kokoro
E=series/<slug>/ep<n>
python3 pipeline/tts.py $E && python3 pipeline/timeline.py $E
node pipeline/render.js $E preview             # look at $E/build/sheet.jpg (Read it), fix scenes, repeat
node pipeline/render.js $E                     # -> $E/build/final.mp4 (~3 min)
node pipeline/render.js $E cover               # -> $E/build/cover.jpg (thumbnail) — Read it and check
```
**Cover (thumbnail) is mandatory.** episode.json `"cover": {"seg": <line index of the scariest frame>, "frac": 0.0-1.0, "top": "<SERIES TITLE>",
"lines": ["<WHITE LINE>", "<RED LINE>"], "sub": "PART n"}` — 2 short ALL-CAPS lines (2–4 words each) that tease the twist
without spoiling it (e.g. "IT WASN'T" / "MY MOM"). Pick a frame with a face/creature clearly visible.
Then check a few frames of final.mp4 (ffmpeg -ss … -frames:v 1) before publishing.

## Posting time — re-check EVERY day (owner's request: post when it will take off; NOT always 16:00)
For EVERY video decide the hour fresh, combining 3 sources (write the numbers in the report):
a) Metricool `getBestTimeToPostByNetwork` for that exact weekday (audience activity per hour);
b) the channel's own results from **Windsor.ai** (fallback Metricool): views, engaged views, avg % viewed and subs in the first 24–48 h by publish hour
   and weekday, per channel (weight grows with the number of videos, decisive from ≥ 5) — owner 2026-11-18: "you decide when and what to post so videos take off";
c) WebSearch (load with ToolSearch) once per run: current best times to post YouTube Shorts for a US audience on that weekday /
   for horror-mystery content (e.g. "best time to post YouTube Shorts <weekday> 2026"). Treat blogs as weak evidence.
**US time zones (owner 2026-11-18: "12:30 is too late — people are at work; don't just drop videos, decide from the data"):** most US
viewers are on Eastern/Central time — LA 09:00–10:00 = ET lunch (12–1 PM, Metricool weekday morning peak ~10:00 LA), LA 15:00–17:00 = ET
evening 6–8 PM (main peak). Prefer those two windows; avoid LA 11:00–13:30 (ET mid-afternoon work hours) unless the data clearly says otherwise.
Choose the hour that maximises expected first-hours views: activity peak (a) adjusted by (b); use (c) to break ties or when (a)/(b) are flat.
Shorts get their first push in the first 1–3 h, so post ~30–60 min BEFORE the activity peak rather than at its end.
Every run, even a "skip" run:
1. `getBestTimeToPostByNetwork` (youtube, brandId 8091052, America/Los_Angeles) for the next 3 days → best hour per day
   between 12:00 and 20:00 (audience activity of the channel's viewers).
2. Own results: for every published episode take its publish hour and views/retention after 24 h (Metricool analytics).
   Once there are ≥ 5 published videos, if some hour clearly performs better than the activity chart suggests, prefer it.
3. Re-check every PENDING post (getScheduledPosts): if a better hour exists on its day (≥ 10 % higher expected views), move it
   with updateScheduledPost (keep everything else identical; never move it into the past or less than 1 h from now).
4. Weekend (Sat/Sun) activity is about half of weekdays: still post, but at the best weekend hour.
5. Report in the summary: chosen hour, its score vs. the old hour, and any post that was moved.
6. **Right after EVERY publish (owner: "check when the next post should go so it takes off and gets into the rankings"):**
   decide the best time for the NEXT slot and store it in `series/log.json` → `slot_overrides` {"<scheduled slot>": "<better time>"}
   (`jobs.py next-slots` honours it). Decide from: getBestTimeToPostByNetwork for that day (peak hour), own videos' first-24-h views
   by publish hour (once ≥ 5 videos), and spacing — give each video its first 3–4 h of push alone (≥ 5 h between posts),
   never more than 2 posts in a 24 h window, never move a slot to another day. Report: "next post: <time LA/Yerevan> — why".

## QA — mandatory before publishing (the owner wants it PERFECT; never skip, fix and re-render until all pass)
1. **Contact sheet of the FINAL mp4, 1 frame per second:**
   `ffmpeg -i final.mp4 -vf "fps=1,scale=216:384,tile=8x5" -frames:v 1 qa_sheet.jpg` (tile 8x7 if >40 s) and Read it. Check every frame:
   - no black/blank frames except the planned end card; no flicker between two segments of the same scene
   - captions: fully on screen, readable, never covering a face/key object, never on top of the end card, no words glued together
   - characters/props fully inside the frame (nothing important cut by the edge or hidden under the header), story readable without sound
   - MOTION: in consecutive 1-fps frames characters change pose/position in most scenes (not a slideshow); dark creatures readable
   - header/HUD texts don't overlap each other; the first frame (0 s) is already striking
2. **Audio:** timeline.py masters to `build/audio_master.wav` automatically. Check final.mp4: `-af ebur128` → −14.5…−13.5 LUFS;
   `-af astats` → peak ≤ −0.5 dB (if not, lower the alimiter limit in timeline.py); voice present for every line (`silencedetect=n=-45dB:d=0.8` shows no silence inside the story).
3. **Sync:** spot-check 3 frames exactly at sfx times from build/timeline.json (knock → door shakes/rings, etc.).
4. **Script:** proper English, every `say` pronunciation correct, 50–62 s, no line/scene held > 6 s, cliffhanger last line, recap line in Part 2/3.
   **Hook gate:** `python3 pipeline/check_hook.py $E` → PASS (no greeting/intro, warning/impossible-fact pattern, first word ≤ 0.4 s, no impact sound under or right after line 1).
5. **Cover:** Read cover.jpg — face/creature visible, text readable at small size, no spoiler.
   **Cover frame (videoCoverMilliseconds):** extract that exact frame from final.mp4 (`ffmpeg -ss <s> -frames:v 1`) and Read it — it must be
   clean (NOT within 0.7 s after a sting/glitch or a scene transition) with the face/creature/key prop clearly visible. ALWAYS send the owner
   the cover.jpg together with every video (also for re-renders) — owner: "don't forget the covers".
6. Write the QA result (what was checked, what was fixed) into the run summary for the owner.

## Publish
1. `cp $E/build/final.mp4 videos/<slug>-ep<n>.mp4` and `cp $E/build/cover.jpg videos/<slug>-ep<n>-cover.jpg`, commit, `git push origin main`.
   Public URLs: `https://raw.githubusercontent.com/scaryhistory27-svg/shorts-media/main/videos/<file>`
2. Duplicate guard: `python3 pipeline/jobs.py can-schedule <job>` must print OK, and getScheduledPosts must show no post with the same title;
   then `jobs.py stage <job> scheduling`, call Metricool once, then `stage scheduled --set metricool_id=…` (or `uncertain` if the call failed/timed out).
   Metricool `createScheduledPost`, blogId `8091052`, provider youtube, timezone `America/Los_Angeles`:
   date = the job's slot (see Cadence at top), adjusted only per the Posting-time rule; **best hour from analytics**: call `getBestTimeToPostByNetwork` (youtube, brandId 8091052,
   that day ±0, timezone America/Los_Angeles) and decide per the Posting-time section (any hour 07:00–22:00)
   (Nov 2026 data: peak ~16:00 LA, Tue–Thu strongest — but re-decide every time). Save it as `publish_time` in log.json.
   If that time is already past, use now + 20 min.
   youtubeData: `{title, type:"short", privacy:"public", madeForKids:false, category:"FILM_ANIMATION", tags, isAiGeneratedContent:false}`,
   text = description with hashtags, `autoPublish:true`.
   **First comment (owner 2026-11-17, every video, both channels):** `firstCommentText` = one short question that makes people
   answer (≤ 150 chars, 1–2 emoji, no links, no "subscribe" begging). Horror: a choice/theory about the story ("Would YOU have
   stopped the car? 🚗👇", "Who was really in the mirror? 👀"), Part 1/2 may add "Part 2 tomorrow 👀". Strange Minute: a pick-one or
   "what should vanish/happen next?" question. Write it into episode.json `youtube.first_comment`. After publishing, read
   detailedStatus: if it mentions the comment failing, note it in the job and in the report (keep trying on the next videos).
   **Thumbnail (automatic, owner's request "if YouTube rejects the cover, make another and set it again"):**
   - Status lives in `series/log.json` → `thumbnail`: {"mode": "custom"|"frame"|"none", "fails": n, "probe_every": 3, "since_probe": n}.
   - mode "custom" → send `videoThumbnailUrl` (cover.jpg). mode "frame" → send `videoCoverMilliseconds` (cover.seg/frac time in ms).
     mode "none" → send neither (YouTube picks a frame; the first frame must already be striking).
   - CHECK every run (step "recovery"): for each post published since the last run read `detailedStatus`. If it contains
     "Could not upload video thumbnail" → record the warning in the job, `fails += 1`, and switch mode: custom → frame → none.
     If a post with custom/frame published WITHOUT that warning → keep that mode (and set mode "custom" if it was a probe).
   - PROBE: while mode ≠ "custom", every `probe_every`-th video try `videoThumbnailUrl` with a NEW, different cover
     (another scary frame + different 2-line text) — this detects automatically when the channel gets verified.
   - An already-published video's thumbnail cannot be changed via Metricool: send the owner the new cover.jpg and say
     he can set it in the YouTube app (Short → Edit → Thumbnail) once custom thumbnails work.
   - Metricool status ERROR with detailedStatus "published with some warnings" + a publicUrl = PUBLISHED (not a failure).
3. When the response's media (and videoThumbnailUrl, if sent) are on static.metricool.com, `git rm` the files from `videos/`.
4. Update `series/log.json` (episode, publish time, metricool id, `last_publish`), commit + push to main.
5. **Report to the owner (mandatory):** send the final video AND the cover with the `SendUserFile` tool
   (files: `$E/build/final.mp4`, `$E/build/cover.jpg`; status "proactive"; caption = the exact YouTube title),
   then a short Russian summary: YouTube title, description, publish time (LA + Yerevan) and WHY this time, next post time and why,
   QA result (pass/what was fixed), Metricool planner link. Do NOT mention the video length/duration (owner doesn't need it).
   **Report template (owner wants a concrete "what, why, based on what" report — use it every time, real numbers, no vague words):**
   ```
   🎬 <YouTube title>
   📝 Описание: <description>
   🕓 Выход: <date> <HH:MM> Лос-Анджелес / <HH:MM> Ереван
      Почему это время: <score of chosen hour vs. next-best hour from getBestTimeToPostByNetwork; own-results data if ≥5 videos; spacing from the previous post>
   📖 История: <series>, часть <n>/3 — <1 sentence what happens>
      Почему так: <genres + situation + why chosen (scores) for a new series; for Part 2/3: which cliffhanger/clue it pays off>
      Крючок в начале: "<line 1>" — <pattern used>
      Приёмы для пересмотра: <which clue/loop/open question and where>
   📊 Что взял из статистики: <views / % viewed / likes per previous video with numbers> → <what was changed because of it> (or "данных пока нет — видео < 24 ч")
   ✅ Проверка качества: <pass; list what was checked and what was fixed>
   🖼 Обложка: <method custom/frame/none> — <result of the previous one>
   ⏭ Следующий пост: <date HH:MM LA / Ереван> — <why>
   🔗 Metricool: <plannerUrl> · Прошлое видео: <YouTube link>
   ```
   After it is published, the YouTube link can be found with getScheduledPosts (`publicUrl`) — include the previous episode's link in the summary.

Git commits as `scaryhistory27-svg <scaryhistory27-svg@users.noreply.github.com>`. Push directly to `main`.
GitHub releases are NOT allowed for these sessions — use the `videos/` folder.
