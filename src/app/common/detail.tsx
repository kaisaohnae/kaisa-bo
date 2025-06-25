import React, { useEffect, useState } from 'react';

interface Props {
  component: React.ElementType;
  data: Record<string, any>;
  show: boolean;
  onClose: () => void;
}

export default function DetailView({ component: Component, data, show, onClose }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => setOpen(true), 100);
    } else {
      setOpen(false);
    }
  }, [show]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div className={`detail-container ${show ? 'on' : ''}`}>
      <div className={`detail-wrapper ${open ? 'on' : ''}`}>
        <div className="detail-close icon" onClick={close}>
          &#xe097;
        </div>
        <Component data={data} />
      </div>
      <div className="detail-dimmed" onClick={close}></div>
    </div>
  );
}
