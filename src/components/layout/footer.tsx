'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';

export default function Footer() {

  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!(pathname?.match('login')))
  }, [pathname]);

  return show && (
    <div id="footer">
      copyright (c) kaisa. all right reserved
    </div>
  );
}
