<template>
  <div class="pagination">
    <span class="icon first" @click="() => {
        if (currentPage !== 1){
          changePage(1)
        }
      }">
      &#xf100;
    </span>
    <span class="icon pre" @click="() => {
        if (currentPage !== 1){
          changePage(currentPage - 1)
        }
      }">
      &#xf104;
    </span>
    <!-- 현재 페이지에 따라 표시할 페이지들 -->
    <template v-for="page in visiblePages" :key="page">
      <span @click="changePage(page)" class="page" :class="{ active: page === currentPage }">{{ page }}</span>
    </template>
    <span class="icon next" @click="() => {
        if (currentPage !== lastPage){
          changePage(currentPage + 1);
        }
      }"
    >
      &#xf105;
    </span>
    <span class="icon last" @click="() => {
        if (currentPage !== lastPage){
          changePage(lastPage)
        }
      }">
      &#xf101;
    </span>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  currentPage: {type: Number, required: true},
  lastPage: {type: Number, required: true}
});

const emit = defineEmits(['update:page']);

// 한 번에 건너뛸 페이지 수
const pageSize = 10;

// 현재 페이지 기준으로 보여줄 페이지 버튼 계산
const visiblePages = computed(() => {
  const startPage = Math.floor((props.currentPage - 1) / pageSize) * pageSize + 1; // 현재 페이지에서 시작 페이지 계산
  const endPage = Math.min(startPage + pageSize - 1, props.lastPage); // 마지막 페이지 계산
  const pages = [];
  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }
  return pages;
});

// 페이지 변경 처리
const changePage = (page: number) => {
  if (page < 1 || page > props.lastPage) return; // 페이지 범위 체크
  emit('update:page', page); // 페이지 변경 이벤트 발생
}
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 3px;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
}
.pagination span {
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  width: 28px;
  height: 28px;
  line-height: 25px;
  color: #666;
  display: inline-block;
}
.pagination .first {
  margin-right: -5px;
}
.pagination .last {
  margin-left: -5px;
}
.pagination .page {
  font-size: 12px;
  border: 1px solid #777;
}
.pagination .page.active {
  color: #fff;
  background-color: #777;
}
</style>
