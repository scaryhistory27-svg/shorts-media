# Local session task: set up the owner's YouTube channels in Chrome

You are a LOCAL Claude session on the owner's Windows PC with **Claude in Chrome**. The cloud session that runs the
autopilot cannot reach the browser, so this setup is your job. The owner speaks Russian — talk to him in Russian.
The owner has given permission to do everything below yourself. Work step by step, take a screenshot before and
after every change and verify it really saved.

## Hard rules
- Stop and ask the owner ONLY for: Google sign-in / SMS codes / "Yes, it's me" prompts, passport/ID, tax forms,
  bank details, any payment. Never type personal, tax, bank or card data yourself; show him where to type.
- Never delete a channel, a video, or a playlist. Never change the channel's Google account owner.
- Never publish or unpublish videos. Videos are scheduled by Metricool (autopilot) — don't touch upload queues.
- This repo is PUBLIC: never write the owner's personal data, emails or codes into any file here.
- If something fails, say exactly what and show the screenshot. Don't claim success without seeing it saved.

## Step 0 — audit first (an earlier local attempt changed things incorrectly)
Open YouTube Studio for EVERY channel on this Google account (avatar → Switch account). For each, write down the
current: name, handle, country, description, keywords, audience (made for kids?), upload defaults, branding,
verification status, monetization status. Compare with the target below; list every difference; then fix them.
If an extra/wrong channel was created by the earlier attempt, do NOT delete it — tell the owner and ask.

## Channel 1 — horror Shorts (already exists, connected to Metricool; videos like "The 2 AM Knock", "Mile Marker 214")
YouTube Studio → Settings (Настройки):
- **Channel → Basic info → Country of residence: Armenia.** (Owner lives in Armenia. The country must match AdSense
  and tax data; the US audience comes from English content, not from this setting. Do NOT set United States.)
- Keywords: `horror story, scary stories, creepy, animated horror, horror shorts, scary animation, mystery, creepy stories, shorts`
- Channel → Advanced: Audience = **No, set this channel as not made for kids**.
- Upload defaults: title empty; description empty; visibility Public; category **Film & Animation**;
  video language **English**; title/description language English; comments: allow all but hold potentially inappropriate.
- Channel → Feature eligibility: if "Intermediate features" are not enabled → start phone verification; ask the owner
  for the SMS code. (Needed so custom thumbnails work — YouTube rejected our covers 3× because of this.)
- Customization → Profile/Branding: if the channel has no picture/banner, upload
  `branding/horror-channel/logo_skull_wave.png` (picture) and `branding/horror-channel/channel_banner_skull.jpg` (banner).
  If the owner already set his own, keep his.
- Customization → Branding → Video watermark: the channel picture, display **End of video**.
- Customization → Basic info → Description (only if empty or weak):
  ```
  Short animated horror stories you can't unsee. 🌙
  New 3-part mysteries every week — watch Part 1, then guess the twist before Part 3.
  Original stories. Narrated. Subscribe if you dare. 😨
  ```
- Monetization tab: just report the status and the remaining requirements (subs / views).

## Channel 2 — "Strange Minute" (new, on the SAME Google account as a Brand channel)
Create only if it doesn't exist yet: youtube.com/channel_switcher → **Create a channel** → name `Strange Minute`.
- Handle: `@StrangeMinute`; if taken try `@StrangeMinuteTV`, `@TheStrangeMinute`, `@StrangeMinuteHQ` (in that order).
- Picture: `branding/strange-minute/strange_minute_logo.png`; banner: `branding/strange-minute/strange_minute_banner.jpg`
  (files are in this repo; if Chrome's upload dialog can't reach the repo folder, tell the owner the exact path).
- Description:
  ```
  What if the Moon disappeared? What really happened to the lost city? 🌍⏱️
  Strange Minute turns the weirdest "what if" questions, hidden history and science mysteries into short animated stories you can watch in a minute.
  New Shorts every day. Subscribe and stay curious. ❓
  ```
- Keywords: `what if, strange facts, science mysteries, hidden history, animated stories, unexplained, space facts, history mysteries, shorts, curiosity`
- Country **Armenia**; audience **not made for kids**; upload defaults: Public, category **Education**, language English.
- Watermark: channel picture, end of video. Phone verification as for channel 1.

## AdSense (check only — don't type anything)
If adsense.google.com has an account: report country (must be Armenia), address present, PIN verification status,
payment method present, US tax info (W-8BEN submitted?). Tell the owner what is missing; he fills it himself.
If there is no AdSense yet: say so — it is linked later from the YouTube Monetization tab after the channel qualifies.
One AdSense account serves both channels (Google allows only one per person).

## Metricool (only if the owner already bought a plan with ≥ 2 brands)
app.metricool.com → add a brand "Strange Minute" → connect YouTube → choose the **Strange Minute** channel
(not the horror one). Report the new brand's id (blogId, visible in the URL) to the owner.

## Final report (in Russian, to the owner; he forwards it to the cloud autopilot session)
For each channel: what it was → what you changed → what is still left for the owner. Include the handles
actually obtained, the Metricool blogId of Strange Minute (if created), and screenshots of anything that failed.
