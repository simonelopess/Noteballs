import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'

export const useAuthStore = defineStore('storeAuth', {
    state: () => {
        return { }
    },
    actions: {
        registerUser(credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
              .then((userCredential) => {                
                const user = userCredential.user
              }).catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message

                console.log("error.message", errorMessage)
              });
            
        },
        loginUser(credentials) {
            // if (credential.login === this.creditial.login && credential.password === this.credial.password)
        }
    }
})

