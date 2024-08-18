import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    active: false,
    userInfo: useStorage('userInfo', {} as any),
    menuList: useStorage('menuList', [] as any[]),
    codeList: useStorage('codeList', {} as any),
  }),
  actions: {
    async loginSuccess(data: any) {
      try {
        if (data && data.token && data.userInfo) {
          this.userInfo = data.userInfo;
          this.menuList = data.menuList;
          this.codeList = data.codeList;
        }
        location.href = '/';
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    loginFail() {
      this.removeSession();
    },
    removeSession() {
      this.userInfo = {};
      this.menuList = [];
      this.codeList = {};
    },
    logout() {
      this.removeSession();
      location.href = '/';
    },
  },
});