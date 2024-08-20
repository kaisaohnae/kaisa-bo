import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import {useLoadingStore} from '@src/store/loadingStore';
import {useAlertStore} from '@src/store/alertStore';

let baseURL = import.meta.env.VITE_API_HOST;
if (import.meta.env.DEV) {
  // console.log('개발모드');
}

const alert = useAlertStore();
const loading = useLoadingStore();

const service: AxiosInstance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
});
service.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    loading.start();
    return request;
  },
  (error: AxiosError) => {
    loading.end();
    console.log(error);
    return Promise.reject();
  }
);
service.interceptors.response.use(
  (response: AxiosResponse) => {
    loading.end();
    if (response.status === 200) {
      return response;
    } else {
      Promise.reject();
    }
  },
  (error: AxiosError) => {
    loading.end();
    const data: any = error.response?.data;
    if (error.response?.status === 401 || error.response?.status === 403) {
      alert.open({title: null, message: data.message, redirect: '/login'});
      return Promise.reject();
    }
    if (data && data.message) {
      alert.open({title: null, message: data.message});
    }
    return Promise.reject();
  }
);
export default service;
