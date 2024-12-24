<template>
  <form class="search" @submit="submitList" @keyup.enter="submitList">
    <fieldset>
      <legend>검색</legend>
      <table>
        <colgroup>
          <col style="width: 80px">
          <col style="width: 30%">
          <col style="width: 80px">
          <col>
        </colgroup>
        <tbody>
            <tr v-show="auth.userInfo.companyId === 'kaisa'">
              <th scope="row">업체아이디</th>
              <td colspan="3"><input type="text" v-model="search.companyId"/></td>
            </tr>
            <tr>
              <th scope="row">상품명</th>
              <td colspan="3"><input type="text" v-model="search.productName"/></td>
            </tr>
        </tbody>
        <tbody class="audit" v-show="data.audit">
          <tr>
            <th scope="row">수정기간</th>
            <td colspan="3">
              <SelectGroupDate
                :format="'yyyy-MM-dd'"
                :date="[search.startUpdateDt, search.endUpdateDt]"
                @set-start-date="(o: any) => { search.startUpdateDt = o.date; }"
                @set-end-date="(o: any) => { search.endUpdateDt = o.date; }"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">등록일</th>
            <td colspan="3">
              <SelectDate
                :format="'yyyy-MM-dd'"
                :date="[search.createDt]"
                @set-start-date="(o: any) => { search.createDt = o.date; }"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">수정ID</th>
            <td><input type="text" v-model="search.updater"/></td>
            <th scope="row">등록ID</th>
            <td><input type="text" v-model="search.creator"/></td>
          </tr>
        </tbody>

      </table>
    </fieldset>
    <div class="btnWrap">
      <span class="crud">
        <button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>추가</button>
        <button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>
        <button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
        <button type="button" class="button reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span>초기화</button>
      </span>
      <button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>

      <button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
      <button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '상품')">
        <span class="icon">&#xf1c3;</span>
      </button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid" class="grid-container"></div>
  <div class="no-list" v-show="data.list.length === 0">조회 내역이 없습니다.</div>
  <Pagination
    :currentPage="data.currentPage"
    :lastPage="data.lastPage"
    @update:page="handlePageChange"
  />
  <Detail
    :component="ProductDetail"
    :data="showDetailData"
    :show="showDetail"
    v-if="showDetail"
    @close="showDetail = false"
  />

</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
import excelUtil from '@src/utils/excelUtil';
import ProductService from '@src/service/pd/ProductService';
import dateUtil from "@src/utils/dateUtil";
import SelectDate from "@src/components/SelectDate.vue";
import SelectGroupDate from "@src/components/SelectGroupDate.vue";
import CommonCodeRadio from "@src/components/CommonCodeRadio.vue";
import {useAuthStore} from "@src/store/authStore";
import Pagination from "@src/components/Pagination.vue";
import VueDatePicker from "@vuepic/vue-datepicker";

import Detail from "@src/views/common/Detail.vue";
import ProductDetail from "@src/views/pd/ProductDetail.vue";

const showDetailData = ref<any>(null); // 선택된 데이터를 저장
const showDetail = ref(false); // Detail 컴포넌트 표시 여부


const auth = useAuthStore();
const search = reactive({
  companyId: '',
  productName: '',
  updater: '',
  creator: '',
  startUpdateDt: '',
  endUpdateDt: '',
  createDt: '',
});
const data = reactive({
  required: [
    'companyId',
    'seasonPriceNo',
    'productName',
    'headCount',
    'maxHeadCount',
    'm2',
    'isDisplay',
    'isPet',
    'isBBQ',
    'isPickup',
    'isStone',
    'fileNo',
  ],
  grid: {} as Handsontable,
  list: [] as any,
  audit: false,
  totalCount: 0,
  currentPage: 1,
  totalPage: 50,
  lastPage: 1,
});
const gridProps = {
  unique: ['productNo'],
  required: [
    'companyId',
    'seasonPriceNo',
    'productName',
    'headCount',
    'maxHeadCount',
    'm2',
    'isDisplay',
    'isPet',
    'isBBQ',
    'isPickup',
    'isStone',
    'fileNo',
  ],
}
let selectedRow = null as any;
const submitList = (event: Event) => {
  event?.preventDefault(); // submit 기본 동작을 막음
  getList();
}
const getList = () => {
  ProductService.getProductList({
    ...search,
    page: data.currentPage,
    totalPage: data.totalPage,
  }).then(
    (res: any) => {
      data.list = res.data?.list;
      data.totalCount = res.data?.totalCount;
      data.currentPage = res.data?.currentPage;
      data.lastPage = res.data?.lastPage;
      if (data.grid) {
        data.grid.updateSettings({
          data: data.list,
        });
      }
    },
    (err) => {
      console.log(err);
    },
  );
};
const handlePageChange = (page: number) => {
  data.currentPage = page;
  getList();
};
const add = () => {
  const newRow = {
    ...gridUtil.commonAddColumns,
    productNo: '',
    companyId: '',
    seasonPriceNo: '',
    productName: '',
    headCount: '',
    maxHeadCount: '',
    m2: '',
    isDisplay: '',
    isPet: '',
    isBBQ: '',
    isPickup: '',
    isStone: '',
    memo: '',
    content: '',
    fileNo: '',
      ...gridUtil.auditAddColumns,
  };
  data.list = gridUtil.add({newRow, list: data.list, grid: data.grid});
};
const del = () => {
  gridUtil.del({selectedRow, grid: data.grid});
};

// 수정된 데이터를 저장하는 기능
const save = () => {
  const saveList = gridUtil.valid({list: data.list, required: gridProps.required});
  if (!saveList) {
    return;
  }
  ProductService.setProductList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: [
      ...gridUtil.commonColumnNames,
      '상품번호',
      '업체아이디',
      '시즌가격번호',
      '상품명',
      '인원수',
      '최대인원수',
      '평형',
      '전시여부',
      '애완동물여부',
      '바베큐여부',
      '픽업여부',
      '온돌여부',
      '메모',
      '내용',
      '파일번호',
      ...gridUtil.auditColumnNames
    ],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      {data: 'productNo', type: 'numeric', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'seasonPriceNo', type: 'numeric', width: 150,   },
      {data: 'productName', type: 'text', width: 150,  className: 'underline', },
      {data: 'headCount', type: 'numeric', width: 150,   },
      {data: 'maxHeadCount', type: 'numeric', width: 150,   },
      {data: 'm2', type: 'numeric', width: 150,   },
      {data: 'isDisplay', type: 'numeric', width: 150,   },
      {data: 'isPet', type: 'numeric', width: 150,   },
      {data: 'isBBQ', type: 'numeric', width: 150,   },
      {data: 'isPickup', type: 'numeric', width: 150,   },
      {data: 'isStone', type: 'numeric', width: 150,   },
      {data: 'memo', type: 'text', width: 150,   },
      {data: 'content', type: 'text', width: 150,   },
      {data: 'fileNo', type: 'numeric', width: 150,   },
      ...gridUtil.auditColumns,
    ],
    cells: function (row, col) {
      return gridUtil.cellsEvent({row, col, grid: data.grid, self: this, pk: []}); // pk 배열 추가시 수정은 된다.
    },
    afterChange(changes, source) {
      gridUtil.afterChangeEvent({changes, source, gridProps, grid: data.grid, self: this});
    },
    afterSelectionEnd: function (row, col, row2, col2) {
      selectedRow = row;
    },
    afterOnCellMouseDown: (event, coords) => {
      const colHeader = data.grid.getColHeader(coords.col); // 칼럼 헤더 확인
      const rowData = data.grid.getSourceDataAtRow(coords.row); // 선택된 행의 데이터
      if (colHeader === '상품명' && rowData) {
        showDetailData.value = rowData;
        showDetail.value = true;
      }
    },
    ...gridUtil.defaultProps,
  });
  getList();
});
</script>
