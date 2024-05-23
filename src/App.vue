<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="sticky top-0 bg z-50">
    <Navbar/>
  </header>
  <RouterView />
  <footer>
    <Footer />
  </footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Navbar,
  },
};
</script>

<style></style>
