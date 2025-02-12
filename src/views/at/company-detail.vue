<template>
  <div class="detail-content">
    <h2>업체 상세</h2>
    <div class="detail-scroll">
      <table class="detail-table">
        <caption>업체 상세</caption>
        <tbody>
          <tr>
            <th scope="col">업체아이디</th>
            <td>
              {{ data.companyId }}
            </td>
          </tr>
          <tr>
            <th scope="col">업체유형코드</th>
            <td>
              <CommonCode :cd="'companyTypeCode'" :model="data.companyTypeCode" @set-data="(val) => { data.companyTypeCode = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">업체명</th>
            <td>
              <input type="text" v-model="data.companyName"  />
            </td>
          </tr>
          <tr>
            <th scope="col">위도</th>
            <td>
              <input type="text" v-model="data.lttd" required />
            </td>
          </tr>
          <tr>
            <th scope="col">경도</th>
            <td>
              <input type="text" v-model="data.lotd" required />
            </td>
          </tr>
          <tr>
            <th scope="col">주소</th>
            <td>
              <input type="text" v-model="data.address" required />
            </td>
          </tr>
          <tr>
            <th scope="col">전화번호</th>
            <td>
              <input type="text" v-model="data.phoneNo"  />
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
import CompanyService from '@/service/at/company-service';
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
    CompanyService.getCompany({ companyId: props.data.companyId}).then(
      (res) => {
        props.data.companyId = res.data.companyId
        props.data.companyTypeCode = res.data.companyTypeCode
        props.data.companyName = res.data.companyName
        props.data.lttd = res.data.lttd
        props.data.lotd = res.data.lotd
        props.data.address = res.data.address
        props.data.phoneNo = res.data.phoneNo
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
