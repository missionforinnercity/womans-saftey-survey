# Mission for Inner City: Cape Town — Safety Perception Survey (2025)

This is a scrollytelling data viz that presents findings from a 2025 survey of women in Cape Town’s CBD about their perception of safety. It highlights harassment frequency, day/night perception shifts, danger/safe hotspots, and requested interventions.

## Tech
- Vite + React
- Recharts (charts), React-Leaflet/Leaflet (map), Tailwind CDN for styling

## Run locally
1) Install deps: `npm install`
2) Start dev server: `npm run dev`
3) Open the URL shown (https://missionforinnercity.github.io/womans-saftey-survey/).

Notes:
- Map tiles load from CARTO, so you need network access.
- Env file `.env.local` is not required for local dev of the static data shown here.
