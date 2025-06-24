import type {Metadata} from 'next';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/layout.css';
import '@/assets/css/slide.css'
import '@/assets/css/calendar.css'
import '@/assets/css/lib/swiper-bundle.min.css'
import MetaTags from '@/components/layout/meta-tags';
import Alert from '@/components/alert';
import Loading from '@/components/loading';
import LayoutSub from '@/app/layout-sub';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import useSettingStore from '@/store/use-setting-store';

export const metadata: Metadata = {
  title: 'kaisa',
  description: 'admin'
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  const {menu} = useSettingStore.getState();
  return (
    <html lang="ko">
    <MetaTags/>
    <body>
    <div id="container" className={menu.active ? 'menuOn' : ''}>
      <Header/>
      <div id="contents" className={menu.active ? 'menuOn' : ''}>
        <LayoutSub>{children}</LayoutSub>
      </div>
      <Footer/>
    </div>
    <Alert/>
    <Loading/>
    </body>
    </html>
  );
}
