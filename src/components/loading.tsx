'use client';

import React, { useCallback } from 'react';
import useLoadingStore from '@/store/use-loading-store';

export default function Loading() {
  const loading = useLoadingStore(useCallback((state) => state.loading, []));

  // console.log('loading', loading)
  if (!loading) {
    return null;
  }
  return (
    <div id="loading">
      <div className="loadingCircle"></div>
    </div>
  );
}
