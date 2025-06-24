'use client';

import SiteValidator from '@/components/site-validator';
import {useState, Suspense} from 'react';

export default function LayoutSub({
                                    children
                                  }: Readonly<{
  children: React.ReactNode;
}>) {
  const [isReady, setReady] = useState(false);
  const onReady = () => {
    setReady(true);
  };
  return (
    <Suspense>
      <>{isReady && children}</>
      <SiteValidator onReady={onReady}/>
    </Suspense>
  );
}
