import React, { useEffect, useState } from 'react';

interface DetailDrawerProps {
  component: React.ElementType;
  detailData: any;
  detailShow: boolean;
  setDetailShow: any;
}

const Detail: React.FC<DetailDrawerProps> = ({ component: Component, detailData, detailShow, setDetailShow }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (detailShow) {
      // 시작 애니메이션 트리거
      const timer = setTimeout(() => {
        setOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setOpen(false);
    }
  }, [detailShow]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setDetailShow(false);
    }, 200); // CSS 애니메이션 시간과 맞춤
  };

  if (!detailShow) return null;

  return (
    <div className={`detail-container ${detailShow ? 'on' : ''}`}>
      <div className={`detail-wrapper ${open ? 'on' : ''}`}>
        <div className="detail-close icon" onClick={handleClose}>
          &#xe097;
        </div>
        <Component data={detailData} />
      </div>
      <div className={`detail-dimmed ${open ? 'on' : ''}`} onClick={handleClose}></div>
    </div>
  );
};

export default Detail;
