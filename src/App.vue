<script setup>
import UserService from './services/UserService';
import { useAuthenticationStore } from './stores/authentication';


const authentication = useAuthenticationStore();

const doSignout = async() => {
  const result = await UserService.signOut();
  console.log('result:', result);
  console.log('typeof result.resultData: ', typeof result.resultData);
  if(result.resultData === 1){ 
    authentication.signOut();
  }  
}

</script>

<template>
  <header>
  <div>
    <template v-if="authentication.state.isSigned">
      🎉{{  authentication.state.signedUser.nm }}님 환영합니다🎉
    </template>
    <router-link to="/">홈</router-link>
    <router-link to="/board/list">리스트</router-link>
    <template v-if="authentication.state.isSigned">
      <router-link to="/board/write">글쓰기</router-link>
      <a href="" @click.prevent="doSignout">로그아웃</a>
    </template>
    <template v-else>
        <router-link to="/signup">회원가입</router-link>
        <router-link to="/signin">로그인</router-link>
    </template>
  </div>
</header>
<main>
  <router-view />
</main>
</template>

<style scoped>
</style>