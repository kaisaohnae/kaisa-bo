'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProductService from '@/service/pd/product-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';
import useAlertStore from '@/store/use-alert-store';

export default function ProductDetail({ detailData, detailShow, setDetailShow }) {
  const editor: any = useRef({});
  const {showAlert, hideAlert} = useAlertStore();
  const [formData, setFormData]: any = useState({
    productNo: '',
    companyId: '',
    seasonPriceNo: '',
    productName: '',
    headCount: '',
    maxHeadCount: '',
    m2: '',
    isDisplay: '',
    isPet: '',
    isBBQ: '',
    isPickup: '',
    isStone: '',
    memo: '',
    content: '',
    fileNo: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',

  });

  const drawDetail = () => {
    editor.current = gridUtil.createEditor({name: '#ProductEditor', cnts: formData.content });
  };

  const getDetail = async () => {
    if (detailData.productNo) {
      ProductService.getProduct({ productNo: detailData.productNo }).then(
        (res) => {
          setFormData(res.data);
        },
        (err) => {
          console.error(err);
        },
      );
    }
  };

  const save = async () => {
    if (detailData.productNo) {
      ProductService.setProduct({
        productNo: formData.productNo,
        companyId: formData.companyId,
        seasonPriceNo: formData.seasonPriceNo,
        productName: formData.productName,
        headCount: formData.headCount,
        maxHeadCount: formData.maxHeadCount,
        m2: formData.m2,
        isDisplay: formData.isDisplay,
        isPet: formData.isPet,
        isBBQ: formData.isBBQ,
        isPickup: formData.isPickup,
        isStone: formData.isStone,
        memo: formData.memo,
        content: editor.current?.getMarkdown?.() || '',
        fileNo: formData.fileNo,
      }).then(
        (res) => {
          console.log('save: ', res.data);
          showAlert({
            message: '저장되었습니다.',
            buttons: [{
              type: 'on',
              text: '확인',
              callback: () => {
                hideAlert();
                setDetailShow(false);
              }
            }]
          })
        },
        (err) => {
          console.error(err);
        },
      );
    }
  };

  const cancel = () => {
    setDetailShow(false);
  }

  useEffect(() => {
    (async () => {
      await getDetail();
    })();
  }, []);

  useEffect(() => {
    if (formData.productNo) {
      drawDetail();
    }
  }, [formData]);

  return (
    <div className="detail-content">
      <h2>상품 상세</h2>
      <div className="detail-scroll">
        <table className="detail-table">
          <caption>상품 상세</caption>
          <tbody>
          <tr>
            <th scope="col">상품번호</th>
            <td>
              {formData.productNo}
            </td>
          </tr>
            <tr>
              <th scope="col">업체아이디</th>
              <td>
                <input type="text" value={formData.companyId || ''} onChange={(e) => setFormData(prev => ({ ...prev, companyId: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">시즌가격번호</th>
              <td>
                <input type="number" value={formData.seasonPriceNo || ''} onChange={(e) => setFormData(prev => ({ ...prev, seasonPriceNo: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">상품명</th>
              <td>
                <input type="text" value={formData.productName || ''} onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">인원수</th>
              <td>
                <input type="number" value={formData.headCount || ''} onChange={(e) => setFormData(prev => ({ ...prev, headCount: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">최대인원수</th>
              <td>
                <input type="number" value={formData.maxHeadCount || ''} onChange={(e) => setFormData(prev => ({ ...prev, maxHeadCount: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">평형</th>
              <td>
                <input type="number" value={formData.m2 || ''} onChange={(e) => setFormData(prev => ({ ...prev, m2: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">전시여부</th>
              <td>
                <CommonCode cd="isDisplay" model={formData.isDisplay} onSetData={(val) => setFormData(prev => ({ ...prev, isDisplay: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">애완동물여부</th>
              <td>
                <CommonCode cd="isPet" model={formData.isPet} onSetData={(val) => setFormData(prev => ({ ...prev, isPet: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">바베큐여부</th>
              <td>
                <CommonCode cd="isBBQ" model={formData.isBBQ} onSetData={(val) => setFormData(prev => ({ ...prev, isBBQ: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">픽업여부</th>
              <td>
                <CommonCode cd="isPickup" model={formData.isPickup} onSetData={(val) => setFormData(prev => ({ ...prev, isPickup: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">온돌여부</th>
              <td>
                <CommonCode cd="isStone" model={formData.isStone} onSetData={(val) => setFormData(prev => ({ ...prev, isStone: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">메모</th>
              <td>
                <input type="text" value={formData.memo || ''} onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))} required />
              </td>
            </tr>
          <tr>
            <th scope="col" colSpan={2}>내용</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <div id="ProductEditor" />
            </td>
          </tr>
            <tr>
              <th scope="col">파일번호</th>
              <td>
                <input type="number" value={formData.fileNo || ''} onChange={(e) => setFormData(prev => ({ ...prev, fileNo: e.target.value }))}  />
              </td>
            </tr>
          <tr>
            <th scope="col">등록자</th>
            <td>
              {formData.creator}
            </td>
          </tr>
          <tr>
            <th scope="col">등록일시</th>
            <td>
              {formData.createDt}
            </td>
          </tr>
          <tr>
            <th scope="col">수정자</th>
            <td>
              {formData.updater}
            </td>
          </tr>
          <tr>
            <th scope="col">수정일시</th>
            <td>
              {formData.updateDt}
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <div className="detail-bottom">
        <button type="button" onClick={save}>저장</button>
        <button type="button" onClick={cancel}>취소</button>
      </div>
    </div>
  );
}