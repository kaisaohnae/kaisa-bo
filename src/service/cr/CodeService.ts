import { apiConfig } from '@src/utils/apiConfig';

class CodeService {
	async getCodeList(json?:any) { // 코드 리스트 [BS_CD]
		const res = await apiConfig('/cr/getCodeList', json || {});
		return res.data;
	}
	async getCode(json?:any) { // 코드 상세조회 [BS_CD]
		const res = await apiConfig('/cr/getCode', json || {});
		return res.data;
	}
	async setCodeList(json?:any) { // 코드 리스트등록 [BS_CD]
		const res = await apiConfig('/cr/setCodeList', json || {});
		return res.data;
	}
	async insertCode(json?:any) { // 코드 등록 [BS_CD]
		const res = await apiConfig('/cr/insertCode', json || {});
		return res.data;
	}
	async updateCode(json?:any) { // 코드 수정 [BS_CD]
		const res = await apiConfig('/cr/updateCode', json || {});
		return res.data;
	}
	async deleteCode(json?:any) { // 코드 삭제 [BS_CD]
		const res = await apiConfig('/cr/getCodeList', json || {});
		return res.data;
	}
}
export default new CodeService();

