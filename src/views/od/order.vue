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
            <tr>
              <th scope="row">주문번호</th>
              <td colspan="3"><input type="text" v-model="search.orderNo"/></td>
            </tr>
            <tr v-show="auth.userInfo.companyId === 'kaisa'">
              <th scope="row">업체아이디</th>
              <td colspan="3"><input type="text" v-model="search.companyId"/></td>
            </tr>
            <tr>
              <th scope="row">예약일</th>
              <td colspan="3">
                <VueDatePicker
                  v-model="search.reserveDay"
                  :locale="'ko'"
                  :format="'yyyy-MM-dd'"
                  :style="{width: '160px'}"
                  class="input"
                  @update:model-value="(value: any) => {
                    search.reserveDay = dateUtil.format(value, 'YYYY-MM-DD')
                  }"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">주문상태코드</th>
              <td colspan="3"><CommonCodeRadio :cd="'orderStateCode'" :model="search.orderStateCode" @set-data="(val) => { search.orderStateCode = val; }" /></td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td colspan="3"><input type="text" v-model="search.phoneNo"/></td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td colspan="3"><input type="text" v-model="search.orderName"/></td>
            </tr>
            <tr>
              <th scope="row">이메일</th>
              <td colspan="3"><input type="text" v-model="search.email"/></td>
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
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '주문')">
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

</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import OrderService from '@/service/od/order-service';
import dateUtil from "@/utils/date-util";
import SelectDate from "@/components/select-date.vue";
import SelectGroupDate from "@/components/select-group-date.vue";
import CommonCodeRadio from "@/components/common-code-radio.vue";
import {useAuthStore} from "@/store/auth-store";
import Pagination from "@/components/pagination.vue";
import VueDatePicker from "@vuepic/vue-datepicker";



const auth = useAuthStore();
const search = reactive({
  orderNo: '',
  companyId: '',
  reserveDay: '',
  orderStateCode: '',
  phoneNo: '',
  orderName: '',
  email: '',
  updater: '',
  creator: '',
  startUpdateDt: '',
  endUpdateDt: '',
  createDt: '',
});
const data = reactive({
  required: [
    'companyId',
    'productNo',
    'reserveDay',
    'orderStateCode',
    'phoneNo',
    'orderName',
    'price',
    'addPrice',
    'salePrice',
    'headCount',
    'isHotWater',
    'isPickup',
    'isBBQ',
    'isPet',
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
  unique: ['orderNo'],
  required: [
    'companyId',
    'productNo',
    'reserveDay',
    'orderStateCode',
    'phoneNo',
    'orderName',
    'price',
    'addPrice',
    'salePrice',
    'headCount',
    'isHotWater',
    'isPickup',
    'isBBQ',
    'isPet',
  ],
}
let selectedRow = null as any;
const submitList = (event: Event) => {
  event?.preventDefault(); // submit 기본 동작을 막음
  getList();
}
const getList = () => {
  OrderService.getOrderList({
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
    orderNo: '',
    companyId: '',
    productNo: '',
    reserveDay: '',
    orderStateCode: '',
    reserveCode: '',
    phoneNo: '',
    orderName: '',
    email: '',
    price: '',
    addPrice: '',
    salePrice: '',
    headCount: '',
    isHotWater: '',
    isPickup: '',
    isBBQ: '',
    isPet: '',
    memo: '',
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
  OrderService.setOrderList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: [
      ...gridUtil.commonColumnNames,
      '주문번호',
      '업체아이디',
      '상품번호',
      '예약일',
      '주문상태코드',
      '예약코드',
      '전화번호',
      '이름',
      '이메일',
      '가격',
      '추가요금',
      '할인요금',
      '인원수',
      '온수여부',
      '픽업여부',
      '바베큐여부',
      '애완동물여부',
      '메모',
      ...gridUtil.auditColumnNames
    ],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      {data: 'orderNo', type: 'numeric', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'productNo', type: 'numeric', width: 150,   },
      {data: 'reserveDay', type: 'date', width: 170,   ...gridUtil.datePickerConfig },
      {data: 'orderStateCode', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['orderStateCode']?.map((o: any) => o.codeValue)) }},
      {data: 'reserveCode', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['reserveCode']?.map((o: any) => o.codeValue)) }},
      {data: 'phoneNo', type: 'text', width: 150,   },
      {data: 'orderName', type: 'text', width: 150,   },
      {data: 'email', type: 'text', width: 150,   },
      {data: 'price', type: 'numeric', width: 150,   },
      {data: 'addPrice', type: 'numeric', width: 150,   },
      {data: 'salePrice', type: 'numeric', width: 150,   },
      {data: 'headCount', type: 'numeric', width: 150,   },
      {data: 'isHotWater', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['isHotWater']?.map((o: any) => o.codeValue)) }},
      {data: 'isPickup', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['isPickup']?.map((o: any) => o.codeValue)) }},
      {data: 'isBBQ', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['isBBQ']?.map((o: any) => o.codeValue)) }},
      {data: 'isPet', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['isPet']?.map((o: any) => o.codeValue)) }},
      {data: 'memo', type: 'text', width: 150,   },
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
    ...gridUtil.defaultProps,
  });
  getList();
});
</script>
