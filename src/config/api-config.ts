import interceptor from '@/config/api-interceptor';
import {useAuthStore} from "@/store/use-auth-store";

export const apiConfig = (apiUrl: string, apiData?: any) => {
  const {token} = useAuthStore.getState();
  return interceptor({
    url: apiUrl,
    data: JSON.stringify(apiData),
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
    withCredentials: false,
  });
};
