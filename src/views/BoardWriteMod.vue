<script setup>
import { reactive , onMounted} from 'vue';
import BoardService from '@/services/BoardService';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const state = reactive({
    board: {
        title:'',
        contents: '',
        id:0
    }
});


onMounted (async () => {
    const id = route.params.id;
    const result = await BoardService.getBoard(id);
    state.board = result.resultData;
   
});


/*
onMounted ( () => {
    console.log('route.query.id: ', route.query.id);
    
    if(history.state){ //넘어왔는 데이터가 있음.
        state.board = history.state.data;
        }   
    });
 */

const submit = async () => {
    const result = await BoardService.postBoard(state.board);
    console.log('result: ', result)
    router.push(`/board/${result.resultData}`);
}
</script>

<template>
<h3>
    <sapn class="dd">
    {{ state.board.id ? "글수정" : "새 글등록" }} 
    </sapn>
</h3>

<div><input type="text" placeholder="제목" v-model="state.board.title"</div>
<div><textarea placeholder="제목" v-model="state.board.contents"></textarea></div>
<div><button @click="submit">등록</button></div>
</template>

<style scoped>
.dd{ color: mediumpurple; font-size: larger;}
</style>