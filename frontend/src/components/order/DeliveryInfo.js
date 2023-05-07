import React from "react";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

// 배송 정보
function DeliveryInfo(props) {
  // 주문자 정보 동일 버튼 이벤트
  function getOrderInfo() {
    // 주문자 정보 가져오기
  }

  // 최근 배송지 버튼 이벤트
  function getLatestAddr() {
    // 최근 배송지
  }

  // 주소 배송지 관련 state
  const [mainAddress, setMainAddress] = useState(""); // 메인 주소
  const [subAddress, setSubAddress] = useState(""); // 나미저 주소
  const [showAddressModal, setShowAddress] = useState(false); // 모달창을 띄우기 닫기 위한 state

  // 모달창 띄우기
  function getAddresSearchModal() {
    setShowAddress(true);
  }

  // 모달창에서 주소를 선택할 때
  function handleComplete(data) {
    setMainAddress(data.address); // 메인 주소 set
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
              <button onClick={getOrderInfo}>주문자 정보와 동일</button>
            </div>
            <input type="text"></input>
          </div>
          <div className="recipient_content">
            <div>연락처</div>
            <input type="text" placeholder="예:01012345678"></input>
          </div>
          <div className="delivery_addr">
            <div>
              <div>배송 주소</div>
              <button onClick={getLatestAddr}>최근 배송지</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="예) 서교동 아지오빌딩, 와우산로"
                value={mainAddress}
                disabled={true}
              ></input>
              <button onClick={getAddresSearchModal}>검색</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="나머지 주소 입력"
                onChange={(e) => setSubAddress(e.target.value)}
              ></input>
            </div>
            <div>
              <div>기사님께 전하는 메시지</div>
              <input type="text" placeholder="안전하게 와주세요."></input>
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
