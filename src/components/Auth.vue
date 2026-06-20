<template>
  <div class="auth">
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { buildApiUrl } from "../config";
import { getReportYearAuthParam } from "../debug";

export default {
  name: "Auth",
  data() {
    return {
      dribbble_code: "",
      error: "",
    };
  },
  mounted: function() {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get("error");
    const oauthErrorDescription = params.get("error_description");

    if (oauthError) {
      this.error =
        oauthErrorDescription ||
        "Dribbble authorization failed: " + oauthError;
      return;
    }

    const code = params.get("code");
    const state = params.get("state");
    const savedState = window.localStorage.getItem("swishhh_dribbble_state");

    if (!code) {
      this.error = "Missing Dribbble authorization code.";
      return;
    }

    if (savedState && state !== savedState) {
      this.error = "Invalid Dribbble state.";
      return;
    }

    this.dribbble_code = code;

    let vm = this;
    const callbackParams = {
      code: this.dribbble_code,
      state: state || "",
    };
    const reportYear = getReportYearAuthParam();

    if (reportYear) {
      callbackParams.reportYear = reportYear;
    }

    axios
      .get(buildApiUrl("/auth/dribbble/callback"), {
        params: callbackParams,
      })
      .then(function(response) {
        window.localStorage.removeItem("swishhh_dribbble_state");
        vm.$router.push("/" + response.data.username);
      })
      .catch(function(error) {
        vm.error =
          error.response?.data?.error || "Unable to authenticate with Dribbble.";
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auth {
  max-width: 720px;
  margin: 4rem auto;
  padding: 0 2rem;
  font-family: sans-serif;
  color: #1c2445;
  line-height: 1.5;
}
</style>
