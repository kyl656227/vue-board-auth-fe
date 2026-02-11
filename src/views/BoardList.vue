<script setup>
import { reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import BoardService from '@/services/BoardService';

const router = useRouter();

const state = reactive({
    list: [],
    searchText: '',
    size: 50,
    currentPage: 1,
    maxPage: 0
});

const getBoardMaxPage = async () => {
    const params = { size: state.size }; // 한 페이지에 보여줄 개수 기본으로 챙김
    if(state.searchText) {
        params.search_text = state.searchText;
    }
    const result = await BoardService.getBoardMaxPage( params );
    state.maxPage = result.resultData;
} 

const getBoardList = async () => { // 화면에 뿌려줄 실제 게시물 데이터를 가져옴
    const params = {
        page: state.currentPage // 현재 몇 페이지인지
        , size: state.size
    };
    if(state.searchText) {
        params.search_text = state.searchText;
    }
    const result = await BoardService.getBoardList( params );
    state.list = result.resultData; // 서버에서 받아온 실제 게시물 배열을 state.list에 담음
}

onMounted(async () => {
    doSearch();    
}); // "전체 몇 페이지인지"와 "첫 번째 페이지의 목록"을 동시에 요청



const goToPage = page => {
    state.currentPage = page; // 현재 페이지 번호를 클릭한 번호로 변경
    getBoardList(); // 바뀐 페이지 번호에 맞는 목록을 다시 새로고침    
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 넘어갈 때 부드러운 스크롤링
}

const doSearch = () => {
    state.currentPage = 1;
    getBoardMaxPage();
    getBoardList();
}

const goToPrevPage = () => {
    const prevPage = startPage.value - 1;
    if(prevPage < 1 ) { return; }
    goToPage(prevPage);
}


const goToNextPage = () => {
    const nextPage = endPage.value + 1;
    if(nextPage > state.maxPage){ return; }
    goToPage(nextPage);
}

const moveToDetail = id => {
    router.push(`/board/${id}`);
}




// 페이징 그룹의 번호 갯수
const pageGroupSize = 10;
// 현재 페이지 그룹 계산
const currentGroup = computed( () => Math.ceil(state.currentPage / pageGroupSize) );
// 현재 그룹의 시작 페이지 번호
const startPage = computed ( () => ((currentGroup.value -1) * pageGroupSize + 1 ));
const endPage = computed ( () => Math.min(currentGroup.value * pageGroupSize), state.maxPage);
const displayedPages = computed( () => {
    const pages = [];
    for(let i=startPage.value; i<=endPage.value; i++){
        pages.push(i);
    }
    return pages;
    
});

const goToFisrtPage = () => {
    goToPage(1);
}

const goToLastPage = () => {
    router.push(`/board/${id}`);
}



</script>

<template>
<h3>게시판 리스트</h3>
<div><input type="search" v-model="state.searchText"><button @click="doSearch">검색</button></div>
<div v-if="state.list.length === 0">게시글이 없습니다.</div>
<div v-else>
    <table>
        <thead>
            <tr>
                <th>NO</th>
                <th>TITLE</th>
                <th>WRITE</th>
                <th>CREATED AT</th>
            </tr>
        </thead>
        <tbody>
            <tr @click="moveToDetail(item.id)" v-for="item in state.list" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.nm }}</td>
                <td>{{ item.createdAt }}</td>
            </tr>
        </tbody>
    </table>
    <div class="pagination">
    
        <button @click="goToFisrtPage" :disabled="startPage === 1">&lt;&lt;</button>
        <button @click="goToPrevPage" :disabled="startPage === 1">&lt;</button>
        <span class="page" v-for="item in displayedPages" 
        :key="item" :class="{selected: item == state.currentPage}" @click="goToPage(item)">
            {{ item }}
        </span>
        <button @click="goToNextPage" :disabled="endPage === state.maxPage">&gt;</button>
        <button @click="goToLastPage" :disabled="endPage === state.maxPage">&gt;&gt</button>       
    </div>
</div>

</template>

<style scoped>
table { border-collapse: collapse; }
table td, table th { border: 1px solid #eee; padding: 10px; }
table tbody tr:hover { background-color: aliceblue; cursor: pointer;}
.page { cursor: pointer; }
.page:not(:first-child) { margin-left: 8px; }
.selected { color: red; font-weight: bold; }
</style>