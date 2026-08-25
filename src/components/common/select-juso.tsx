import React, {useState, useEffect} from 'react';
import JusoService from '@/service/common/juso-service';

interface AddressSearchProps {
  addr: string;
  required?: boolean;
  maxlength?: number;
  onSetAddr: (addr: string) => void;
}

const AddressSearchWithJuso: React.FC<AddressSearchProps> = ({addr, required, maxlength, onSetAddr}) => {
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);
  const [address, setAddress] = useState(addr);
  const [jusoList, setJusoList] = useState<any[]>([]);

  const searchJuso = async () => {
    setActive(true);
    try {
      const formData = new FormData();
      formData.append('addr', address);
      const res = await JusoService.getJuso(formData);

      if (res && res.success && res.data?.results?.juso) {
        setJusoList(res.data.results.juso);
        if (res.data.results.juso.length === 0) {
          alert('결과값이 없습니다.');
        }
      } else {
        if (res.data.results.common.errorMessage !== '정상') {
          alert(res.data.results.common.errorMessage);
        } else {
          alert('조회시 오류가 발생했습니다. 관리자에게 문의해주세요.');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const close = () => {
    setActive(false);
  };

  const clickJuso = async (o: any) => {
    if (o.roadAddr) {
      setAddress(o.roadAddr);
      const formData = new FormData();
      formData.append('roadAddr', o.roadAddr);
      formData.append('admCd', o.admCd);
      formData.append('rnMgtSn', o.rnMgtSn);
      formData.append('udrtYn', o.udrtYn);
      formData.append('buldMnnm', o.buldMnnm);
      formData.append('buldSlno', o.buldSlno);

      try {
        const res = await JusoService.getPosition(formData);
        setActive(false);
        if (res.data) {
          onSetAddr(res.data);
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setAddress(addr);
  }, [addr]);

  return (
    <span className="selectJusoWrap" style={{position: 'relative'}}>
      <input type="text" placeholder="주소를 입력하세요" style={{width: '250px'}} required={required} value={address} onChange={e => setAddress(e.target.value)} />
      <button type="button" onClick={searchJuso} className="button3">
        주소검색
      </button>
      {active && jusoList.length > 0 && (
        <div className="layerJuso" style={{position: 'absolute', left: '0', top: '28px', zIndex: 100, width: '500px'}}>
          <div className="close" onClick={close} style={{width: '40px', position: 'absolute', right: '0', top: '-20px', fontSize: '40px'}}>
            <span className="icon">&#xe042;</span>
          </div>
          <ul
            style={{
              width: '460px',
              background: '#fff',
              border: '0.5px solid #000',
              boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {jusoList.map((o, idx) => (
              <li
                key={idx}
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                  height: '35px',
                  padding: '0 10px',
                  lineHeight: '35px',
                  borderBottom: '0.5px solid #ddd'
                }}
                onClick={() => clickJuso(o)}
              >
                {o.roadAddr}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};

export default AddressSearchWithJuso;
