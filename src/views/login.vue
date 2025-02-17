<template>
  <div id="login">
    <form v-on:submit.prevent="submitForm()" method="POST" ref="login">
      <fieldset>
        <legend>로그인</legend>
        <h1>관리자 로그인</h1>
        <label class="label">
          <span class="icon">&#xe809;</span>
          <input type="text" v-model="param.userId" name="userId" placeholder="아이디를 입력해주세요" required/>
        </label>
        <label class="label">
          <span class="icon">&#xe81c;</span>
          <input type="password" v-model="param.pwd" name="pwd" placeholder="비밀번호를 입력해주세요" required/>
        </label>
        <label>
          <input type="checkbox" v-model="param.remember" name="remember"/> <span class="remember"> 아이디 저장</span>
        </label>
        <button type="submit">로그인</button>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import {useCookies} from "vue3-cookies";
import {useSettingStore} from '@/store/setting-store';
import UserService from '@/service/common/user-service';
import {useAuthStore} from '@/store/auth-store';
import {useAlertStore} from '@/store/alert-store';
import {useRouter} from 'vue-router';

const alert = useAlertStore();

const {cookies} = useCookies();
const setting = useSettingStore();
const auth = useAuthStore();
const router = useRouter();

interface LoginInfo {
  userId: string;
  pwd: string;
  remember?: boolean;
}

const settings = cookies.get('settings');
if (!settings) {
  setting.setState()
}
const param = reactive<LoginInfo>({
  userId: setting.userId,
  pwd: '',
});
const submitForm = () => {
  if (param.remember) {
    setting.userId = param.userId;
  } else {
    setting.userId = '';
  }
  UserService.login(param).then(
    (res) => {
      if (res) {
        setting.setState();
        auth.loginSuccess(res.data, router);
      } else {
        auth.loginFail();
        alert.open({title: null, message: '회원정보와 일치하지 않습니다.'});
      }
    },
    (err) => {
      console.log(err);
    },
  );
};
</script>

