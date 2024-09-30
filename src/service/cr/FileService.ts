import {apiConfig} from '@src/utils/apiConfig';

class FileService {
  async getFileList(json?: any) { // 파일 리스트 [BS_FILE]
    const res = await apiConfig('/bo/cr/getFileList', json || {});
    return res.data;
  }

  async getFile(json?: any) { // 파일 상세조회 [BS_FILE]
    const res = await apiConfig('/bo/cr/getFile', json || {});
    return res.data;
  }

  async setFileList(json?: any) { // 파일 리스트등록 [BS_FILE]
    const res = await apiConfig('/bo/cr/setFileList', json || {});
    return res.data;
  }

  async insertFile(formData: FormData) { // 파일 등록 [BS_FILE]
    const res = await apiConfig('/bo/cr/insertFile', formData);
    return res.data;
  }

  async updateFile(formData: FormData) { // 파일 수정 [BS_FILE]
    const res = await apiConfig('/bo/cr/updateFile', formData);
    return res.data;
  }

  async deleteFile(formData: FormData) { // 파일 삭제 [BS_FILE]
    const res = await apiConfig('/bo/cr/getFileList', formData);
    return res.data;
  }
}

export default new FileService();

