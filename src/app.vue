<template>
  <Loading/>
  <Alert v-if="alert.active" :info="alert.info"/>
  <div id="container" v-bind:class="{menuOn : setting.menu.active}">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/loading.vue';
import Alert from '@/components/alert.vue';
import {useAlertStore} from '@/store/alert-store';
import {useSettingStore} from '@/store/setting-store';
import { onMounted } from 'vue';

const alert = useAlertStore();
const setting = useSettingStore();

if (location.hash === '#/main') {
  setting.hash = '/main';
}
onMounted(() => {
  const metaTag = document.createElement('meta');
  metaTag.name = "google";
  metaTag.content = "notranslate";
  document.head.appendChild(metaTag);
});
</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #ddd;
  padding: 10px;
}

#container.menuOn {
  padding: 10px 10px 10px 230px;
}
</style>
