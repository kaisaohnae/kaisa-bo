import {apiConfig} from '@/config/api-config';

/**
 * 파일
 */
class FileService {
  async getFile(json?: any) { // 파일 조회
    const res = await apiConfig('/cr/get-file', json || {});
    return res.data;
  }
  async getFileList(json?: any) { // 파일 리스트
    const res = await apiConfig('/cr/get-file-list', json || {});
    return res.data;
  }
  async setFile(json?: any) { // 파일 등록
    const res = await apiConfig('/cr/set-file', json || {});
    return res.data;
  }
  async setFileList(json?: any) { // 파일 리스트등록
    const res = await apiConfig('/cr/set-file-list', json || {});
    return res.data;
  }
}

export default new FileService();