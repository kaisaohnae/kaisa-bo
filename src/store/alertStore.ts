import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state : () => ({
    active: false,
    info: {},
  }),
	actions: {
		open(info: any) {
      this.active = true;
      this.info = info;
		},
    close() {
			this.active = false;
      this.info = {};
		},
	}
});

