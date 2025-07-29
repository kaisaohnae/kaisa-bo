import type {Metadata} from 'next';
import 'handsontable/dist/handsontable.full.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/layout.css';
import '@/assets/css/slide.css';
import '@/assets/css/calendar.css';
import '@/assets/css/lib/swiper-bundle.min.css';
import '@/assets/css/lib/tui-grid-editor.css';

import MetaTags from '@/components/layout/meta-tags';
import Alert from '@/components/alert';
import Loading from '@/components/loading';
import LayoutSub from '@/app/layout-sub';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'kaisa',
  description: 'admin'
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="ko">
      <MetaTags />
      <body>
        <LayoutSub>{children}</LayoutSub>
        <Footer />
        <Alert />
        <Loading />
      </body>
    </html>
  );
}
