const DEBUG_MODE_KEY = "swishhh_debug_mode";
const REPORT_YEAR_KEY = "swishhh_report_year";
const MIN_REPORT_YEAR = 2010;

function getDefaultReportYear() {
  return new Date().getFullYear() - 1;
}

function isDebugModeEnabled() {
  return window.localStorage.getItem(DEBUG_MODE_KEY) === "true";
}

function enableDebugMode() {
  window.localStorage.setItem(DEBUG_MODE_KEY, "true");
}

function getSelectedReportYear() {
  const stored = window.localStorage.getItem(REPORT_YEAR_KEY);

  if (stored) {
    const year = parseInt(stored, 10);

    if (!Number.isNaN(year)) {
      return year;
    }
  }

  return getDefaultReportYear();
}

function setSelectedReportYear(year) {
  window.localStorage.setItem(REPORT_YEAR_KEY, String(year));
}

function cycleReportYear(currentYear) {
  const maxYear = new Date().getFullYear();
  const nextYear = currentYear <= MIN_REPORT_YEAR ? maxYear : currentYear - 1;

  setSelectedReportYear(nextYear);
  return nextYear;
}

function persistReportYearForAuth(year) {
  if (isDebugModeEnabled()) {
    setSelectedReportYear(year);
    return;
  }

  window.localStorage.removeItem(REPORT_YEAR_KEY);
}

function getReportYearAuthParam() {
  if (!isDebugModeEnabled()) {
    return null;
  }

  return window.localStorage.getItem(REPORT_YEAR_KEY);
}

export {
  MIN_REPORT_YEAR,
  cycleReportYear,
  enableDebugMode,
  getDefaultReportYear,
  getReportYearAuthParam,
  getSelectedReportYear,
  isDebugModeEnabled,
  persistReportYearForAuth,
  setSelectedReportYear,
};
