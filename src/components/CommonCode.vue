<template>
  <select v-model="data.value" @change="change">
    <option disabled value="">{{props.default}}</option>
    <option v-for="(o, idx) in auth.codeList[props.cd]"
            :key="idx"
            :value="o.codeValue">
      {{ o.codeName }}
    </option>
  </select>
</template>
<script setup lang="ts">
/* eslint-disable no-debugger */
import {onMounted, ref, reactive} from 'vue';
import {useAuthStore} from '@src/store/authStore';

const auth = useAuthStore();
const emit = defineEmits(['set-data'])

const props = defineProps({
  cd: {type: String, required: true},
  model: {type: String, required: true},
  default: {type: String, default: '선택하세요.'},
});

const data = reactive({
  value: props.model,
});

const change = () => {
  emit('set-data', data.value);
}

onMounted(() => {
});

</script>
<style scoped>
</style>
