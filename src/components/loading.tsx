'use client';

import React, {useCallback} from 'react';
import {motion} from 'framer-motion';
import useLoadingStore from '@/store/use-loading-store';
import SvgLoading from '@/components/icons/common/svg-loading';

export default function Loading() {
  const loading = useLoadingStore(useCallback(state => state.loading, []));

  if (!loading) {
    return null;
  }

  return (
    <div id="loading">
      <motion.div
        className="loading"
        animate={{rotate: 360}}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear'
        }}
      >
        <SvgLoading />
      </motion.div>
    </div>
  );
}
