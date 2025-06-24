// src/store/use-setting-store.ts
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface SettingState {
  id: string;
  menu: { active: boolean };
  hash: string;
  tab: { idx: number };
  favList: any[];

  setHash: (hash: string) => void;
  setStateToCookie: () => void;
  reset: () => void;
}

const DefaultState: Omit<SettingState, 'setHash' | 'setStateToCookie' | 'reset'> = {
  id: '',
  menu: {
    active: false,
  },
  hash: '',
  tab: {
    idx: 0,
  },
  favList: [],
};

export const useSettingStore = create<SettingState>()(
  persist(
    (set, get) => ({
      ...DefaultState,
      setHash: (hash: string) => {
        set({hash});
      },
      setStateToCookie: () => {
        // Cookies.set('settings', JSON.stringify(get()));
      },
      reset: () => {
        set(DefaultState);
        // Cookies.remove('settings');
      },
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({
        id: state.id,
        menu: state.menu,
        hash: state.hash,
        tab: state.tab,
        favList: state.favList,
      }),
    }
  )
);
