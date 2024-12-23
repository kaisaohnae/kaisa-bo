<template>
  <div class="detail-container" :class="{'on': data.show}">
    <div class="detail-wrapper" :class="{'on': data.open}">
      <div class="detail-close icon" @click="close">&#xe097;</div>
      <component :is="component" :data="props.data" />
    </div>
    <div class="detail-dimmed" :class="{'on': data.open}" @click="close"></div>
  </div>
</template>
<script setup>
import {onMounted, reactive, defineProps, defineEmits } from 'vue';

const props = defineProps({
  component: Object,
  data: Object,
  show: false,
});
const data = reactive({
  show: props.show,
  open: false,
});
const emit = defineEmits(['close']);
const close = () => {
  data.open = false;
  setTimeout(() => {
    emit('close');
  }, 200);
};
onMounted(() => {
  setTimeout(() => {
    data.open = true;
  }, 100);
});
</script>
<style scoped>
.detail-container {display: none; position: fixed; left:0; top:0; width: 100%; height: 100%; z-index: 1000;}
.detail-dimmed {transition:0.2s all linear; width: 100%; height: 100%; background: rgba(0,0,0,0.0); z-index: 1000;}
.detail-wrapper {transition:0.2s all linear; width:60%; right:-65%;  position: absolute; top:10px; height:calc(100% - 20px); border-radius: 10px; background: #fff; z-index: 1000; padding:10px; border-right:1px solid #666; box-shadow:0 0 15px rgba(0,0,0,0.2);}
.detail-container.on {display: block;}
.detail-container .detail-close {position:absolute; right:15px; top:15px; color:#666; font-size: 30px; cursor:pointer;}
.detail-container .detail-close:hover {color:#000;}
.detail-dimmed.on {background: rgba(0,0,0,0.3);}
.detail-wrapper.on {right:10px; top:10px; }
</style>
