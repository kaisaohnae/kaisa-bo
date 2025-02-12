<template>
  <div class="all-wrap">
    <label v-show="isAll">
      <input type="checkbox" v-model="data.allChecked" @change="allChecked"/> 전체
    </label>
  </div>
  <div class="picker-wrap" v-show="!data.allChecked" style="padding-right: 5px;">
    <VueDatePicker
      v-model="startDate"
      :locale="'ko'"
      :format="props.format"
      :style="{width: props.format === 'yyyy-MM-dd' ? '160px' : '200px'}"
      class="input"
      :placeholder="placeholderText"
      :disabled="data.allChecked"
      :enable-time-picker="false"
      :clearable="false"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dateUtil from '@/utils/date-util';

const emit = defineEmits(['set-start-date']);

const props = defineProps({
  date: {type: Array, required: false, default: () => [dateUtil.format(new Date(), 'yyyy-MM-dd')]},
  format: {type: String, required: false, default: 'yyyy-MM-dd'},
  isAll: {type: Boolean, required: false, default: true},
  timer: {type: Boolean, required: false, default: false},
});

const data = reactive({
  allChecked: props.isAll,
});

const startDate = ref(props.date[0]) as any;

const isAllChecked = ref(true);

const allChecked = () => {
  let selectDate: Date = new Date()
  isAllChecked.value = !isAllChecked.value;
  data.allChecked = isAllChecked.value ;
  if (isAllChecked.value ) {
    startDate.value = null;
    emit('set-start-date', {date: startDate.value});
  } else {
    startDate.value = dateUtil.format(selectDate, props.format === 'yyyy-MM-dd' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm');
    emit('set-start-date', {date: startDate.value});
  }
};

const placeholderText = props.format === 'yyyy-MM-dd' ? '날짜 선택' : '날짜 및 시간 선택';

watch(() => startDate, (newDate) => {
  emit('set-start-date', {date: newDate});
});
</script>

<style scoped>
.all-wrap {
  display: inline-block;
  padding-right: 5px;
  margin-left: -5px;
  width: 80px;
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
