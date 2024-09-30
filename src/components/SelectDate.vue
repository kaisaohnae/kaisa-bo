<template>
  <div class="select-date">
    <div class="term-wrap">
      <label v-show="isAll">
        <input type="checkbox" v-model="data.clickChecked" @change="toggleDatePicker"/> 전체
      </label>
    </div>
    <div class="picker-wrap" v-show="!data.clickChecked">
      <VueDatePicker
        v-model="props.date[0]"
        :locale="ko"
        :format="props.format"
        :name="props.name[0]"
        class="input"
        :placeholder="placeholderText"
        :disabled="data.clickChecked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import {ko} from 'date-fns/locale';
import '@vuepic/vue-datepicker/dist/main.css';
import dateUtil from '@src/utils/dateUtil';

const emit = defineEmits(['set-start-date']);

const props = defineProps({
  name: {type: Array, required: true},
  date: {type: Array, required: false, default: () => [dateUtil.format(new Date(), 'yyyy-MM-dd')]},
  format: {type: String, required: false, default: 'yyyy-MM-dd'},
  isAll: {type: Boolean, required: false, default: true},
  timer: {type: Boolean, required: false, default: false},
});

const data = reactive({
  clickChecked: props.isAll,
});

const toggleDatePicker = () => {
  data.clickChecked = !data.clickChecked;
  if (data.clickChecked) {
    props.date[0] = '';
  } else {
    props.date[0] = dateUtil.format(new Date(), props.format);
  }
  emit('set-start-date', {date: props.date[0]});
};

const placeholderText = props.format === 'yyyy-MM-dd' ? '날짜 선택' : '날짜 및 시간 선택';

watch(() => props.date[0], (newDate) => {
  emit('set-start-date', {date: newDate});
});
</script>

<style scoped>
.select-date {
  display: flex;
  flex-direction: row;
}

.select-date .term-wrap {
  flex: 1;
}

.select-date .picker-wrap {
  flex: 9;
}
</style>
