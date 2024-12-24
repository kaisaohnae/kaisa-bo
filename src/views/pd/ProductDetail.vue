<template>
  <div class="detail-content">
    <h2>상품 상세</h2>
    <div class="detail-scroll">
      <table class="detail-table">
        <caption>상품 상세</caption>
        <tbody>
          <tr>
            <th scope="col">상품번호</th>
            <td>
              {{ data.productNo }}
            </td>
          </tr>
          <tr>
            <th scope="col">업체아이디</th>
            <td>
              <input type="text" v-model="data.companyId"  />
            </td>
          </tr>
          <tr>
            <th scope="col">시즌가격번호</th>
            <td>
              <input type="number" v-model="data.seasonPriceNo"  />
            </td>
          </tr>
          <tr>
            <th scope="col">상품명</th>
            <td>
              <input type="text" v-model="data.productName"  />
            </td>
          </tr>
          <tr>
            <th scope="col">인원수</th>
            <td>
              <input type="number" v-model="data.headCount"  />
            </td>
          </tr>
          <tr>
            <th scope="col">최대인원수</th>
            <td>
              <input type="number" v-model="data.maxHeadCount"  />
            </td>
          </tr>
          <tr>
            <th scope="col">평형</th>
            <td>
              <input type="number" v-model="data.m2"  />
            </td>
          </tr>
          <tr>
            <th scope="col">전시여부</th>
            <td>
              <CommonCode :cd="'isDisplay'" :model="data.isDisplay" @set-data="(val) => { data.isDisplay = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">애완동물여부</th>
            <td>
              <CommonCode :cd="'isPet'" :model="data.isPet" @set-data="(val) => { data.isPet = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">바베큐여부</th>
            <td>
              <CommonCode :cd="'isBBQ'" :model="data.isBBQ" @set-data="(val) => { data.isBBQ = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">픽업여부</th>
            <td>
              <CommonCode :cd="'isPickup'" :model="data.isPickup" @set-data="(val) => { data.isPickup = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">온돌여부</th>
            <td>
              <CommonCode :cd="'isStone'" :model="data.isStone" @set-data="(val) => { data.isStone = val; }" />
            </td>
          </tr>
          <tr>
            <th scope="col">메모</th>
            <td>
              <input type="text" v-model="data.memo" required />
            </td>
          </tr>
          <tr>
            <th scope="col">내용</th>
            <td>
              <input type="text" v-model="data.content" required />
            </td>
          </tr>
          <tr>
            <th scope="col">파일번호</th>
            <td>
              <input type="number" v-model="data.fileNo"  />
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
import ProductService from '@src/service/pd/ProductService';
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
  edit.editor = gridUtil.createEditor({name: '#ProductEditor', cnts: props.data }); // props.data.contents
}
const getDetail = () => {
  if(props.data.productNo) {
    ProductService.getProduct({ productNo: props.data.productNo}).then(
      (res) => {
        props.data.productNo = res.data.productNo
        props.data.companyId = res.data.companyId
        props.data.seasonPriceNo = res.data.seasonPriceNo
        props.data.productName = res.data.productName
        props.data.headCount = res.data.headCount
        props.data.maxHeadCount = res.data.maxHeadCount
        props.data.m2 = res.data.m2
        props.data.isDisplay = res.data.isDisplay
        props.data.isPet = res.data.isPet
        props.data.isBBQ = res.data.isBBQ
        props.data.isPickup = res.data.isPickup
        props.data.isStone = res.data.isStone
        props.data.memo = res.data.memo
        props.data.content = res.data.content
        props.data.fileNo = res.data.fileNo
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
