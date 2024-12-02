<template>
  <div class="common-code-radio">
    <label>
      <input
        type="radio"
        :value="''"
        v-model="data.value"
        @change="change"
      />
      {{ props.default }}
    </label>
    <label v-for="(o, idx) in auth.codeList[props.cd]" :key="idx">
      <input
        type="radio"
        :value="o.codeValue"
        v-model="data.value"
        @change="change"
      />
      {{ o.codeName }}
    </label>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from 'vue';
import {useAuthStore} from '@src/store/authStore';

const auth = useAuthStore();
const emit = defineEmits(['set-data']);

const props = defineProps({
  cd: {type: String, required: true},
  model: {type: String, required: true},
  default: {type: String, default: '전체'},
});

const data = reactive({
  value: props.model,
});

const change = () => {
  emit('set-data', data.value);
};

onMounted(() => {});
</script>

<style scoped>
.common-code-radio {padding: 7px 0 4px 0;}
</style>
