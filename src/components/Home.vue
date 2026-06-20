<template>
  <div class="home">
    <vue-headful
      title="Swishhh - Annual Dribbble Report Card"
      description="Visualise your year of Dribbbling"
    />
    <div class="logo" @click="onLogoClick">
      <router-link to="/" @click.native.prevent>
        <img src="../assets/swishhhllogo.svg" alt="Swishhh" />
      </router-link>
      <span v-if="debugMode" class="debug-badge">debug</span>
    </div>
    <div class="header">
      <div class="content">
        <h1>Visualise your year of Dribbbling</h1>
        <h2>
          <span
            v-if="debugMode"
            class="year-picker"
            title="Click to change report year"
            @click="cycleYear"
          >{{ selectedYear }}</span>
          <span v-else>{{ getLastYear }}</span>
          Year in Review Report Card for your Dribbble Profile
        </h2>
        <button @click="auth">
          <img src="../assets/dribbble.svg" />Analyse My Dribbble Profile
        </button>
      </div>
      <div class="banner">
        <img class="bannerimg" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  cycleReportYear,
  enableDebugMode,
  getDefaultReportYear,
  getSelectedReportYear,
  isDebugModeEnabled,
} from "../debug";
import { startDribbbleAuth } from "../dribbbleAuth";

const LOGO_CLICKS_TO_DEBUG = 5;
const LOGO_CLICK_RESET_MS = 2000;

export default {
  name: "Home",
  data() {
    return {
      debugMode: isDebugModeEnabled(),
      selectedYear: getSelectedReportYear(),
      logoClicks: 0,
      logoClickTimer: null,
    };
  },
  computed: {
    getLastYear: function () {
      return getDefaultReportYear();
    },
  },
  methods: {
    onLogoClick: function () {
      if (this.debugMode) {
        return;
      }

      this.logoClicks += 1;

      if (this.logoClickTimer) {
        clearTimeout(this.logoClickTimer);
      }

      this.logoClickTimer = setTimeout(() => {
        this.logoClicks = 0;
      }, LOGO_CLICK_RESET_MS);

      if (this.logoClicks >= LOGO_CLICKS_TO_DEBUG) {
        this.debugMode = true;
        this.logoClicks = 0;
        enableDebugMode();
      }
    },
    cycleYear: function () {
      this.selectedYear = cycleReportYear(this.selectedYear);
    },
    auth: function () {
      startDribbbleAuth(this.debugMode ? this.selectedYear : this.getLastYear);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@font-face {
  font-family: "HKGrotesk-Regular";
  src: url("../assets/hkgrotesk-regular-webfont.woff2") format("woff2"),
    url("../assets/hkgrotesk-regular-webfont.woff") format("woff");
  font-weight: normal;
}
@font-face {
  font-family: "Prata";
  src: url("../assets/prata-regular-webfont.woff2") format("woff2"),
    url("../assets/prata-regular-webfont.woff") format("woff");
  font-weight: normal;
}
.home {
  .logo {
    position: relative;
    display: inline-block;

    .debug-badge {
      position: absolute;
      top: -0.25em;
      right: -0.5em;
      padding: 0.15em 0.45em;
      border-radius: 999px;
      background: #1c2445;
      color: #ffffff;
      font-family: "HKGrotesk-Regular";
      font-size: 0.65em;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  }

  .year-picker {
    color: #f765b8;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  .header {
    display: flex;
    h1 {
      font-family: "Prata";
      font-size: 48px;
      color: #1c2445;
      letter-spacing: -1px;
      line-height: 1.25em;
    }
    h2 {
      font-family: "HKGrotesk-Regular";
      font-size: 32px;
      color: #666666;
      letter-spacing: 0;
      line-height: 48px;
    }
    button {
      background: #f765b8;
      cursor: pointer;
      font-family: "HKGrotesk-Regular";
      font-size: 1.25em;
      color: #ffffff;
      line-height: 1.25em;
      border: none;
      text-align: center;
      border-radius: 2px;
      &:focus {
        outline: none;
      }
      img {
        margin-right: 0.5em;
        vertical-align: bottom;
      }
    }
  }
}

@media screen and (min-width: 980px) {
  .logo {
    display: inline-block;
    img {
      height: 64px;
    }
  }
  .header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .content {
      max-width: 550px;
    }
    .banner {
      .bannerimg {
        content: url("../assets/headerWeb.svg");
        height: 80vh;
      }
    }
    button {
      padding: 0.75em;
    }
  }
  .home {
    max-width: 1440px;
    margin: 0 auto;
    padding: 2em 0 2em 5em;
  }
  h2 {
    margin: 0.5em 0 2em 0;
  }
}
@media screen and (max-width: 979px) {
  .logo {
    text-align: center;
    img {
      height: 64px;
    }
  }
  .header {
    flex-direction: column-reverse;
    .banner {
      margin: 2em 0;
      text-align: center;
      .bannerimg {
        content: url("../assets/headerMobile.svg");
      }
    }
    button {
      padding: 1em;
      width: 100%;
    }
  }
  .home {
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2 {
    margin: 1em 0 2em 0;
  }
}
</style>
