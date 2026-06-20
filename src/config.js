const apiBaseUrl = (process.env.VUE_APP_API_BASE_URL || "").replace(/\/$/, "");

const dribbbleClientId = process.env.VUE_APP_DRIBBBLE_CLIENT_ID || "";
const dribbbleRedirectUri =
  process.env.VUE_APP_DRIBBBLE_REDIRECT_URI ||
  `${window.location.origin}/auth`;

function buildApiUrl(path) {
  if (!apiBaseUrl) {
    return path;
  }

  return `${apiBaseUrl}${path}`;
}

function getReportYear() {
  return new Date().getFullYear() - 1;
}

export {
  apiBaseUrl,
  buildApiUrl,
  dribbbleClientId,
  dribbbleRedirectUri,
  getReportYear,
};
