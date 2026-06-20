import { dribbbleClientId, getDribbbleRedirectUri } from "./config";
import { persistReportYearForAuth } from "./debug";

function startDribbbleAuth(selectedYear) {
  if (!dribbbleClientId) {
    window.alert(
      "Dribbble client ID is missing. Set VUE_APP_DRIBBBLE_CLIENT_ID in Netlify and redeploy."
    );
    return;
  }

  const redirectUri = getDribbbleRedirectUri();

  if (!redirectUri) {
    window.alert("Could not determine the OAuth redirect URL.");
    return;
  }

  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    client_id: dribbbleClientId,
    redirect_uri: redirectUri,
    state: state,
  });

  persistReportYearForAuth(selectedYear);
  window.localStorage.setItem("swishhh_dribbble_state", state);
  window.location.href =
    "https://dribbble.com/oauth/authorize?" + params.toString();
}

export { startDribbbleAuth };
