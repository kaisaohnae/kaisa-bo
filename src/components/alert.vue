<template>
  <div id="alertWrap" v-if="info">
    <div id="alert">
      <h3>{{ info.title }}</h3>
      <div>
        <p>{{ info.message }}</p>
      </div>
      <div class="btnWrap">
        <button type="button" @click="closeAlert">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAlertStore} from '@/store/alert-store';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth-store';

const router = useRouter();
const auth = useAuthStore();

const props = defineProps<{
  info: Info;
}>();

const alert = useAlertStore();

interface Info {
  title: string;
  message: string;
  redirect?: string;
}

const closeAlert = () => {
  alert.close();
  if (props.info?.redirect === '/login') {
    auth.logout(router);
  }
}
</script>
<style>
#alertWrap {
  width: 100%;
  z-index: 9000;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
}

#alert {
  position: fixed;
  z-index: 9001;
  padding: 20px 30px;
  width: 70%;
  left: 15%;
  top: 30%;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background: #fff;
  color: #000;
  text-align: center;
  overflow: hidden;
}

#alert p {
  padding: 20px;
}

#alert.green {
  background-color: #9ef0c0;
}
</style>
