# Horror Shorts autopilot (YouTube channel of the owner)

Goal: original animated horror stories for YouTube Shorts, **3 episodes per story**, **one episode every 2 days**.
Everything is done end-to-end without asking the owner: story → 2D animation → English voice-over → upload → schedule in Metricool.

## Style (match exactly — the owner likes it)
- Vertical 1080x1920, 30 fps, 40–55 s. Dark flat-vector night palette, slow camera push-ins, film grain, vignette, dust.
- Header: `<SERIES TITLE> · PART n` + orange time stamp (`NIGHT n · 02:00`), blinking red rec dot.
- Big word-by-word captions (Inter Black), key words highlighted yellow (`y`) or red (`r`).
- Calm deep male American narrator: Kokoro voice `am_michael`, speed 0.92. Dark drone bed + synced SFX.
- Line 1 = hook, spoken within ~2.5 s ("Never …", "If you hear … at 3 AM, …"). Short punchy sentences, 12–15 lines.
- Last line of Part 1/2 = cliffhanger; end card `PART 2?` / `PART 3?`. Part 3 resolves with a twist; end card `THE END?`.
- Part 2 and 3: first line is a 1-sentence recap hook ("Two nights ago, my mom knocked on my door. She lives in Chicago.").
- Original stories and characters only (no existing IPs), YouTube-safe (creepy, no gore, nothing involving harm to kids).

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
```
Then check a few frames of final.mp4 (ffmpeg -ss … -frames:v 1) before publishing.

## Publish
1. `cp $E/build/final.mp4 videos/<slug>-ep<n>.mp4`, commit, `git push origin main`.
   Public URL: `https://raw.githubusercontent.com/scaryhistory27-svg/shorts-media/main/videos/<slug>-ep<n>.mp4`
2. Metricool `createScheduledPost`, blogId `8091052`, provider youtube, timezone `America/Los_Angeles`:
   date = `last_publish` + 2 days at 17:00 (if that is already past, now + 20 min).
   youtubeData: `{title, type:"short", privacy:"public", madeForKids:false, category:"FILM_ANIMATION", tags, isAiGeneratedContent:false}`,
   text = description with hashtags, `autoPublish:true`.
3. When the response's media URL is on static.metricool.com, `git rm` the mp4 from `videos/`.
4. Update `series/log.json` (episode, publish time, metricool id, `last_publish`), commit + push to main.

Git commits as `scaryhistory27-svg <scaryhistory27-svg@users.noreply.github.com>`. Push directly to `main`.
GitHub releases are NOT allowed for these sessions — use the `videos/` folder.
