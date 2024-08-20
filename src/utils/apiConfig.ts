import interceptor from './apiInterceptor';
import {useAuthStore} from '@src/store/authStore';

const auth = useAuthStore();
const jsonHeaders = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.token
  },
  withCredentials: false,
}
export const apiConfig = (apiUrl: string, apiData?: any) => {
  return interceptor({
    url: apiUrl,
    data: JSON.stringify(apiData),
    ...jsonHeaders
  });
};
