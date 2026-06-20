const apiBaseUrl = (process.env.VUE_APP_API_BASE_URL || "").replace(/\/$/, "");
const dribbbleClientId = (process.env.VUE_APP_DRIBBBLE_CLIENT_ID || "").trim();

function getDribbbleRedirectUri() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin.replace(/\/$/, "")}/auth`;
  }

  const configured = (process.env.VUE_APP_DRIBBBLE_REDIRECT_URI || "").trim();
  return configured.replace(/\/$/, "");
}

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
  getDribbbleRedirectUri,
  getReportYear,
};
