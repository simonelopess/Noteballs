<template>
    <div class="auth">
        <div class="tabs is-centered">
            <ul>
                <li :class="{ 'is-active': !register }"><a @click.prevent="register = false">Login</a></li>
                <li :class="{ 'is-active': register }"><a @click.prevent="register = true">Register</a></li>
            </ul>
        </div>
        <div class="card auth-form">
            <div class="card-content">
                <div class="title has-text-centered">
                    {{ title }}
                </div>
                <form @submit.prevent="onSubmit">                
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input  v-model="credentials.email" class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input v-model="credentials.password" class="input" type="password" placeholder="Enter a password">
                        </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-primary">
                                {{  title  }}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
/* Imports */


import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '@/store/storeAuth';

/* Register / Login */

const register = ref(false);
const title = computed(() => {
    return register.value ? 'Register' : 'Login'
});

const storeAuth = useAuthStore();

const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert('Please enter an email and password gosh darnit!')  
    } else {
        if (register.value)  {
            storeAuth.registerUser(credentials)
        } else {
            storeAuth.loginUser(credentials)
        }
    }
}

const credentials = reactive({
    email: '',
    password: ''
})

</script>

<style>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}
</style>