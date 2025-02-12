import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {useSettingStore} from '@/store/setting-store';
import {Router} from 'vue-router';

export interface AuthType {
  active: boolean;
  userInfo: any; // RemovableRef<UserType>;
  menuList: any;
  codeList: any;
  token: any;
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
  pathName: string;
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
    token: useStorage('token', '' as string),
  }),
  actions: {
    async loginSuccess(data: any, router: Router) {
      if (data && data.token && data.userInfo) {
        this.userInfo = data.userInfo;
        this.codeList = data.codeList;
        this.token = data.token;
        this.setMenus(data.menuList);
      }
      const setting = useSettingStore();
      setting.hash = '/main';
      router.push('/main');
    },
    loginFail() {
      this.removeSession();
    },
    removeSession() {
      this.userInfo = {} as UserType;
      this.menuList = [];
      this.codeList = {};
      this.token = '';
    },
    logout(router: Router) {
      this.removeSession();
      router.push('/login');
    },
    setMenus(menus: any[]) {
      const baseMenus: MenuType[] = [
        {menuGroupCode: 'od', active: true, pathName: '주문관리', menu: []},
        {menuGroupCode: 'cr', active: true, pathName: '기초관리', menu: []},
        {menuGroupCode: 'cs', active: true, pathName: '고객관리', menu: []},
        {menuGroupCode: 'pd', active: true, pathName: '상품관리', menu: []},
        {menuGroupCode: 'at', active: true, pathName: '회원관리', menu: []},
      ];

      // useSettingStore를 통해 favList 가져오기
      const setting = useSettingStore();

      baseMenus.forEach(baseMenu => {
        baseMenu.menu = menus
          .filter(menu => menu.menuGroupCode === baseMenu.menuGroupCode)
          .map(menu => {
            const isFav = setting.favList.some((fav: any) => fav.menuId === menu.menuId);
            return {
              ...menu,
              fav: isFav,
            };
          });
      });
      this.menuList = baseMenus;
    }
  }
});
