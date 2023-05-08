import React from "react";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

// 배송 정보
function DeliveryInfo(props) {
  const [showAddressModal, setShowAddress] = useState(false); // 모달창을 띄우기 닫기 위한 state

  // 모달창 띄우기
  function getAddresSearchModal() {
    setShowAddress(true);
  }

  // 모달창에서 주소를 선택할 때
  function handleComplete(data) {
    // 메인주소 State set
    props.changeShipInfo({
      ...props.shipInfo,
      mainAddress: data.address,
    });

    setShowAddress(false); // 주소 검색 완료 후 모달 창을 닫음
  }

  return (
    <div>
      <div className="sub_title">
        배송 정보
        <button onClick={props.changeExtend}>{props.extend ? "-" : "+"}</button>
      </div>
      {props.extend && (
        <div className="delivery_form">
          <div className="recipient_content">
            <div>
              <div>수령인</div>
              <button onClick={props.getOrderInfo}>주문자 정보와 동일</button>
            </div>
            <input
              type="text"
              value={props.shipInfo.shipName}
              onChange={(e) =>
                props.changeShipInfo({
                  ...props.shipInfo,
                  shipName: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="recipient_content">
            <div>연락처</div>
            <input
              type="text"
              value={props.shipInfo.shipTel}
              placeholder="예:01012345678"
              onChange={(e) =>
                props.changeShipInfo({
                  ...props.shipInfo,
                  shipTel: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="delivery_addr">
            <div>
              <div>배송 주소</div>
              <button onClick={props.getRecentAddress}>최근 배송지</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="예) 서교동 아지오빌딩, 와우산로"
                value={props.shipInfo.mainAddress}
                disabled={true}
              ></input>
              <button onClick={getAddresSearchModal}>검색</button>
            </div>
            <div>
              <input
                type="text"
                value={props.shipInfo.subAddress}
                placeholder="나머지 주소 입력"
                onChange={(e) =>
                  props.changeShipInfo({
                    ...props.shipInfo,
                    subAddress: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <div>기사님께 전하는 메시지</div>
              <input
                type="text"
                onChange={(e) =>
                  props.changeShipInfo({
                    ...props.shipInfo,
                    shipMessage: e.target.value,
                  })
                }
                placeholder="ex) 안전하게 와주세요."
              ></input>
            </div>
          </div>
          {showAddressModal && (
            <div>
              <div
                className="modal-bg"
                onClick={() => setShowAddress(false)}
              ></div>
              <div className="modal">
                <DaumPostcode onComplete={handleComplete} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeliveryInfo;
