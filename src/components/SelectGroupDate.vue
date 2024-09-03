<template>
    <span class="termWrap" v-show="props.isTerm">
      <label v-show="isAll"><input type="checkbox" v-model="data.allChecked" @click="allChecked" /> 전체</label>
      <button type="button" class="button small gray" v-bind:class="{on: data.term === 1}" @click="setTerm(1)">1주일</button>
      <button type="button" class="button small gray" v-bind:class="{on: data.term === 2}" @click="setTerm(2)">3개월</button>
      <button type="button" class="button small gray" v-bind:class="{on: data.term === 3}" @click="setTerm(3)">6개월</button>
    </span>
  <span class="pickerWrap" v-show="!data.allChecked">
      <VueDatePicker
        v-model="props.date[0]"
        :locale="ko"
        :format="props.format"
        :style="{width: props.format === 'yyyy-MM-dd' ? '100px' : '150px'}"
        class="input"
        :name="props.name[0]"
        :disabled="data.allChecked"
      />
      <span class="icon pointer">&#xf0ce;</span>
    </span>
  <span class="pickerWrap" v-show="!data.allChecked">
      <VueDatePicker
        v-model="props.date[1]"
        :locale="ko"
        :format="props.format"
        :style="{width: props.format === 'yyyy-MM-dd' ? '100px' : '150px'}"
        class="input"
        :name="props.name[1]"
        :disabled="data.allChecked"
      />
      <span class="icon pointer">&#xf0ce;</span>
    </span>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ko } from 'date-fns/locale';
import '@vuepic/vue-datepicker/dist/main.css';
import dateUtil from '../utils/dateUtil';

const emit = defineEmits(['set-start-date', 'set-end-date'])

const props = defineProps({
  name: { type: Array, required: true },
  date: { type: Array, required: true },
  format: { type: String, required: false, default: 'YYYY-MM-DD' },
  isAll: { type: Boolean, required: false, default: true },
  isTerm: { type: Boolean, required: false, default: true },
  term: { type: Number, required: false, default: 0 },
});

const data = reactive({
  term: props.term,
  allChecked: props.isAll,
});

const setTerm = (n: number) => {
  data.term = n;
  let date: Date = new Date();
  switch (n) {
    case 1: // 1주일
      date.setDate(new Date().getDate() - 7);
      break;
    case 2: // 3개월
      date.setMonth(new Date().getMonth() - 3);
      break;
    case 3: // 6개월
      date.setMonth(new Date().getMonth() - 6);
      break;
    default:
      break;
  }
  data.allChecked = false;
  props.date[0] = dateUtil.format(date, props.format);
  emit('set-start-date', { date: props.date[0] });
  props.date[1] = dateUtil.format(new Date(), props.format);
  emit('set-end-date', { date: props.date[1] });
}

const allChecked = () => {
  data.term = 0;
  data.allChecked = !data.allChecked;
  if(data.allChecked) {
    props.date[0] = '';
    emit('set-start-date', { date: '' });
    props.date[1] = '';
    emit('set-end-date', { date: '' });
  } else {
    setTerm(1);
  }
}

watch(() => props.date[0], (newDate) => {
  emit('set-start-date', { date: newDate });
});

watch(() => props.date[1], (newDate) => {
  emit('set-end-date', { date: newDate });
});

if(!props.date[0]) {
  props.date[0] = dateUtil.format(new Date(), props.format);
}
if(!props.date[1]) {
  props.date[1] = dateUtil.format(new Date(), props.format);
}
</script>

<style scoped>
.termWrap {display:inline-block; padding-right:5px;}
.pickerWrap {position:relative; display:inline-block;}
.pickerWrap .icon {font-size:30px; line-height:30px; vertical-align:middle; width:30px; margin:4px 10px 0 -0; color:#aaa;}
.pickerWrap input.input {vertical-align:middle;}
</style>
