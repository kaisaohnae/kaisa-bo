import React from 'react';
import Script from 'next/script';

const Map = () => {
  const handleScriptLoad = () => {
    // @ts-ignore
    const kakao = window.kakao || {} as any; // sns 는 대문자 Kakao 고 이건 소문자 ㅡㅡ;;
    /**
     * developers.kakao.com 아래 호스트를 추가하고 앱키를 등록해야만 로드할수 있다.
     * http://kaisa.co.kr, http://localhost:8887
     */
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.85793516428404, 127.51808523634688),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      var marker = new kakao.maps.Marker({
        map: map,
        title: '경기 가평군 가평읍 마장리 83',
        position: new kakao.maps.LatLng(37.85793516428404, 127.51808523634688)
      });
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    });
  };
  return (
    <>
      <div id="map" className="wrapper-common" />
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3322a4d2abce512425b96866d9844fd1&autoload=false"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
    </>
  );
};

export default Map;
