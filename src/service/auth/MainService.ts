import { apiConfig } from '@src/utils/apiConfig';

class MainService {
	async dashboard(json?:any) {
		const res = await apiConfig('/common/dashboard', json ? json : {});
		return res.data;
	}
	async calendar(json?:any) {
		const res = await apiConfig('/common/calendar', json ? json : {});
		return res.data;
	}
}
export default new MainService();

