<template>
  <select v-model="data.value" @change="change">
    <option disabled value="">{{ props.default }}</option>
    <option v-for="(o, idx) in codeList" :key="idx" :value="o.codeValue">
      {{ o.codeName }}
    </option>
  </select>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive, computed} from 'vue';
import {useAuthStore} from '@/store/auth-store';

const auth = useAuthStore();
const emit = defineEmits(['set-data']);

const props = defineProps({
  cd: {type: String, required: true},
  model: {type: [String, Number], required: true},
  default: {type: String, default: '선택하세요.'},
});

const data = reactive({
  value: props.model,
});

const codeList = computed(() => {
  /*if (props.cd.startsWith('is')) {
    return [{codeName: '예', codeValue: 1}, {codeName: '아니오', codeValue: 0}];
  }*/
  return auth.codeList[props.cd] || [];
});

const change = () => {
  emit('set-data', data.value);
};

onMounted(() => {
});
</script>

<style scoped>
</style>
