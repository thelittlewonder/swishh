<template>
  <div class="hello">
    <button @click="auth">Login with Dribbble</button>
    <p>{{code}}</p>
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
<style scoped>
</style>
