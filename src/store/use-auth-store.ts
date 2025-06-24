// src/store/use-auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useSettingStore from './use-setting-store';

interface AuthState {
  active: boolean;
  userInfo: any;
  menuList: any[];
  codeList: Record<string, any>;
  token: string;

  loginSuccess: (data: any, routerPush: (path: string) => void) => Promise<void>;
  loginFail: () => void;
  removeSession: () => void;
  logout: (routerPush: (path: string) => void) => void;
  setMenus: (menus: any[]) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      active: false,
      userInfo: {} as any,
      menuList: [],
      codeList: {},
      token: '',
      loginSuccess: async (data, routerPush) => {
        if (data && data.token && data.userInfo) {
          set({
            userInfo: data.userInfo,
            codeList: data.codeList,
            token: data.token,
          });
          get().setMenus(data.menuList);
        }
        const setting = useSettingStore.getState();
        setting.setHash('/'); // 가정: setting-store.ts에 setHash 함수 정의됨
        routerPush('/');
      },
      loginFail: () => {
        get().removeSession();
      },
      removeSession: () => {
        set({
          userInfo: {} as any,
          menuList: [],
          codeList: {},
          token: '',
        });
      },
      logout: (routerPush) => {
        get().removeSession();
        routerPush('/login');
      },
      setMenus: (menus) => {
        const setting = useSettingStore.getState();
        const baseMenus: any[] = [
          { menuGroupCode: 'od', active: true, pathName: '주문관리', menu: [] },
          { menuGroupCode: 'cr', active: true, pathName: '기초관리', menu: [] },
          { menuGroupCode: 'cs', active: true, pathName: '고객관리', menu: [] },
          { menuGroupCode: 'pd', active: true, pathName: '상품관리', menu: [] },
          { menuGroupCode: 'at', active: true, pathName: '회원관리', menu: [] },
        ];
        baseMenus.forEach((baseMenu) => {
          baseMenu.menu = menus
            .filter((m: any) => m.menuGroupCode === baseMenu.menuGroupCode)
            .map((m: any) => ({
              ...m,
              fav: setting.favList.some((fav: any) => fav.menuId === m.menuId),
            }));
        });
        set({ menuList: baseMenus });
      },
    }),
    {
      name: 'auth-storage', // localStorage 키
      partialize: (state) => ({
        userInfo: state.userInfo,
        codeList: state.codeList,
        menuList: state.menuList,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
