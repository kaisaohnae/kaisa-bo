<template>
  <div class="detail-content">
    <h2>사용자 상세</h2>
    <div class="detail-scroll">
      <table class="detail-table">
        <caption>사용자 상세</caption>
        <tbody>
          <tr>
            <th scope="col">사용자아이디</th>
            <td>
              {{ data.userId }}
            </td>
          </tr>
          <tr>
            <th scope="col">업체아이디</th>
            <td>
              {{ data.companyId }}
            </td>
          </tr>
          <tr>
            <th scope="col">사용자이름</th>
            <td>
              <input type="text" v-model="data.userName"  />
            </td>
          </tr>
          <tr>
            <th scope="col">전화번호</th>
            <td>
              <input type="text" v-model="data.phoneNo"  />
            </td>
          </tr>
          <tr>
            <th scope="col">비밀번호수정일시</th>
            <td>
              <input type="datetime" v-model="data.passwordUpdateDt"  />
            </td>
          </tr>
          <tr>
            <th scope="col">메모</th>
            <td>
              <input type="text" v-model="data.memo" required />
            </td>
          </tr>
          <tr>
            <th scope="col">로그인일시</th>
            <td>
              <input type="datetime" v-model="data.loginDt"  />
            </td>
          </tr>
          <tr>
            <th scope="col">사용자상태코드</th>
            <td>
              <CommonCode :cd="'userStateCode'" :model="data.userStateCode" @set-data="(val) => { data.userStateCode = val; }" />
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
import UserService from '@/service/at/user-service';
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
  if(props.data.companyId) {
    UserService.getUser({ companyId: props.data.companyId}).then(
      (res) => {
        props.data.userId = res.data.userId
        props.data.companyId = res.data.companyId
        props.data.userName = res.data.userName
        props.data.phoneNo = res.data.phoneNo
        props.data.passwordUpdateDt = res.data.passwordUpdateDt
        props.data.memo = res.data.memo
        props.data.loginDt = res.data.loginDt
        props.data.userStateCode = res.data.userStateCode
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
