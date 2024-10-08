<template>
  <div id="main">
    <ul class="orderState">
      <li class="reserving">
        <p class="codeName">예약중</p>
        <p class="count">{{ getStateCount('예약중') }}</p>
      </li>
      <li class="canceled">
        <p class="codeName">예약취소</p>
        <p class="count">{{ getStateCount('예약취소') }}</p>
      </li>
      <li class="paymentCanceled">
        <p class="codeName">결제취소</p>
        <p class="count">{{ getStateCount('결제취소') }}</p>
      </li>
      <li class="paymentCompleted">
        <p class="codeName">결제완료</p>
        <p class="count">{{ getStateCount('결제완료') }}</p>
      </li>
    </ul>
    <h2>월별 매출현황</h2>
    <div style="width:100%; padding:10px 0 20px 0; overflow:auto;">
      <Chart :size="{ width: 1820, height: 500 }" :data="data.monthlyData" :margin="{ left: 0, top: 10, right: 0, bottom: 0 }" :direction="'horizontal'" :axis="computedAxis">
        <template #layers>
          <Grid strokeDasharray="2,2"/>
          <Line :dataKeys="['reserveMonth', 'sumPrice']" type="monotone" :lineStyle="{
            stroke: '#9f7aea'
          }"/>
          <defs>
            <linearGradient id="grad" gradientTransform="rotate(90)">
              <stop offset="0%" stop-color="#be90ff" stop-opacity="1"/>
              <stop offset="100%" stop-color="white" stop-opacity="0.4"/>
            </linearGradient>
          </defs>
        </template>
        <template #widgets>
          <Tooltip borderColor="#48CAE4" :config="{
            pl: { color: '#9f7aea' },
          }"/>
        </template>
      </Chart>
    </div>
    <div class="totalPrice">총 매출: {{ data.totalPrice }}</div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, computed} from 'vue'
import {Chart, Grid, Line, Tooltip} from 'vue3-charts'
import MainService from '@src/service/common/MainService';

const data = reactive({
  monthlyData: [
    {reserveMonth: '01', sumPrice: 0},
    {reserveMonth: '02', sumPrice: 0},
    {reserveMonth: '03', sumPrice: 0},
    {reserveMonth: '04', sumPrice: 0},
    {reserveMonth: '05', sumPrice: 0},
    {reserveMonth: '06', sumPrice: 0},
    {reserveMonth: '07', sumPrice: 0},
    {reserveMonth: '08', sumPrice: 0},
    {reserveMonth: '09', sumPrice: 0},
    {reserveMonth: '10', sumPrice: 0},
    {reserveMonth: '11', sumPrice: 0},
    {reserveMonth: '12', sumPrice: 0},
  ],
  orderStateData: [
    {orderStateCount: 0, orderStateCode: '예약중'},
    {orderStateCount: 0, orderStateCode: '예약취소'},
    {orderStateCount: 0, orderStateCode: '결제취소'},
    {orderStateCount: 0, orderStateCode: '결제완료'},
  ],
  totalPrice: 0,
});

const getStateCount = (orderStateCode: string) => {
  const state = data.orderStateData.find(item => item.orderStateCode === orderStateCode);
  return state ? state.orderStateCount : 0;
}

const computedAxis = computed(() => {
  const maxDataValue = Math.max(...data.monthlyData.map(d => d.sumPrice), 0);
  const minDataValue = Math.min(...data.monthlyData.map(d => d.sumPrice), 0);
  return {
    primary: {
      type: 'band'
    },
    secondary: {
      domain: [Math.floor(minDataValue * 0.9), Math.ceil(maxDataValue * 1.1)],
      type: 'linear',
      ticks: 20
    }
  };
});

const setDashboard = () => {
  MainService.dashboard({}).then(
    (res: any) => {
      data.totalPrice = res.totalPrice;
      data.monthlyData = res.monthlyData;
      data.orderStateData = res.orderStateData;
    },
    (err) => {
      console.log(err);
    },
  );
}

onMounted(() => {
  setDashboard();
});
</script>

<style scoped>
h2 {
  color: #000;
  font-size: 14px;
  padding: 10px 0;
}

.orderState {
  width: 100%;
  clear: both;
  white-space: nowrap;
  text-align: center;
  padding: 20px 0;
}

.orderState li {
  width: 25%;
  display: inline-block;
  line-height: 30px;
  height: 100px;
  border-right: 1px solid #eee;
  color: #000;
}

.orderState li:last-child {
  border-right: 0;
}

.orderState li .codeName {
  padding-top: 10px;
  font-size: 14px;
}

.orderState li .count {
  font-size: 28px;
  padding-top: 10px;
  font-weight: bold;
}

.orderState li.reserving {
  color: #ff5500;
}

.orderState li.canceled {
  color: #bbb;
}

.orderState li.canceled .count {
  text-decoration: line-through;
}

.orderState li.paymentCanceled {
  color: #999;
}

.orderState li.paymentCompleted {
  color: #000;
}

.totalPrice {
  text-align: right;
  font-size: 13px;
  color: #000;
  padding: 5px 10px 0 0;
}
</style>
