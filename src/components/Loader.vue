<template>
  <div class="loader">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <h1>Please wait while we fetch shots from your account.</h1>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loader {
  margin-top: 2em;
  h1 {
    margin-top: 1em;
    font-family: "HKGrotesk-Regular";
    font-size: 24px;
    color: #999;
    text-align: center;
  }
  .spinner {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 1em auto;
  }

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #F25C76;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 1.5s infinite ease-in-out;
    animation: sk-bounce 1.5s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
}
</style>
