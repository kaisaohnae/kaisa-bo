<template>
  <div id="calendar">
    <div class="calendar-controls">
      <h2>
        <span class="icon" @click="move('prev')">&#xe046;</span>
        <span class="calendar-nav">
          {{ calendar.year }} 년
          {{ calendar.month }} 월
        </span>
        <span class="icon" @click="move('next')">&#xe048;</span></h2>
    </div>
    <div class="calendar-grid">
      <div class="calendar-day" v-for="(o, index) in calendar.days" :key="index">
        <div class="day-number">{{ o.day > 0 ? o.day : '' }}</div>
        <div v-if="o.reservations.length > 0">
          <div v-for="(rsv, rsvIndex) in o.reservations" :key="rsvIndex" class="product">
            <p :class="getClassForOrderState(rsv.orderStateCode)">
              <span class="productName">{{ rsv.productName }}</span>
              <span class="price">{{ rsv.price }}</span>
              <span class="orderStateCode">{{ rsv.orderStateCode }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, onMounted, computed} from 'vue';
import dateUtil from '@src/utils/dateUtil';
import MainService from '@src/service/common/MainService';

const calendar = reactive({
  date: new Date(),
  year: dateUtil.format(new Date(), 'YYYY'),
  month: dateUtil.format(new Date(), 'MM'),
  days: [] as Array<{
    day: number,
    reservations: Array<{
      price: number,
      productNo: number,
      productName: string,
      orderStateCode: string,
    }>,
  }>,
});

const getClassForOrderState = (orderStateCode: string) => {
  switch (orderStateCode) {
    case '결제완료':
      return 'paid';
    case '예약중':
      return 'pending';
    case '예약가능':
      return 'available';
    default:
      return 'default';
  }
};

const move = (str: string) => {
  if (str === 'prev') {
    calendar.date.setMonth(calendar.date.getMonth() - 1);
  } else {
    calendar.date.setMonth(calendar.date.getMonth() + 1);
  }
  calendar.year = dateUtil.format(calendar.date, 'YYYY');
  calendar.month = dateUtil.format(calendar.date, 'MM');
  getList();
};

const getFirstDay = () => {
  return new Date(calendar.date.getFullYear(), calendar.date.getMonth(), 1).getDay();
};
const getList = () => {
  MainService.calendar({year: calendar.year, month: calendar.month}).then(
    (res) => {
      const data = res.data;
      const daysArray = [];
      const firstDayOfMonth = getFirstDay();
      const totalDaysInMonth = new Date(calendar.date.getFullYear(), calendar.date.getMonth() + 1, 0).getDate();
      for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push({day: 0, reservations: []});
      }
      for (let i = 1; i <= totalDaysInMonth; i++) {
        const dayData = data.find((item: any) => item.day === `${calendar.year}-${calendar.month}-${i.toString().padStart(2, '0')}`);
        daysArray.push({
          day: i,
          reservations: dayData ? dayData.reservations.map((r: any) => ({
            price: r.price,
            productNo: r.productNo,
            productName: r.productName,
            orderStateCode: r.orderStateCode,
          })) : [],
        });
      }
      calendar.days = daysArray;
    },
    (err) => {
      console.error(err);
    }
  );
};
onMounted(() => {
  getList();
});
</script>

<style scoped>
#calendar {
  width: 100%;
}

#calendar .calendar-controls {
  width: 100%;
  text-align: center
}

#calendar h2 {
  font-size: 20px;
  line-height: 40px;
  color: #333;
  padding: 23px 0 23px 0;
}

#calendar h2 .calendar-nav {
  display: inline-block;
  padding: 0 15px;
}

#calendar h2 .icon {
  font-size: 30px;
  color: #333;
  vertical-align: middle;
  cursor: pointer;
  padding: 5px;
  width: 40px;
}

#calendar .calendar-grid {
  display: grid;
  grid-template-columns:repeat(7, 1fr);
  gap: 0;
}

#calendar .calendar-day {
  border: 1px solid #f2f2f2;
  padding: 8px 10px;
  box-sizing: border-box
}

#calendar .day-number {
  text-align: right;
  color: #000;
  padding-bottom: 10px;
}

#calendar .calendar-day:nth-child(7n) .day-number {
  color: #6172c9;
}

#calendar .calendar-day:nth-child(7n) .day-number {
  color: #6172c9;
}

#calendar span {
  display: inline-block;
  padding-right: 3px;
}

#calendar .product {
  font-size: 11px;
  text-align: right;
}

#calendar .product p {
  display: inline-block;
  width: 100px;
  padding-left: 8px;
  letter-spacing: -0.5px;
  text-align: left;
  margin-bottom: 5px;
  border-radius: 3px;
  color: #000;
}

#calendar .product p.paid {
  background: #f2f2f2;
  color: #999;
}

#calendar .product p.pending {
  background: #ffe9e9;
  color: #000;
}

#calendar .product p.available {
  background: #f1ffe2;
}
</style>
