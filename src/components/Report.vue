<template>
  <div>
    <h1 v-if="exists==='true'">Exists</h1>
    <h1 v-if="exists==='false'">Login</h1>
    <h1 v-if="exists==='working'">Calculating</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Report",
  data() {
    return {
      exists: 'working'
    };
  },
  mounted(){
    //get username from the route
    let user = this.$route.params.id;
    let vm = this
    axios
      .get("http://bounnce.herokuapp.com/data?user=" + this.$route.params.id)
      .then(function(response) {
        response.data.length === 1
          ? (vm.exists = 'true')
          : (vm.exists = 'false');
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
