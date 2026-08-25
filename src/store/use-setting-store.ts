import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import Cookies from 'js-cookie';

interface SettingState {
  id: string;
  menuActive: boolean;
  hash: string;
  tab: {idx: number};
  favList: any[];
  menuList: any[];
  codeList: any;

  setHash: (hash: string) => void;
  setStateToCookie: () => void;
  reset: () => void;
  setFavList: (favList: any[]) => void;
  setMenuList: (menuList: any[]) => void;
  setCodeList: (codeList: any) => void;
  setMenuActive: (active: boolean) => void;
}

const DefaultState: Omit<SettingState, 'setHash' | 'setStateToCookie' | 'reset' | 'setFavList' | 'setMenuList' | 'setCodeList' | 'setMenuActive'> = {
  id: '',
  menuActive: false,
  hash: '',
  tab: {
    idx: 0
  },
  favList: [],
  menuList: [],
  codeList: {}
};

const useSettingStore = create<SettingState>()(
  persist(
    (set, get) => ({
      ...DefaultState,
      setHash: (hash: string) => {
        set({hash});
      },
      setStateToCookie: () => {
        Cookies.set('settings', JSON.stringify(get()));
      },
      reset: () => {
        set(DefaultState);
        Cookies.remove('settings');
      },
      setFavList: (favList: any[]) => {
        set({favList});
      },
      setMenuList: (menuList: any[]) => {
        set({menuList});
      },
      setCodeList: (codeList: any[]) => {
        set({codeList});
      },
      setMenuActive: (menuActive: boolean) => {
        set({menuActive});
      }
    }),
    {
      name: 'settings-storage',
      partialize: state => ({
        id: state.id,
        menuActive: state.menuActive,
        hash: state.hash,
        tab: state.tab,
        favList: state.favList,
        menuList: state.menuList,
        codeList: state.codeList
      })
    }
  )
);

export default useSettingStore;
