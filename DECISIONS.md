# DECISIONS - how POINTLESS(TM) Deluxe got built

**Read this first:** this file was written *after the fact*, on 2026-10-05, by Claude (the orchestrating session), from three sources: the conversation transcript, the two workflow scripts (which encode most of the logic as code), and the run journals. It is a reconstruction, not a contemporaneous log. No decision log was kept while the work happened, and the session's reasoning was not saved in readable form (only 4 of 18 thinking blocks in the original session transcript contain any text). Where I'm inferring a reason rather than reporting one I actually weighed, I say so. Numbers marked *(verified)* were counted from the journals or by running the tools; numbers marked *(agent-reported)* come from an agent's summary and I did not recount them.

Times are UTC. The user's local time was UTC-4 (inferred from the machine clock against the usage reset times).

---

## 1. The ask

The user was about to go to bed with about half of their weekly plan limit left. They asked for "a completely pointless game ... hilarious" whose purpose was to use up the rest of their tokens. They gave no other instructions, and an `ultracode` / workflow-authoring invocation was attached, which meant large multi-agent orchestration was explicitly opted into.

**How I read it.** Two goals pulled against each other: (a) spend a large amount of budget, and (b) end up with a game that is actually good. Burning tokens on padding would have produced junk, so the plan was to spend budget only on things that buy quality: independent testing, redundant pitching, adversarial review, comedy rewrites. The spending target was a *constraint on scale*, not the point.

## 2. Timeline

| When (UTC) | What happened |
|---|---|
| ~04:07 | Checked the machine (node v24, Edge present) and read the real plan usage: weekly 51%, 5-hour window 12%, weekly reset in ~9h53m, **extra usage disabled**. |
| ~04:12 | Wrote `SPEC.md` (technical contract) and `VOICE.md` (comedy bible) myself, before any agent existed. |
| 04:15 | Launched the overnight build, run `wf_4d860517-64f` (12 parallel lanes plus a usage governor). |
| 04:15 - ~13:15 | Ran unattended for about nine hours. 477 agents *(verified)*. |
| ~13:10 | User back; I found the 5-hour window at 100%, weekly at 90%. Usage limit hit; I stopped the workflow so its agents wouldn't spend the grace allowance. |
| ~13:20 | User couldn't open `index.html` (I had given a plain-text path, not a link). Opened it for them with `Start-Process` and revealed it in Explorer. |
| ~13:24 | Analysed the old journal to find exactly which module stages never ran; launched a first finishing run `wf_f327204c-99f`. |
| ~13:35 | That session ended and killed the finishing run after 15 agents (several mid-edit). I verified afterwards that the game was still intact. |
| after | Resume is same-session only, so I hand-wrote a continuation (`wf_bdfd5bfc-551`) that redid only the unfinished stages and reused saved review findings. 32 agents, ~60 minutes, ~6.2M subagent tokens, 1,696 tool calls *(verified)*. Completed cleanly. |

## 3. The decisions

Each entry: what, why, and what happened.

### D1. A hub of independent modules, not one game
- **Why:** comedy suits a variety of short bits, and, honestly, the structure was chosen as much for parallelism as for humor. One file per module means hundreds of agents can work at once without ever editing the same file.
- **Outcome:** 33 modules. 24 came from my seed list; 9 were invented by the writers' room (*auction-house, coat-check, dennis-review, draw-a-circle, gerald-keynote, maze-of-meh, seven-and-half, sort-the-pile, typing-pool*) *(verified)*.

### D2. Offline, double-clickable, no build step
- Classic `<script>` tags, no ES modules, no network, no `fetch`, system fonts only. The user should be able to double-click one file.
- **Cost I discovered later:** my test harness ran Edge with `--allow-file-access-from-files`, which a real double-click does not have. The finishing run added `tools/realcheck.js` to prove the game works *without* that flag. It passes in Edge *(verified by me)* and in Chrome *(agent-reported)*.

### D3. Contract first: SPEC.md and VOICE.md written by me, before launch
- **Why:** with hundreds of agents, a mismatch in the module API would multiply into hundreds of broken files. One authoritative contract (registry API, module rules, test harness, tools) plus one comedy bible (tone, cast, motifs, family-friendly rules) keeps independent agents coherent.
- Agents were later allowed to update SPEC.md when the engine forced an interpretation, so it stayed authoritative.

### D4. Engine first, with a fuzz tester agents could run themselves
- **Why:** unattended work needs objective verification. The engine agent built `tools/selftest.js` (headless Edge, randomized clicks/typing/drags/resizes, seeded, with leak and error checks), `shot.js` (screenshots agents could look at), `lint.js` and `build.js`, and had to *prove* the tester catches broken modules (throws, leaks, silent modules) before anyone relied on it.
- **Why headless Edge and not the browser pane:** the pane is a single shared window, and an unattended run that hit a "allow this site?" prompt would stall for hours. Headless runs are concurrent and prompt-free. I told every agent not to use browser tools.
- **Outcome:** the engine passed a release gate and a 70-finding review (28 API / 13 visual / 29 robustness) before any module was built on it *(verified)*.

### D5. Pitching started while the engine was still being built
- Pitches don't need the engine, and wall-clock mattered (see D8), so lanes did their writers-room stage first and only waited for the engine before the Build step.

### D6. Writers' room: three pitches plus a showrunner
- Each module got three pitches from different lenses (**mechanics**, **voice**, **chaos/surprise**), then a showrunner agent merged the best parts into one self-contained brief in `design/<id>.md`.
- **Why:** independent pitches give diversity that one agent iterating on its own draft doesn't, and the merge step is where weak material gets cut. It's also a place where extra budget buys quality.

### D7. Separate roles, one owner per file, reviewers don't edit
- Per module: build -> independent QA ("prove otherwise") -> comedy punch-up -> two reviewers with different lenses (**engineering/robustness** and **first-time-audience/comedy**) -> fixer.
- **Why:** the builder is biased toward "it works". Reviewers run in parallel, so they only *report*; a single fixer applies the findings, which avoids edit conflicts. Module agents were forbidden to touch the engine; they reported engine problems and a serialized integrator fixed them in batches.
- **Why this was the token sink:** ten agents per module is where most of the budget went. I considered that fine because each stage found things the previous one missed (see D12 and the lessons).

### D8. Read the real usage instead of guessing, and design around the 5-hour window
- **Why:** I didn't know how much work "50% of the weekly limit" was, and exceeding it could have meant a half-built game. The `get_usage` tool let me read the actual numbers. Two readings shaped everything: **extra usage was disabled** (so hitting the limit just stops work and nothing is billed), and the **5-hour window**, not the weekly total, was likely the bottleneck. With ~10 hours left to the weekly reset, only about two 5-hour windows were usable.
- **Consequences:** I replaced my first idea (discrete waves with calibration) with **12 rolling lanes** so the 5-hour window stays saturated, plus a **governor** that polls usage every ~6 minutes.
- **Governor rules (as coded):** pause all new agent calls when the 5-hour window reaches 88% and sleep until it resets; stop *starting* modules when weekly usage reaches 92% (an 8% reserve for cleanup) or fewer than 100 minutes remain to the weekly reset; hard-stop if under 20 minutes remain. Rationale for the time rules: a module takes about an hour to run through its stages, and tokens spent after the weekly reset would come out of the *next* week's allowance, which isn't what the user asked for.
- **Outcome:** weekly usage went from 51% to about 89% over the run (first and last readings: 52% -> 89%); the 5-hour window peaked at 96%; the governor took 51 usage readings and 54 naps, the longest 61, 51 and 42 minutes *(all verified)*. The last ~10 points of weekly budget were not reachable before the reset. I never promised a full drain, and said so at launch.

### D9. Grow beyond the seed list
- 24 seed concepts, then an ideation round (three writers with different angles plus a judge) to supply more, and "season 2" revisits where a lane returned to a finished module to add content. 11 revisits ran *(verified)*.

### D10. Safety and permissions
- Stayed inside the project folder. Did not change the permission mode. No browser tools, no publishing, nothing outward-facing. Opening the finished file in the user's browser and revealing it in Explorer were done at their request after the link problem.
- I did not delete the 245 MB of QA screenshots in `reports/shots/` without being asked. I had said they were safe to delete; the owner then chose to **keep them on purpose** as a visual record of the build (and possible raw material for a video that tells this story alongside this file). They are 1,899 PNGs spanning 05:23Z to 14:38Z on 2026-10-05, dense for the overnight run (about 250-370 per hour from 07Z to 12Z) and thin for the finishing passes, because the finishing agents were told to delete their own scratch screenshots and one shard's cleanup also removed another's files.

### D11. When the limit hit: stop, don't drain
- I stopped the workflow rather than let in-flight agents consume the grace allowance. This was safe because every stage keeps files syntactically valid, and the lanes were paused at that moment, so nothing was mid-edit.

### D12. How the finishing pass was scoped
- I parsed the journal to see which modules had completed which stages (7 modules incomplete; `maze-of-meh` had a re-review and re-fix and was covered by final verification). I extracted the 135 deduplicated engine issues that module agents had reported but nobody had applied, and sent them to a triage agent. Triage found nearly all already fixed; the one real change was `overflow: clip` in `core/base.css` so sticky elements work inside modules *(agent-reported)*.
- After the session boundary killed the first finishing run, I reused the review findings already saved from it (`reports/prior-findings/`) so the continuation didn't redo finished reviews.

## 4. What went wrong, and what I learned

- **The unclickable link.** I gave the entry point as plain text in backticks. Use a real link, or just open it for the user.
- **Mojibake.** One module (`coat-check`) shipped with double-encoded emoji and punctuation in 29 lines. An integrator repaired it. The *cause* was never confirmed; my best guess is a file rewritten via PowerShell with the wrong encoding, but I haven't verified that. Response: a rule in every later prompt (edit with Edit/Write only) and an error-level mojibake check in `tools/lint.js`.
- **Stale reports.** Agents reported many engine issues that earlier integrations had already fixed, so the 135 needed triage rather than blind fixing.
- **The test harness didn't match reality** (the file-access flag, D2). A harness that is easier than the real environment will pass things that fail for the user.
- **Resume is same-session only.** When the session ended, the run's cache couldn't be reused; I had to hand-author a continuation. Worth knowing before relying on resume overnight.
- **Budget:** the plan "use all remaining" was bounded by the 5-hour windows and the reset time, not by willingness to spend.

## 5. What exists now

Per my own verification *(just run)*: lint 70 files / 0 errors / 20 warnings (all line-length budget); lobby fuzz PASS with 13/13 screens and 33/33 modules; no-flag file:// check PASS in Edge (Chrome agent-reported). `README.md`, `reports/FINAL-REPORT.md` and `reports/engine-triage.md` exist. Counts like ~800 achievements, 130 shop items and 43 decorative settings are *(agent-reported)* in the final report.

Known and deferred (from the triage and final agents): on desktop, Management's fixed bottom-left panel still covers part of the first cards at 1280x800; achievement toasts sit over the form in `dennis-review` at 375px; the fuzz tester cannot reach very long idle arcs, so late-game timed beats (such as `dennis-review`'s tenure unlock) are checked by reading, not by running.

## 6. Where the evidence lives

- **This conversation:** `C:\Users\Katie\.claude\projects\C--Users-Katie-Documents-Claude-Random\` - `a545f0bb-...jsonl` (original session), `6edbe5ee-...jsonl`, and the latest session file.
- **The logic as code:** `...\a545f0bb-...\workflows\scripts\pointless-arcade-wf_4d860517-64f.js` (overnight build, including the governor thresholds) and `...-finish-wf_f327204c-99f.js`; the continuation is `finish2.js` in the latest session's scratchpad.
- **Every agent prompt, tool call and result:** `...\a545f0bb-...\subagents\workflows\wf_4d860517-64f\` (journal + 477 agent transcripts, ~642 MB); the finishing runs are `wf_f327204c-99f` and, in the latest session, `wf_bdfd5bfc-551`.
- **In this folder:** `SPEC.md`, `VOICE.md`, `design/*.md` (33 merged briefs), `reports/` (QA output, `run1-engine-issues.json`, `prior-findings/`, `engine-triage.md`, `FINAL-REPORT.md`).
