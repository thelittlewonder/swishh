<template>
  <div class="home">
    <vue-headful title="Swishhh - 2019 Dribbble Report Card" description="Visualise your year of Dribbbling"/>
    <div class="logo">
      <router-link to="/">
        <img src="../assets/swishhhllogo.svg" alt="Swishhh">
      </router-link>
    </div>
    <div class="header">
      <div class="content">
        <h1>Visualise your year of Dribbbling</h1>
        <h2>2019 Year in Review Report Card for your Dribbble Profile</h2>
        <button @click="auth">
          <img src="../assets/dribbble.svg">Analyse My Dribbble Profile
        </button>
      </div>
      <div class="banner">
        <img class="bannerimg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      client_id:
        "a7175aac5cccae62b2f94952db17a8c8e74a69e2d05cd04dd796e44a0baedc73"
    };
  },
  methods: {
    auth: function() {
      //open auth window
      window.location.href =
        "https://dribbble.com/oauth/authorize?" + "client_id=" + this.client_id;
    }
  }
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
