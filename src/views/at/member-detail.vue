<template>
  <div class="detail-content">
    <h2>회원 상세</h2>
    <div class="detail-scroll">
      <table class="detail-table">
        <caption>회원 상세</caption>
        <tbody>
          <tr>
            <th scope="col">회원아이디</th>
            <td>
              {{ data.memberId }}
            </td>
          </tr>
          <tr>
            <th scope="col">업체아이디</th>
            <td>
              {{ data.companyId }}
            </td>
          </tr>
          <tr>
            <th scope="col">회원이름</th>
            <td>
              <input type="text" v-model="data.memberName"  />
            </td>
          </tr>
          <tr>
            <th scope="col">이메일</th>
            <td>
              <input type="text" v-model="data.email" required />
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
            <th scope="col">로그인일시</th>
            <td>
              <input type="datetime" v-model="data.loginDt"  />
            </td>
          </tr>
          <tr>
            <th scope="col">메모</th>
            <td>
              <input type="text" v-model="data.memo" required />
            </td>
          </tr>
          <tr>
            <th scope="col">회원상태코드</th>
            <td>
              <CommonCode :cd="'memberStateCode'" :model="data.memberStateCode" @set-data="(val) => { data.memberStateCode = val; }" />
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
import MemberService from '@/service/at/member-service';
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
    MemberService.getMember({ companyId: props.data.companyId}).then(
      (res) => {
        props.data.memberId = res.data.memberId
        props.data.companyId = res.data.companyId
        props.data.memberName = res.data.memberName
        props.data.email = res.data.email
        props.data.phoneNo = res.data.phoneNo
        props.data.passwordUpdateDt = res.data.passwordUpdateDt
        props.data.loginDt = res.data.loginDt
        props.data.memo = res.data.memo
        props.data.memberStateCode = res.data.memberStateCode
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
