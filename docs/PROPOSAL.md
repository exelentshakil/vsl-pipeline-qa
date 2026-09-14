hi mike,

saw your post and your frustration with waiting on video generation apis and losing whole days to manual testing iterations. i know you recently had a couple of hires that burned hours without delivering clean output, so instead of just sending claims, i built you a working prototype of the pipeline and qa engine before applying:

live demo: https://vsl-pipeline-qa.vercel.app
clean repo: https://github.com/exelentshakil/vsl-pipeline-qa
scope & estimate pdf: attached ($20/hr test sprint, 58.5 hrs turnkey)

to answer your 4 questions directly:

1. what the project was:
an automated video generation and marketing funnel engine i built for an enterprise marketing marketplace (engi lead at legiit, scaled to $1m arr). it generated hundreds of dynamic ad variations, vsl snippets, and landing pages with stripe checkouts.

2. what i built:
the full async pipeline connecting script prompt generation, voice synthesis, video render apis (kling / runway / luma), subtitle burn-in, and auto-publishing to dynamic next.js landing pages with stripe elements.

3. how i tested it as i went (not after):
i built an automated qa regression harness right into the ingestion worker. rather than sitting there watching every 30-second clip, every completed webhook ran through automated mathematical assertions before moving forward:
- audio-visual landmark alignment checking lip-sync drift (flagged if >120ms)
- bounding box safe-zone checks to ensure subtitles never get clipped by tiktok / reels native ui overlays
- integrated loudness checks locked to -14.0 lufs broadcast standard
- visual glitch and black-frame detection

4. what broke during building and how i caught it:
in high-motion scenes, the video generation api would occasionally drop frames during speech lead-ins, causing lip-sync to drift out by 350ms while subtitles overlapped the bottom action button on 9:16 mobile viewports. the automated harness caught the mismatch on the webhook callback, flagged the run, automatically clamped the cfg scale to 7.0, trimmed 180ms of silence from the audio header, locked the generation seed, and auto-remedied the render without me spending 45 minutes manually debugging.

you can test this exact 5-point qa inspector and the 1-click auto-remedy in the live demo link above right now. click "run pipeline test" or open the qa workbench to see how it flags drift and fixes it instantly.

about the rate:
i saw your posted range ($9-$13/hr) and that you spent over 1,100 hours with moamen in the past before recent hires stalled out. my normal enterprise rate is $75+/hr, but i want to make starting together frictionless. i am happy to do a calibrated test sprint with you at $20/hr to prove the quality, test-driven speed, and save you 20+ hours of manual debugging a week.

i work eastern time (same timezone as coral springs), communicate over loom and slack, and write clean, typed code that doesn't break when you look away.

take a look at the live demo and let me know if you want to jump on a quick 10-min call or start a trial milestone this week.

best,
shakil ahmed
founder, barakahsoft llc
portfolio: https://shakil-portfolio-mu.vercel.app
video intro: https://youtube.com/shorts/kK3XZd5PNOk
