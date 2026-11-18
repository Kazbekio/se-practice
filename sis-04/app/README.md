# Campus Commons — room availability

A fictional five-room catalog for SIS 04. It checks availability and never creates or saves a booking. The demo day is 2026-11-18 and the clock starts at 09:00. All data is local.

Use Node.js 22.16 or a compatible version. From this folder:

```bash
npm install
npm run dev
npx vitest run --reporter=verbose
npm run build
```

For a clean, locked install, use `npm ci`. The 19 Week 08 tests are preserved. Fifteen added tests use their own fixed catalog, independent of the demo data. The total is 34 Vitest tests.

Choose attendees and every required equipment item. Maintenance rooms remain visible with a label, but cannot be Available. After the first check, switching rooms updates the result for the same request. Changing times or filters clears that result. An empty list disables the availability form. Ends at 24:00 supports the end-of-day boundary.

Room data lives in rooms.ts, rules in booking.ts, filters in filter.ts, and display code in App and components/. time.ts only converts display values. The page has no duplicate time-order or overlap rule.

The browser proof script is ../evidence/browser-checks.cjs. It requires playwright-core and a Chromium executable. Start the production build on localhost port 4178, set SIS04_CHROMIUM to the browser path and NODE_PATH to the folder containing playwright-core, then run the script. It writes the five screenshots and its real check log. These browser checks are separate from the 34 Vitest tests.

For the recorded browser checks on this Linux machine:

```bash
python3 -m http.server 4178 --bind 127.0.0.1 --directory dist
# In another terminal, after installing playwright-core in a temporary folder:
NODE_PATH=/tmp/sis04-browser-tools/node_modules SIS04_CHROMIUM=/path/to/chromium node ../evidence/browser-checks.cjs
```

The script can use SIS04_BASE_URL for another local port. Availability is a Boolean result; the page lists possible rejection causes but does not return a detailed reason code.
