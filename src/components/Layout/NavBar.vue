<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
      <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

      <a
        @click.prevent="showMobileNav = !showMobileNav"   
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarBurgerRef"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" 
         class="navbar-menu" 
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
    >
      <div class="navbar-start">
        <button class="button is-small my-3 is-info ml-3" v-if="storeAuth.user.id" @click="logout">
          Log out {{  storeAuth.user.email }}
        </button>
      </div>
      <div class="navbar-end">
        <RouterLink to="/" class="navbar-item" active-class="is-active" @click="showMobileNav = false">
          Notes
        </RouterLink>
        <RouterLink to="/stats" class="navbar-item" active-class="is-active" @click="showMobileNav = false">
          Stats
        </RouterLink>
      </div>
    </div>
    </div>
  </nav>
</template>


<script setup>

import { ref  } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/store/storeAuth';


const storeAuth = useAuthStore();

 /* Mobile Nava */
 const showMobileNav = ref(false);

 const navbarMenuRef = ref(null);
 const navbarBurgerRef = ref(null);

 onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false;
 }, {
  ignore: [navbarBurgerRef]
 } )

const logout = ()  => {
  showMobileNav.value = false
  storeAuth.logoutUser()
}

</script>

<style>
    @media (max-width: 1023px) {
        .navbar-menu {
            position: absolute;
            left: 0;
            width: 100%;
        }
    }
</style>