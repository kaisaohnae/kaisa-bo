'use client';

import SiteValidator from '@/components/site-validator';
import React, {useState, useEffect, Suspense} from 'react';
import Header from '@/components/layout/header';
import useSettingStore from '@/store/use-setting-store';
import {usePathname} from 'next/navigation';

export default function LayoutSub({children}: {children: React.ReactNode}) {
  const [isReady, setReady] = useState(false);
  const onReady = () => setReady(true);

  const menuActive = useSettingStore((state) => state.menuActive);

  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!pathname?.includes('login'));
  }, [pathname]);

  const containerClass = [
    menuActive ? 'menu-on' : '',
    pathname?.includes('login') ? 'login' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Suspense>
      <div id="container" className={containerClass}>
        {show && <Header />}
        <div id="contents">{isReady && children}</div>
      </div>
      <SiteValidator onReady={onReady} />
    </Suspense>
  );
}
