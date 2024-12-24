import {apiConfig} from '@src/utils/apiConfig';

/**
 * 파일
 */
class FileService {
  async getFile(json?: any) { // 파일 조회
    const res = await apiConfig('/cr/getFile', json || {});
    return res.data;
  }
  async getFileList(json?: any) { // 파일 리스트
    const res = await apiConfig('/cr/getFileList', json || {});
    return res.data;
  }
  async setFile(json?: any) { // 파일 등록
    const res = await apiConfig('/cr/setFile', json || {});
    return res.data;
  }
  async setFileList(json?: any) { // 파일 리스트등록
    const res = await apiConfig('/cr/setFileList', json || {});
    return res.data;
  }
}

export default new FileService();