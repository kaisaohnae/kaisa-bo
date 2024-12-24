<template>
  <div class="detail-content">
    <h2>게시판 상세</h2>
    <div class="detail-scroll">
      <table class="detail-table">
        <caption>게시판 상세</caption>
        <tbody>
          <tr>
            <th scope="col">게시판번호</th>
            <td>
              {{ data.boardNo }}
            </td>
          </tr>
          <tr>
            <th scope="col">게시판카테고리아이디</th>
            <td>
              <input type="number" v-model="data.boardCategoryId"  />
            </td>
          </tr>
          <tr>
            <th scope="col">업체아이디</th>
            <td>
              <input type="text" v-model="data.companyId"  />
            </td>
          </tr>
          <tr>
            <th scope="col">제목</th>
            <td>
              <input type="text" v-model="data.title"  />
            </td>
          </tr>
          <tr>
            <th scope="col" colspan="2">내용</th>
          </tr>
          <tr>
            <td colspan="2">
              <div id="BoardEditor" />
            </td>
          </tr>
          <tr>
            <th scope="col">전시여부</th>
            <td>
              <CommonCode :cd="'isDisplay'" :model="data.isDisplay" @set-data="(val) => { data.isDisplay = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">태그</th>
            <td>
              <input type="text" v-model="data.tag" required />
            </td>
          </tr>
          <tr>
            <th scope="col">등록자</th>
            <td>
              {{ data.creator }}
            </td>
          </tr>
          <tr>
            <th scope="col">등록일시</th>
            <td>
              {{ data.createDt }}
            </td>
          </tr>
          <tr>
            <th scope="col">수정자</th>
            <td>
              {{ data.updater }}
            </td>
          </tr>
          <tr>
            <th scope="col">수정일시</th>
            <td>
              <input type="datetime" v-model="data.updateDt"  />
            </td>
          </tr>

        </tbody>
      </table>
      <!-- 기타 데이터 렌더링 -->
    </div>
    <div class="detail-bottom">
      <button type="button">저장</button>
      <button type="button">취소</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, reactive} from 'vue';
import BoardService from '@src/service/pd/BoardService';
import CommonCode from "@src/components/CommonCode.vue";
import gridUtil from '@src/utils/gridUtil';

const props = defineProps({
  data: { type: Object, required: true },
});

const edit = reactive({
  editor: {},
  editorOption: {}
});

const drawDetail = () => {
  edit.editor = gridUtil.createEditor({name: '#BoardEditor', cnts: props.data }); // props.data.contents
}
const getDetail = () => {
  if(props.data.boardNo) {
    BoardService.getBoard({ boardNo: props.data.boardNo}).then(
      (res) => {
        props.data.boardNo = res.data.boardNo
        props.data.boardCategoryId = res.data.boardCategoryId
        props.data.companyId = res.data.companyId
        props.data.title = res.data.title
        props.data.contents = res.data.contents
        props.data.isDisplay = res.data.isDisplay
        props.data.tag = res.data.tag
        props.data.creator = res.data.creator
        props.data.createDt = res.data.createDt
        props.data.updater = res.data.updater
        props.data.updateDt = res.data.updateDt

        drawDetail();
      },
      (err) => {
        console.log(err);
      },
    );
  } else {
    drawDetail();
  }
}
onMounted(() => {
  getDetail();
});
</script>
<style scoped>
</style>
