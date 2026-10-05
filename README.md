# POINTLESS(TM) DELUXE

A gloriously useless browser game. Nothing you do matters. Management is very proud of you anyway.

## How to start

1. Double-click `index.html`.
2. That is the whole installation. No server, no internet, no account, no point.

Works in a recent Edge, Chrome or Firefox. Phones work too, although the pointlessness is wider on a desktop. Your progress saves itself in your browser.

## What this is

You are a Valued Employee (you can change your name; Management will use it sparingly). You wander an intranet lobby that is run by **Management**, a narrator with a laminated sense of purpose, and you do small, pointless things in 33 departments. Each thing earns you **Meh**, the currency. "1 Meh", "50 Meh": it is the same word either way.

Spend Meh in the Gift Shop of Nothing. Collect Trophies. Read Statistics Nobody Asked For. Change Settings that are strictly decorative. Ascend, and find yourself in the same place, slightly more humming.

There is no way to win. Winning would imply a point. Endings exist, and they congratulate you sincerely, and then everything carries on.

## The cast

- **Management**: the voice. Unseen. Over-invested in your output. Occasionally lets something slip about Tuesdays.
- **Gerald**: a potato of enormous gravitas, Vice President of Spuds.
- **Sandra from Compliance**: never seen, always cited.
- **The Toaster**: speaks only in toast. Honest, tragic, warm.
- **Dennis**: the lobby plant. Thriving. Not impressed.
- **The Stapler**: union representative. Has demands.
- **Tuesday**: never appears. Looming.
- **The Missing Sock**: unaccounted for. Presumed on a journey.

## The departments

Games (24):

| | Title | Tagline |
|---|---|---|
| 🍞 | Argue With a Toaster | Persuade an appliance. It has heard worse. |
| 🔴 | The Button | Do not press. A sign has been laminated about it. |
| 🪑 | Chair Rearranger Pro | Arrange the chairs. They will want something else in four seconds. |
| 🐑 | Counting Sheep (Accurately) | Count the sheep. Management counts them too. You will not agree. |
| 🌿 | Dennis's Performance Review | Rate Dennis from 1 to 5. Dennis is rating you from 3. |
| ⭕ | Draw a Perfect Circle | Draw one circle. Three judges will disagree about it, formally. |
| 🏢 | Elevator Simulator | Press a floor. Arrive somewhere else, with paperwork. |
| 📠 | Fax Machine Frenzy | Send nothing to no one. Receive everything from nobody. |
| 🥔 | Gerald's Keynote | Click when Gerald is ready. Gerald is rarely ready. |
| 🥔 | Interview a Potato | Rigorous hiring. Every candidate is hired as Senior Vice Spud. |
| 🧭 | Maze of Meh | The exit leads to the same maze. The plaque says Level 7 1/2. |
| 🗿 | Pet Rock: Hardcore Mode | His needs are all at 100%. Please begin. |
| ☁️ | Professional Cloud Gazer | Look up. Be wrong. Get a certificate for it. |
| 🦆 | Rubber Duck Therapy | Explain it to the duck. The duck has twelve words and is using them all. |
| 🃏 | Seven and a Half | Exactly 7 1/2. The half is with the other player. |
| 🐌 | Snail Marathon | 3,000 pixels. One per click. The finish line is very sorry. |
| 🧦 | Sock Matcher 3000 | Concentration for people who have lost something. Certificates available. |
| 📥 | Sort the Pile | Drag things into the correct bin. The bins will let you know what that was. |
| 📊 | Spreadsheet of Meaning | Every cell returns a feeling. The totals row is looking at you. |
| 🖼️ | Staring Contest With a Painting | Hold still. The painting has been practising since 1743. |
| 🗂️ | Tiny Bureaucracy | Every form requires a form. The forms are very proud of you. |
| ⏳ | Wait For It(TM) | The bar is loading. You are also loading. Please do not look at either. |
| 🌦️ | Weather Controller | Move the sliders. The sky has noted this and will be doing something else. |
| 🔨 | Whack-A-Nothing | Whack at the exact moment nothing peaks. A panel of three will grade you out of a total you cannot reach. |

Departments (9):

| | Title | Tagline |
|---|---|---|
| 🔨 | The Auction House | Everything is a lot. You will win it. You will owe 1 Meh more than you have. |
| 🍲 | Cafeteria of Almost Food | Lunch is served. Lunch is also, technically, a concept. |
| 🧥 | Coat Check | Check anything. Get back something. It is technically yours. |
| 🗂️ | The Department of Complaints | Your complaint is important to us in a way we cannot file. |
| 🎫 | Lost & Found (Mostly Lost) | Describe what you lost. We will give you it. It is a ticket. |
| 🏛️ | Museum of Everyday Objects | Please do not touch the Tuesday. |
| ☎ | On Hold With Management | Your call is important to us. Management is holding it very carefully. |
| 📮 | The Suggestion Box | Everything you say is heard. What happens next is a different department. |
| ⌨️ | The Typing Pool | Type exactly as shown. Be scored exactly as unshown. |

## Finding secrets (no spoilers)

Every department hides things, and the Trophy Cabinet keeps a count of the ones you have not found yet (they show as "???"). Some general habits that Management has been seen to reward:

- **Wait.** Leave a department alone for a good long while. Some of them notice.
- **Pester.** Click or press something far more times than is reasonable. Some of them have a limit, and some of them have feelings about it.
- **Read the small print.** Terms, plaques, labels, the bottom of anything.
- **Do things in the wrong order.** Departments remember what you did elsewhere, so visit around and come back.
- **Resize the window, hide the tab, come back later.** Nobody has told the departments you are allowed to do that.
- **Poke at the Lobby.** The plant, the clock, the logo and the keyboard all have opinions.
- **Try the keyboard.** Press `B` in the Lobby if someone walks past. (Inside a department the boss key is the `` ` `` key.)
- **Be patient with the ending.** It is not one.

## For the curious (developers)

- `index.html` is the entry point; `core/` is the engine and Lobby, `content/` holds global lines, achievements and shop items, `games/` holds one file per module.
- `SPEC.md` is the technical contract, `VOICE.md` is the comedy bible, `TESTING.md` covers QA.
- Tools (Node, run from this folder): `node tools\build.js`, `node tools\lint.js`, `node tools\selftest.js <id|lobby>`, `node tools\shot.js <id|lobby>`, `node tools\realcheck.js`, `node tools\coretest.js`.
- URL extras: `?dev=<id>` runs one module on its own, `?mute=1` silences it, `?nostorage=1` forgets everything on reload.

Thank you for your continued participation. It has been noted.
