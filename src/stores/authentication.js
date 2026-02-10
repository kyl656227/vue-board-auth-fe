import { reactive } from "vue";
import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore('authentication', ()=> {
    const state = reactive({
        signedUser: {
            signedUserId: 0,
            nm:''
        },
        isSigned: false
    });

    const signOut = () => {  
        state.isSigned = false;
        state.signedUser = null;
    }

    const signIn = signedUser => {
        state.isSigned = true;
        state.signedUser = signedUser;
    };

    return { state, signIn, signOut}},
    {persist: true}); //얘를 써야 피니아를 쓸 수 있음
