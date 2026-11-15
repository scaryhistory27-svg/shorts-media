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

Goal: original animated horror stories for YouTube Shorts, **3 episodes per story**.
**Cadence = explicit slot schedule in `series/log.json` → "schedule"** (LA time): Nov 16–18: 10:00 + 16:00 (2/day, owner);
Nov 19–24: 16:00 daily; from Nov 26: every 2 days 16:00. Each run: `python3 pipeline/jobs.py next-slots` lists the EMPTY slots
due in the next 36 h (max 2) — make one full episode (job + QA + publish) per listed slot, in order. Exit 1 / empty = nothing to make
→ do only the posting-time check and stop (1–2 lines). Job slot = the slot string, e.g. `--slot 2026-11-16T10:00`.
Posting-time analytics may shift a slot by ≤ 2 h if clearly better, keeping ≥ 5 h between two videos of the same day.
Everything is done end-to-end without asking the owner: story → 2D animation → English voice-over → upload → schedule in Metricool.

## Style (match exactly — the owner likes it)
- Vertical 1080x1920, 30 fps, 40–55 s. Dark flat-vector night palette, slow camera push-ins, film grain, vignette, dust.
- Header: `<SERIES TITLE> · PART n` + orange time stamp (`NIGHT n · 02:00`), blinking red rec dot.
- Big word-by-word captions (Inter Black), key words highlighted yellow (`y`) or red (`r`).
- Narrator (chosen by the owner): Kokoro blend `am_michael:0.6,am_onyx:0.4`, speed 0.88, `voice_fx: mystic`
  (lower pitch, warm, close-mic, dark echo) — the defaults in tts.py; don't change them unless the owner asks. Dark drone bed + synced SFX.
- Quiet mystical music under the voice (owner's request): procedural minor pads + sparse music-box notes + long reverb,
  auto-ducked under speech (timeline.py `music_bed`, melody seeded per episode). `music_level` in episode.json, default 0.11 — keep it quiet.
- Line 1 = hook, spoken within ~2.5 s ("Never …", "If you hear … at 3 AM, …"). Short punchy sentences, 12–15 lines.
- Last line of Part 1/2 = cliffhanger; end card `PART 2?` / `PART 3?`. Part 3 resolves with a twist; end card `THE END?`.
- Part 2 and 3: first line is a 1-sentence recap hook ("Two nights ago, my mom knocked on my door. She lives in Chicago.").
- Original stories and characters only (no existing IPs), YouTube-safe (creepy, no gore, nothing involving harm to kids).

## Before EVERY episode — learn from the published ones
1. Metricool `getScheduledPosts` (last 14 days) → YouTube `publicUrl`s of published episodes; Metricool YouTube analytics
   (`getAnalyticsAvailableMetrics`, then `getAnalyticsDataByMetrics`) → views, average view duration / % viewed, likes, comments, subs per episode.
2. Adapt the episode you are about to make (write what you changed and why into the run summary):
   - low % viewed / quick drop → shorter, harder hook (≤ 1.5 s), faster first 5 s, fewer recap words
   - high views + many comments on a series → keep the same tone; if the 3rd part is next and the story is clearly a hit, you may plan a 4th part (note it in plan.md)
   - a theme/hook style that clearly beat the others → reuse that style in the next new series
3. If there is no data yet (videos < 24 h old), say so and continue with the plan.

## New series (after Part 3 of the previous one) — make it go viral
Do this research BEFORE writing anything, then decide on your own:
1. **What works on this channel:** Metricool analytics for YouTube (blogId 8091052, `getAnalyticsAvailableMetrics` then
   `getAnalyticsDataByMetrics`): views, average view duration / retention, likes, subs gained per published episode.
   Note which hooks/themes/episodes did best and lean into them; drop what flopped.
2. **What works on Shorts right now:** WebSearch (load with ToolSearch) for currently trending horror / creepy story Shorts
   formats and topics (e.g. "viral horror shorts this week", "trending scary story shorts", rules-horror, liminal spaces,
   "if you see X, don't Y", phone/text horror, night-shift jobs, AI/smart-home horror). Take formats and themes, never copy a story.
3. **Pick the premise** from 5 candidates, scored 1–10 on: hook strength in the first 2 s, relatable everyday setting
   (home, phone, elevator, job, family), clear rule or "never do this", a twist that makes people rewatch/comment,
   room for 2 cliffhangers. Must be different from all previous series in `series/log.json`.
4. **Series title**: 2–5 words, mysterious, searchable (e.g. "The 2 AM Knock", "Room 9 Rule"). Write it into plan.md with
   the scores and the reason for the choice.
5. **Hook rules (first 2 s decide everything):** first line is a direct warning or impossible fact addressed to the viewer
   ("Never answer a call from your own number.", "My smart speaker started whispering my name at 3 AM."), first frame is
   already striking (red clock, face, phone screen) with a sound hit, no intro, no logo, no slow fade.
   Keep the last line looping back to the first line so the Short replays.
6. **YouTube title** ≤ 60 chars: the hook as a promise + emoji + `#shorts` (e.g. "Never Answer Your Own Number 📞😨 #shorts").
   Description: 1 teaser line + "Part 2? 👀" + 5–6 hashtags (#horrorstory #scary #creepy #shorts + 2 topic tags). 6–8 tags.

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

## Posting time — re-check EVERY day (owner's request: post when it will take off)
Every run, even a "skip" run:
1. `getBestTimeToPostByNetwork` (youtube, brandId 8091052, America/Los_Angeles) for the next 3 days → best hour per day
   between 12:00 and 20:00 (audience activity of the channel's viewers).
2. Own results: for every published episode take its publish hour and views/retention after 24 h (Metricool analytics).
   Once there are ≥ 5 published videos, if some hour clearly performs better than the activity chart suggests, prefer it.
3. Re-check every PENDING post (getScheduledPosts): if a better hour exists on its day (≥ 10 % higher score), move it
   with updateScheduledPost (keep everything else identical; never move it into the past or less than 1 h from now).
4. Weekend (Sat/Sun) activity is about half of weekdays: still post, but at the best weekend hour.
5. Report in the summary: chosen hour, its score vs. the old hour, and any post that was moved.

## QA — mandatory before publishing (the owner wants it PERFECT; never skip, fix and re-render until all pass)
1. **Contact sheet of the FINAL mp4, 1 frame per second:**
   `ffmpeg -i final.mp4 -vf "fps=1,scale=216:384,tile=8x5" -frames:v 1 qa_sheet.jpg` (tile 8x7 if >40 s) and Read it. Check every frame:
   - no black/blank frames except the planned end card; no flicker between two segments of the same scene
   - captions: fully on screen, readable, never covering a face/key object, never on top of the end card, no words glued together
   - characters/props fully inside the frame (nothing important cut by the edge or hidden under the header), story readable without sound
   - header/HUD texts don't overlap each other; the first frame (0 s) is already striking
2. **Audio:** timeline.py masters to `build/audio_master.wav` automatically. Check final.mp4: `-af ebur128` → −14.5…−13.5 LUFS;
   `-af astats` → peak ≤ −0.5 dB (if not, lower the alimiter limit in timeline.py); voice present for every line (`silencedetect=n=-45dB:d=0.8` shows no silence inside the story).
3. **Sync:** spot-check 3 frames exactly at sfx times from build/timeline.json (knock → door shakes/rings, etc.).
4. **Script:** proper English, every `say` pronunciation correct, 35–55 s, hook ≤ 2.5 s, cliffhanger last line, recap line in Part 2/3.
5. **Cover:** Read cover.jpg — face/creature visible, text readable at small size, no spoiler.
6. Write the QA result (what was checked, what was fixed) into the run summary for the owner.

## Publish
1. `cp $E/build/final.mp4 videos/<slug>-ep<n>.mp4` and `cp $E/build/cover.jpg videos/<slug>-ep<n>-cover.jpg`, commit, `git push origin main`.
   Public URLs: `https://raw.githubusercontent.com/scaryhistory27-svg/shorts-media/main/videos/<file>`
2. Duplicate guard: `python3 pipeline/jobs.py can-schedule <job>` must print OK, and getScheduledPosts must show no post with the same title;
   then `jobs.py stage <job> scheduling`, call Metricool once, then `stage scheduled --set metricool_id=…` (or `uncertain` if the call failed/timed out).
   Metricool `createScheduledPost`, blogId `8091052`, provider youtube, timezone `America/Los_Angeles`:
   date = the job's slot (see Cadence at top), adjusted only per the Posting-time rule; **best hour from analytics**: call `getBestTimeToPostByNetwork` (youtube, brandId 8091052,
   that day ±0, timezone America/Los_Angeles) and pick the hour with the highest value between 12:00 and 20:00
   (as of Nov 2026 this is 16:00 every day; Tue–Thu strongest). Save it as `publish_time` in log.json.
   If that time is already past, use now + 20 min.
   youtubeData: `{title, type:"short", privacy:"public", madeForKids:false, category:"FILM_ANIMATION", tags, isAiGeneratedContent:false}`,
   text = description with hashtags, `autoPublish:true`.
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
   then a short Russian summary with the YouTube title, description, publish time (LA + Yerevan), QA result and the Metricool planner link.
   After it is published, the YouTube link can be found with getScheduledPosts (`publicUrl`) — include the previous episode's link in the summary.

Git commits as `scaryhistory27-svg <scaryhistory27-svg@users.noreply.github.com>`. Push directly to `main`.
GitHub releases are NOT allowed for these sessions — use the `videos/` folder.
