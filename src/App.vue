<template>
  <NavBar />
  <!-- <RouterLink to="/">Notes</RouterLink>
  <RouterLink to="/stats">Stats</RouterLink> -->
 <RouterView />
</template>


<script setup>
  import NavBar from './components/Layout/NavBar.vue';
</script>

<style>
  @import 'bulma/css/bulma.min.css';
</style>