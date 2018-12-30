<template>
  <div>
      <h1>Analysis </h1>
  </div>
  
</template>

<script>
import axios from "axios";
export default {
  name: "Report",
  data() {
    return {
      
    };
  }, mounted: function() {
    //get username from the route
    let user = this.$route.params.id;
    console.log(user)
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
