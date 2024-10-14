<template>
  <div id="app">
    <Navbar v-if="$route.name !== 'Login'" />
    <router-view />
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue"
  export default {
    name: "App",
    components: {
      Navbar,
    },
    created() {
      const token = localStorage.getItem("authToken")
      if (token) {
        this.$store.dispatch("saveToken", token)
      } else {
        this.$router.push({ name: "Login" })
      }
    },
  }
</script>

<style></style>
