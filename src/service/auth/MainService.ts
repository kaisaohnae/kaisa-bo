import { apiConfig } from '@src/utils/apiConfig';

class MainService {
	async getDashboard(json?:any) {
		const res = await apiConfig('/main/getDashboard', json ? json : {});
		return res.data;
	}
	async getCalendar(json?:any) {
		const res = await apiConfig('/main/getCalendar', json ? json : {});
		return res.data;
	}
}
export default new MainService();

