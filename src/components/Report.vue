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
    axios.get("http://bounnce.herokuapp.com/data?user="+this.$route.params.id).then(function(response){
      console.log(response.data[0])
    })
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
