<template>
  <Header/>
  <div id="contents" v-bind:class="{menuOn : setting.menu.active}">
    <router-view/>
  </div>
  <Footer/>
</template>
<script setup lang="ts">
import Header from '@src/views/layout/Header.vue';
import Footer from '@src/views/layout/Footer.vue';
import {useSettingStore} from '@src/store/settingStore';

const setting = useSettingStore();
</script>

<style scoped>
#contents {
  background: #fff;
  border: 10px solid #fff;
  height: calc(100% - 109px);
  z-index: 1;
  overflow: auto;
}
</style>
