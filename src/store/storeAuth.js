import { defineStore, acceptHMRUpdate } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, onAuthStateChanged} from 'firebase/auth'

import { auth } from '@/config/firebase'

export const useAuthStore = defineStore('storeAuth', {
    state: () => {
        return {
          user: {
            id: '',
            email: ''
          },
         }
    },
    actions: {
        init() {
          onAuthStateChanged(auth, (user) => {
            if (user) {              
              this.user.id = user.uid;
              this.user.email = user.email;
              this.router.push('/')
            } else {
              this.user = {}
              this.router.replace('/auth')
            }
          });
        },
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
          // console.log(credentials)
          signInWithEmailAndPassword(auth, credentials.email, credentials.password)
          .then((userCredential) => {
            // Signed in 
            this.user.id = userCredential.user.uid;
            this.user.email = userCredential.user.email;

            // console.log(user)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // console.log(errorMessage)
          });
        },
        logoutUser() {
          signOut(auth).then(() => {
            console.log('usuário deslogado')
          }).catch((error) => {
            // An error happened.
          });
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}