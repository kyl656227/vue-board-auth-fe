<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute , useRouter} from 'vue-router';
import BoardList from './BoardList.vue';
import BoardService from '@/services/BoardService';
import { useAuthenticationStore } from '@/stores/authentication';

const authentication = useAuthenticationStore();
const router = useRouter();

const route = useRoute();
const state = reactive({
    data: {
    id: ''
    ,title: ''
    ,contents: ''
    ,createdAt:''
    ,nm:''
    ,userId:''
    }
});

onMounted(async() => {
    const id = route.params.id;
    console.log('id:' , id);
    const result = await BoardService.getBoard(id);
    state.data = result.resultData;
});

const doDelete = async () => {
    
    if(!confirm('삭제하시겠습니까')){
        return;
    }
    const params = {
        id: route.params.id
    }
    const result=await BoardService.deleteBoard(params);
    if(result.resultData){
        router.push('/board/list');
    } else {
        alert(result.resultMesaage);
    }
}

/* 
const goToMod = () => {
    router.push({
        path: '/board/write',
        state: {
            data: { 
            id: route.params.id
            , title: state.data.title
            , contents: state.data.contents
                }
        }   
    });
}
*/

</script>

<template>
    <span>
        <h3>📝게시판 디테일</h3>
    </span>
    <div>*️⃣ {{ state.data.id }}</div>            
    <div class="title">[{{ state.data.title }}]</div>
    <div>{{ state.data.contents }}</div>
    <div>🙋🏻‍♀️작성자: {{ state.data.nm }}  📆날짜: {{ state.data.createdAt }}</div>
    <div v-show="state.data.userId === authentication.state.signedUser.signedUserId">
        <button @click="doDelete(state.data.id)">삭제</button>
        <button @click="router.push(`/board/write/${state.data.id}`)">수정</button>
    </div>
    <div>
        <button @click="$router.push('/board/list')"> 목록 </button>
    </div>

</template>

<style scoped>
span {color: deepskyblue; text-decoration-line: underline;}
title {font-weight: bold; font-size: 1.2rem;}
</style>