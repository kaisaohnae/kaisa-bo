<template>
  <span class="all-wrap" v-show="props.isTerm">
    <label v-show="isAll"><input type="checkbox" v-model="data.allChecked" @click="allChecked"/> 전체</label>
  </span>
  <span class="term-wrap" v-show="props.isTerm">
    <button type="button" class="button small gray" :class="{on: data.term === 1}" @click="setTerm(1)">1주일</button>
    <button type="button" class="button small gray" :class="{on: data.term === 2}" @click="setTerm(2)">3개월</button>
    <button type="button" class="button small gray" :class="{on: data.term === 3}" @click="setTerm(3)">6개월</button>
  </span>
  <span class="picker-wrap" v-show="!data.allChecked" style="padding-right: 5px;">
    <VueDatePicker
      v-model="startDate"
      :locale="'ko'"
      :format="props.format"
      :style="{width: props.format === 'yyyy-MM-dd' ? '160px' : '200px'}"
      class="input"
      :disabled="data.allChecked"
      :enable-time-picker="false"
      :max-date="endDate"
      :clearable="false"
    />
  </span>
  <span class="picker-wrap" v-show="!data.allChecked">
    <VueDatePicker
      v-model="endDate"
      :locale="'ko'"
      :format="props.format"
      :style="{width: props.format === 'yyyy-MM-dd' ? '160px' : '200px'}"
      class="input"
      :disabled="data.allChecked"
      :enable-time-picker="false"
      :min-date="startDate"
      :clearable="false"
    />
  </span>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dateUtil from '@/utils/date-util';

const emit = defineEmits(['set-start-date', 'set-end-date']);

const props = defineProps({
  date: {type: Array, required: true},
  format: {type: String, required: false, default: 'YYYY-MM-DD'},
  isAll: {type: Boolean, required: false, default: true},
  isTerm: {type: Boolean, required: false, default: true},
  term: {type: Number, required: false, default: 0},
});

const data = reactive({
  term: props.term,
  allChecked: props.isAll,
});

// props.date 값을 ref로 복사하여 관리
const startDate = ref(props.date[0]) as any;
const endDate = ref(props.date[1]) as any;

const setTerm = (n: number) => {
  data.term = n;
  let selectDate: Date = new Date();
  switch (n) {
    case 1: // 1주일
      selectDate.setDate(new Date().getDate() - 7);
      break;
    case 2: // 3개월
      selectDate.setMonth(new Date().getMonth() - 3);
      break;
    case 3: // 6개월
      selectDate.setMonth(new Date().getMonth() - 6);
      break;
    default:
      break;
  }
  data.allChecked = false;
  startDate.value = dateUtil.format(selectDate, props.format === 'yyyy-MM-dd' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm');
  emit('set-start-date', {date: startDate.value});
  endDate.value = dateUtil.format(new Date(), props.format === 'yyyy-MM-dd' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm');
  emit('set-end-date', {date: endDate.value});
}

const allChecked = () => {
  data.term = 0;
  data.allChecked = !data.allChecked;
  if (data.allChecked) {
    startDate.value = null;
    emit('set-start-date', {date: startDate.value});
    endDate.value = null;
    emit('set-end-date', {date: endDate.value});
  } else {
    setTerm(1);
  }
}

// startDate와 endDate의 변화를 감지하여 상위 컴포넌트로 전달
watch(startDate, (newDate) => {
  emit('set-start-date', {date: newDate});
});

watch(endDate, (newDate) => {
  emit('set-end-date', {date: newDate});
});
</script>
<style scoped>
.all-wrap {
  display: inline-block;
  padding-right: 5px;
  margin-left: -5px;
  width: 80px;
}

.term-wrap {
  display: inline-block;
  padding-right: 5px;
}

.picker-wrap {
  position: relative;
  display: inline-block;
}

.picker-wrap .icon {
  font-size: 30px;
  line-height: 30px;
  vertical-align: middle;
  width: 30px;
  margin: 4px 10px 0 0;
  color: #aaa;
}

.picker-wrap input.input {
  vertical-align: middle;
}
</style>
