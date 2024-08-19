import { defineStore } from 'pinia';
import { useStorage, RemovableRef } from '@vueuse/core';
import { Router } from 'vue-router';


export interface AuthType {
  active: boolean;
  userInfo: UserType;
  menuList: RemovableRef<any[]>;
  codeList: any;
}

export interface UserType {
  userId: string;
  userName: string;
  companyId: string;
  userStateCode: string;
  passwordUpdateDt: string;
  phoneNo: string;
  memo: string;
  loginDt: string;
}

export interface MenuType {
  menuGroupCode: string;
  active: boolean;
  pathNm: string;
  menu: any[];
}

export const useAuthStore = defineStore<'auth', AuthType, {}, {
  loginSuccess(data: any, router: Router): Promise<void>;
  loginFail(): void;
  removeSession(): void;
  logout(router: Router): void;
  setMenus(menus: MenuType[]): void;
}>('auth', {
  state: (): AuthType => ({
    active: false,
    userInfo: useStorage('userInfo', {} as UserType),
    codeList: useStorage('codeList', {} as any),
    menuList: useStorage('menuList', [] as any[]),
  }),
  actions: {
    async loginSuccess(data: any, router: Router) {
      if (data && data.token && data.userInfo) {
        this.userInfo = data.userInfo;
        this.codeList = data.codeList;
        this.setMenus(data.menuList);
      }
      router.push('/main');
    },
    loginFail() {
      this.removeSession();
    },
    removeSession() {
      this.userInfo = {} as UserType;
      this.menuList = [];
      this.codeList = {};
    },
    logout(router: Router) {
      this.removeSession();
      router.push('/login');
    },
    setMenus(menus: any[]) {
      const baseMenus: MenuType[] = [
        { menuGroupCode: 'or', active: true, pathNm: '주문관리', menu: [] },
        { menuGroupCode: 'cr', active: true, pathNm: '기초관리', menu: [] },
        { menuGroupCode: 'cs', active: true, pathNm: '고객관리', menu: [] },
        { menuGroupCode: 'pd', active: true, pathNm: '상품관리', menu: [] },
        { menuGroupCode: 'at', active: true, pathNm: '회원관리', menu: [] },
      ];
      baseMenus.forEach(baseMenu => {
        baseMenu.menu = menus.filter(menu => menu.menuGroupCode === baseMenu.menuGroupCode);
      });
      this.menuList = baseMenus;
    }
  }
});
