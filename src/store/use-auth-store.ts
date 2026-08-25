import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import useSettingStore from './use-setting-store';

interface AuthState {
  userInfo: any;
  token: string;
  loginSuccess: (data: any, routerPush: (path: string) => void) => Promise<void>;
  loginFail: () => void;
  removeSession: () => void;
  logout: (routerPush: (path: string) => void) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userInfo: {} as any,
      token: '',
      loginSuccess: async (data, routerPush) => {
        const setting = useSettingStore.getState();
        if (data && data.token && data.userInfo) {
          set({
            userInfo: data.userInfo,
            token: data.token
          });
          setting.setCodeList(data.codeList);
          setting.setMenuList(data.menuList);
          // get().setMenus(data.menuList);
          setting.setHash('/'); // 가정: setting-store.ts에 setHash 함수 정의됨
          routerPush('/');
        }
      },
      loginFail: () => {
        get().removeSession();
      },
      removeSession: () => {
        set({
          userInfo: {} as any,
          token: ''
        });
      },
      logout: routerPush => {
        get().removeSession();
        routerPush('/login');
      },
    }),
    {
      name: 'auth-storage', // localStorage 키
      partialize: state => ({
        userInfo: state.userInfo,
        token: state.token
      })
    }
  )
);

export default useAuthStore;
