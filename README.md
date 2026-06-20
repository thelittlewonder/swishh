# Swishhh

![banner](https://i.imgur.com/rOmIIcs.png)

Annual Dribbble year-in-review report card. Connect your Dribbble account, and Swishhh visualises your shots, tags, posting habits, and projects for the previous calendar year.

Built with [Vue.js](https://vuejs.org/) and the [Dribbble API v2](https://developer.dribbble.com/v2/).

**Live site:** [swishhh.netlify.app](https://swishhh.netlify.app)

The frontend talks to a separate Node API ([bounce](https://github.com/littlewonder/bounce)) for OAuth, Dribbble data fetching, and cached profile storage.

## How it works

1. User clicks **Analyse My Dribbble Profile** on the home page.
2. Dribbble OAuth redirects back to `/auth` with an authorization code.
3. The frontend sends the code to the backend API.
4. The backend fetches Dribbble data, filters it to the report year, and caches a snapshot.
5. The user is redirected to `/:username` where the report is rendered.

## Requirements

- Node.js 20+
- npm
- A running instance of the [bounce](https://github.com/littlewonder/bounce) backend API
- A Dribbble OAuth application

## Local development

```bash
# install dependencies
npm install

# copy env template and fill in values
cp .env.example .env.local

# start dev server (default: http://localhost:8080)
npm run serve

# production build
npm run build
```

### Environment variables

Create `.env.local` (or set these in Netlify for production):

| Variable | Description |
|----------|-------------|
| `VUE_APP_API_BASE_URL` | Backend API URL, e.g. `http://localhost:5656` locally or your Render URL in production |
| `VUE_APP_DRIBBBLE_CLIENT_ID` | Dribbble OAuth client ID |

`VUE_APP_DRIBBLE_REDIRECT_URI` is optional. By default the app uses the current site origin plus `/auth` at runtime (e.g. `http://localhost:8080/auth` locally).

### Dribbble app setup

In your [Dribbble OAuth application](https://dribbble.com/account/applications):

- **Callback URL** must exactly match your frontend auth route, e.g. `https://swishhh.netlify.app/auth`
- The backend must use the same redirect URI for the token exchange

## Deployment (Netlify)

This project is configured for Netlify via `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20

Set these environment variables in the Netlify dashboard before deploying:

```text
VUE_APP_API_BASE_URL=https://your-backend.onrender.com
VUE_APP_DRIBBBLE_CLIENT_ID=your_dribbble_client_id
```

Do not set `VUE_APP_DRIBBLE_REDIRECT_URI` unless you need to override the automatic runtime value.

SPA routing is handled by `public/_redirects`.

## Debug mode

For testing with historical Dribbble data:

1. On the home page, click the **Swishhh logo 5 times** within 2 seconds.
2. A **debug** badge appears and the year in the subtitle becomes clickable.
3. Click the year to cycle through previous years.
4. Authorise with Dribbble — the backend will fetch data for the selected year.

Debug mode is stored in `localStorage`. To reset:

```javascript
localStorage.removeItem('swishhh_debug_mode');
localStorage.removeItem('swishhh_report_year');
```

## Project structure

```text
src/
  components/
    Home.vue    # landing page and OAuth start
    Auth.vue    # OAuth callback handler
    Report.vue  # year-in-review report UI
  config.js     # API and Dribbble config
  debug.js      # debug mode helpers
  dribbbleAuth.js
  router/
public/
  _redirects    # Netlify SPA fallback
```

## Related repo

- **Frontend:** [swishh](https://github.com/thelittlewonder/swishh) (this repo)
- **Backend API:** [bounce](https://github.com/littlewonder/bounce)
