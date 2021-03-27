<template>
  <div class="auth"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "Auth",
  data() {
    return {
      dribbble_code: ""
    };
  },
  mounted: function() {
    let code = window.location.href.split("/")[3];
    code = code.substr(10, code.length);
    this.dribbble_code = code;
    //get context
    let vm = this;
    axios
      .get("https://bounnce-api.herokuapp.com?code="+this.dribbble_code)
      .then(function(response) {
        vm.$router.push("/" + response.data);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
