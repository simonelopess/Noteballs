<template>
  <NavBar />
  <!-- <RouterLink to="/">Notes</RouterLink>
  <RouterLink to="/stats">Stats</RouterLink> -->

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>


<script setup>
  import { onMounted } from 'vue';
  import NavBar from './components/Layout/NavBar.vue';
import { useAuthStore } from './store/storeAuth';

  const authStore = useAuthStore();
  
  onMounted(()=>{
    authStore.init()   
  })


</script>

<style>
  @import 'bulma/css/bulma.min.css';
</style>