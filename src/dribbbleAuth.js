import { dribbbleClientId, dribbbleRedirectUri } from "./config";
import { persistReportYearForAuth } from "./debug";

function startDribbbleAuth(selectedYear) {
  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    client_id: dribbbleClientId,
    redirect_uri: dribbbleRedirectUri,
    state: state,
  });

  persistReportYearForAuth(selectedYear);
  window.localStorage.setItem("swishhh_dribbble_state", state);
  window.location.href =
    "https://dribbble.com/oauth/authorize?" + params.toString();
}

export { startDribbbleAuth };
