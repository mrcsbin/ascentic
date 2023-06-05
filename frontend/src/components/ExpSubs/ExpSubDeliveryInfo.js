import React from "react";
import { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import { sameOrderInfo, updateShip } from "../../store/modules/order";
import { requestRecentAddr } from "../../api/OrderApi";
import { getCookie } from "../../utils/Cookies";
import styled from "styled-components";

// 배송 정보
const DeliveryInfo = ({ setDisable }) => {
  const dispatch = useDispatch(); // action 객체를 보내는 훅
  const shipInfo = useSelector((state) => state.order.shipInfo);

  const hadleSameOrderInfo = () => {
    dispatch(sameOrderInfo());
  };

  const handleUpdateShip = (e) => {
    const { name, value } = e.target;
    dispatch(updateShip({ updateShipInfo: { [name]: value } }));
  };

  const [showAddressModal, setShowAddress] = useState(false); // 모달창을 띄우기 닫기 위한 state

  // 모달창 띄우기
  const getAddresSearchModal = () => {
    setShowAddress(true);
  };

  // 모달창에서 주소를 선택할 때
  const handleComplete = (data) => {
    dispatch(updateShip({ updateShipInfo: { mainAddress: data.address } }));
    setShowAddress(false); // 주소 검색 완료 후 모달 창을 닫음
  };

  const accessToken = getCookie("accessToken");

  // 최근 배송지
  const getRecentAddress = async () => {
    try {
      const addr = await requestRecentAddr(accessToken);

      dispatch(
        updateShip({ updateShipInfo: { mainAddress: addr.shipMainAddress } })
      );
      dispatch(
        updateShip({ updateShipInfo: { subAddress: addr.shipSubAddress } })
      );
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    // 모든 필수 입력값 확인 함수
    const checkFormCompletion = () => {
      const isShipNameFilled = shipInfo.shipName.trim() !== "";
      const isShipTelFilled = shipInfo.shipTel.trim() !== "";
      const isMainAddressFilled = shipInfo.mainAddress.trim() !== "";
      const isSubAddressFilled = shipInfo.subAddress.trim() !== "";
      const isShipMessageFilled = shipInfo.shipMessage.trim() !== "";
      const isComplete =
        isShipNameFilled &&
        isShipTelFilled &&
        isMainAddressFilled &&
        isSubAddressFilled;
      // &&isShipMessageFilled;
      if (isComplete) {
        setDisable(false);
      }
    };

    checkFormCompletion();
  }, [shipInfo]);
  return (
    <DeliveryForm>
      <Title>구독 배송 정보</Title>
      <RecipientContent>
        <div>
          <div>수령인</div>
          <button onClick={hadleSameOrderInfo}>회원 정보와 동일</button>
        </div>
        <input
          type="text"
          name="shipName"
          value={shipInfo.shipName}
          onChange={handleUpdateShip}
        ></input>
      </RecipientContent>
      <TelContent>
        <div>연락처</div>{" "}
        {/* 연락처  아무렇게나 입력해도 010-1234-1234 형태로 바꾸는 기능 추가해야될 듯?*/}
        <input
          type="text"
          name="shipTel"
          value={shipInfo.shipTel}
          onChange={handleUpdateShip}
          placeholder="예:01012345678"
        ></input>
      </TelContent>
      <DeliveryAddr>
        <div>
          <div>배송 주소</div>
          <button onClick={() => getRecentAddress()}>최근 배송지</button>
        </div>
        <div>
          <input
            type="text"
            value={shipInfo.mainAddress}
            placeholder="예) 서교동 아지오빌딩, 와우산로"
            disabled={true}
          ></input>
          <button onClick={getAddresSearchModal}>검색</button>
        </div>
        <div>
          <input
            type="text"
            name="subAddress"
            value={shipInfo.subAddress}
            onChange={handleUpdateShip}
            placeholder="나머지 주소 입력"
          ></input>
        </div>
      </DeliveryAddr>
      <DeliveryMessage>
        <div>기사님께 전하는 메시지</div>
        <input
          type="text"
          name="shipMessage"
          value={shipInfo.shipMessage}
          onChange={handleUpdateShip}
          placeholder="ex) 안전하게 와주세요."
        ></input>
      </DeliveryMessage>

      {showAddressModal && (
        <>
          <ModalBackground onClick={() => setShowAddress(false)} />
          <ModalContainer>
            <DaumPostcode onComplete={handleComplete} />
          </ModalContainer>
        </>
      )}
    </DeliveryForm>
  );
};

export default DeliveryInfo;

const DeliveryForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  width: 80%;
  text-align: left;
  font-size: 25px;
  font-weight: 700;
  padding-top: 10px;
`;

const RecipientContent = styled.div`
  margin-top: 25px;
  width: 70%;

  > div {
    width: 100%;
  }

  > div > div {
    float: left;
    font-size: 1.1rem;
  }

  > div > button {
    border: none;
    color: black;
    float: right;
    text-align: right;
    background-color: white;
    font-size: 0.8rem;
    text-decoration: underline;
    cursor: pointer;
  }

  > input {
    width: 93%;
    height: 30px;
    font-size: 1.1rem;
    margin: 10px 0;
    padding: 3px 15px;
  }
`;

const TelContent = styled.div`
  margin-top: 10px;
  width: 70%;
  > div {
    font-size: 1.1rem;
  }

  > input {
    width: 93%;
    height: 30px;
    margin: 10px 0;
    font-size: 1.1rem;
    padding: 3px 15px;
  }
`;

const DeliveryAddr = styled.div`
  margin-top: 10px;
  width: 70%;
  clear: both;

  > div {
    width: 100%;
    clear: both;
  }

  > div:nth-child(1) > div {
    float: left;
    font-size: 1.1rem;
  }

  > div:nth-child(1) > button {
    border: none;
    color: black;
    float: right;
    background-color: white;
    font-size: 0.8rem;
    text-decoration: underline;
    cursor: pointer;
  }

  > div:nth-child(2) > input {
    width: 65%;
    height: 30px;
    margin: 10px 0;
    font-size: 1.1rem;
    padding: 3px 0 3px 15px;
  }

  > div:nth-child(2) > button {
    width: 28%;
    height: 36px;
    font-size: 1.1rem;
    margin-top: 5px;
    margin-left: 10px;
    border: 1.5px solid;
    background-color: white;
    cursor: pointer;
  }

  > div:nth-child(3) > input {
    width: 93%;
    height: 30px;
    margin: 10px 0;
    font-size: 1.1rem;
    padding: 3px 15px;
  }
`;

const DeliveryMessage = styled.div`
  margin-top: 10px;
  width: 70%;
  > div {
    width: 100%;
    font-size: 1.1rem;
  }

  > input {
    width: 93%;
    height: 30px;
    margin: 10px 0;
    font-size: 1.1rem;
    padding: 3px 15px;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 430px;
  background-color: white;
  padding: 20px;
  z-index: 999;
`;
