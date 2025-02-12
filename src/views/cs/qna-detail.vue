<template>
  <div class="detail-content">
    <h2>문의 상세</h2>
    <div class="detail-scroll">
      <table class="detail-table">
        <caption>문의 상세</caption>
        <tbody>
          <tr>
            <th scope="col">질문번호</th>
            <td>
              {{ data.qnaNo }}
            </td>
          </tr>
          <tr>
            <th scope="col">회원명</th>
            <td>
              <input type="text" v-model="data.memberName"  />
            </td>
          </tr>
          <tr>
            <th scope="col">전화번호</th>
            <td>
              <input type="text" v-model="data.phoneNo"  />
            </td>
          </tr>
          <tr>
            <th scope="col">이메일</th>
            <td>
              <input type="text" v-model="data.email" required />
            </td>
          </tr>
          <tr>
            <th scope="col">제목</th>
            <td>
              <input type="text" v-model="data.title"  />
            </td>
          </tr>
          <tr>
            <th scope="col">내용</th>
            <td>
              <input type="text" v-model="data.content"  />
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
              {{ data.updateDt }}
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
import QnaService from '@/service/cs/qna-service';
import CommonCode from "@/components/common-code.vue";
import gridUtil from '@/utils/grid-util';

const props = defineProps({
  data: { type: Object, required: true },
});

const edit = reactive({
  editor: {},
  editorOption: {}
});

const drawDetail = () => {

}
const getDetail = () => {
  if(props.data.qnaNo) {
    QnaService.getQna({ qnaNo: props.data.qnaNo}).then(
      (res) => {
        props.data.qnaNo = res.data.qnaNo
        props.data.memberName = res.data.memberName
        props.data.phoneNo = res.data.phoneNo
        props.data.email = res.data.email
        props.data.title = res.data.title
        props.data.content = res.data.content
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
