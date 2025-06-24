import React, {useState} from 'react';
import Script from "next/script";

const Sns = () => {
  const handleScriptLoad = () => {
    // @ts-ignore
    const Kakao = window.Kakao || {} ;
    if(Kakao.init) {
      Kakao.init('3322a4d2abce512425b96866d9844fd1');
    }
  };
  const sns = (where: string) => {
    const url = 'kaisa.co.kr';
    const text = '카이사풀빌라';
    switch (where) {
      case 'kakao':
        // @ts-ignore
        Kakao.Link.sendCustom({
          templateId: 78366,
        });
        break;
      case 'story':
        // @ts-ignore
        Kakao.Story.share({ url, text });
        break;
      case 'naver':
        window.open(`http://blog.naver.com/openapi/share?url=${url}`);
        break;
      case 'band':
        window.open(`http://www.band.us/plugin/share?body=${encodeURIComponent(text)}&route=${encodeURIComponent(url)}`, 'shareBand', 'width=400, height=500, resizable=yes');
        break;
      case 'facebook':
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div id="kakaoContainer"></div>
      <div id="sns">
        <h5>친구에게 공유하기</h5>
        <ul className="sns">
          <li className="kakao" onClick={()=>{ sns('kakao') }}></li>
          {/*<li className="story" onClick={()=>{ sns('story') }}></li>*/}
          <li className="naver" onClick={()=>{ sns('naver') }}></li>
          <li className="band" onClick={()=>{ sns('band') }}></li>
          <li className="facebook" onClick={()=>{ sns('facebook') }}></li>
          <li className="twitter" onClick={()=>{ sns('twitter') }}></li>
        </ul>
      </div>
      <Script
        src="//developers.kakao.com/sdk/js/kakao.min.js"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
    </>
  );
};

export default Sns;
