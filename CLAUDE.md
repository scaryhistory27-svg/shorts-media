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
