'use client';

import { create } from 'zustand';

type AlertProps = {
  type?: string;
  title?: string;
  message: any;
  buttons?:  any; // ButtonProps | ButtonProps[];
};

type State = {
  alert: AlertProps | null;
  error: boolean;
};

type Actions = {
  showAlert: (o: AlertProps) => void;
  hideAlert: () => void;
  showError: () => void;
  hideError: () => void;
};

/*type ButtonProps = {
  type: string;
  rate: number;
  text: string;
  callback: () => void;
}*/

const useAlertStore = create<State & Actions>((set) => ({
  alert: null,
  error: false,
  showAlert: (o: AlertProps) => {
    set(() => ({ alert: o }));
  },
  hideAlert: () => {
    set(() => ({ alert: null }));
  },
  showError: () => {
    set(() => ({ error: true }));
  },
  hideError: () => {
    set(() => ({ error: false }));
  },
}));

export default useAlertStore;
