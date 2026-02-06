<script setup>
import UserService from '@/services/UserService';
import { reactive, useAttrs } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';

const authentication = useAuthenticationStore();

const state = reactive({
    modeShowPw : false,
    signin : {
        uid: 'mic2', //미리 지정해놓으면 로그인때마다 안 쳐도됨.
        upw: '1212'
    }
    
});

const changeModeShowPw = () => {
    state.modeShowPw = !state.modeShowPw;
}

const signIn = async () => {
    const result = await UserService.signIn(state.signin);
    console.log('result:', result);

    authentication.signIn(result.resultData);
}

</script>

<template>
<h3>로그인</h3>
<div><input type="text" placeholder="아이디" v-model="state.signin.uid"</div>
<div>
    <input :type="state.modeShowPw ? 'text' : 'password'" placeholder="비밀번호" v-model="state.signin.upw">
    <button @click="changeModeShowPw">비밀번호 보기</button></div>
<div><button @click="signIn">로그인</button></div>
</template>

<style scoped>

</style>