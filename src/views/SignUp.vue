<script setup>
import { reactive } from 'vue';
import UserService from '@/services/UserService';

const state = reactive({
    signup:{
        uid:'',
        upw:'',
        nm:'',
        gender:2
    },
    checkPw:''
});

const doSignUp = async() =>{
    if(state.signup.upw !== state.checkPw){
        alert('비밀번호를 확인해 주세요');
        return;
    }
    const result = await UserService.signUp(state.signup);
    console.log('result: ',result);
}
</script>

<template>
<h2>회원가입</h2>
<div><lable>아이디: <input type="text" v-model="state.signup.uid"></lable></div>
<div><lable>비밀번호: <input type="password" v-model="state.signup.upw"></lable></div>
<div><lable>확인 비밀번호: <input type="password" v-model="state.checkPw"></lable></div>
<div><lable>이름: <input type="text" v-model="state.signup.nm"></lable></div>

<div>
    성별: {{  state.signup.gender }}
    <label>여성<input type="radio" value="2" v-model="state.signup.gender"></label>
    <label>남성<input type="radio" value="1" v-model="state.signup.gender"></label>
</div>
<div><button @click="doSignUp">회원가입</button></div>
</template>

<style scoped>

</style>