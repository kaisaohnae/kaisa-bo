import {apiConfig} from '@src/utils/apiConfig';

/**
 * 파일
 */
class FileService {
  async getFileList(json?: any) { // 파일 리스트
    const res = await apiConfig('/cr/getFileList', json || {});
    return res.data;
  }

  async setFileList(json?: any) { // 파일 리스트등록
    const res = await apiConfig('/cr/setFileList', json || {});
    return res.data;
  }
}

export default new FileService();