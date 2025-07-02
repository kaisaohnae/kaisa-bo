'use client';

import {useEffect, useRef} from 'react';
import {useRouter} from '@/hooks/use-custom-router';
import useAuthStore from '@/store/use-auth-store';

type Props = {
  onReady: any;
};

export default function OrgValidator({onReady}: Props) {
  const auth = useAuthStore();
  const router = useRouter();
  const mounted = useRef<boolean>(false);

  const onReadyCheck = async () => {
    try {
      onReady();
    } catch (error) {
      console.error('Error fetching data:', error);
      // 실패 시 처리 로직
      router.push({
        pathname: '/error',
        query: {cd: 'fetch-error'}
      });
    } finally {
      mounted.current = true;
    }
  };

  useEffect(() => {
    if (mounted.current && !auth.token) {
      router.push({pathname: '/login', query: {}});
    }
  }, [router]);

  useEffect(() => {
    const refresh = async () => {
      await onReadyCheck();
    };
    refresh().then();
  }, []);

  return null;
}
