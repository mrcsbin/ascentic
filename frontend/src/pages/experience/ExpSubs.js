import { styled } from "styled-components";
import ExpGuide from "../../components/ExpSubs/ExpGuide";
import { useState } from "react";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import Payment from "../../components/order/Payment";
import SubsPayInfo from "../../components/ExpSubs/SubsPayInfo";
import expSubsBackground from "../../assets/expSubs/expSubsBackgroun.png";
import { getCookie } from "../../utils/Cookies";
import { useEffect } from "react";
import { requestTasteRes } from "../../api/SubsMemberApi";

const ExpSubs = () => {
  const accessToken = getCookie("accessToken");

  const [userTasteRes, setTasteRes] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await requestTasteRes(accessToken); // api 함수 호출
      console.log(result);
      if (result.data === undefined) {
        setTasteRes("하이");
      } else {
        setTasteRes(result.firstPlace); // 결과를 state에 저장
      }
    };

    fetchData();
  }, []);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [modalPage, setModalPage] = useState(1);

  // 모달창 띄우기
  const openModal = () => {
    setModalPage(1);
    setShowOrderModal(true);
  };

  // 모달창 닫기
  const closeModal = () => {
    setShowOrderModal(false);
  };

  // 이전 페이지
  const beforePage = () => {
    setModalPage((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1));
    console.log(modalPage);
  };

  // 다음 페이지
  const nextPage = () => {
    setModalPage((prevPage) => (prevPage >= 3 ? 3 : prevPage + 1));
    console.log(modalPage);
  };

  // 페이지 번호에 따른 컴포넌트 render
  const currentPage = () => {
    if (modalPage === 1) {
      return (
        <>
          <DeliveryInfo></DeliveryInfo>{" "}
          <button className="before_page_btn" onClick={() => beforePage()}>
            이전
          </button>
          <button className="next_page_btn" onClick={() => nextPage()}>
            다음
          </button>
        </>
      );
    } else if (modalPage === 2) {
      return (
        <>
          <Payment></Payment>
          <button className="before_page_btn" onClick={() => beforePage()}>
            이전
          </button>
          <button className="next_page_btn" onClick={() => nextPage()}>
            다음
          </button>
        </>
      );
    } else if (modalPage === 3) {
      return (
        <>
          <SubsPayInfo userTasteRes={userTasteRes}></SubsPayInfo>{" "}
          <button className="before_page_btn" onClick={() => beforePage()}>
            이전
          </button>
        </>
      );
    }
  };

  return (
    <ExpSubsBody>
      <ExpSubsIntro>
        <div>특별한 당신을 위해</div>
        <div>[a]scentic이 준비한</div>
        <div>체험 패키지 구독 서비스</div>
      </ExpSubsIntro>
      <GuideLocation>
        <ExpGuide
          showModal={() => openModal()}
          userTasteRes={userTasteRes}
        ></ExpGuide>
      </GuideLocation>
      {showOrderModal && (
        <>
          <ModalBackground />
          <ModalContainer>
            <button className="modal_close_btn" onClick={closeModal}>
              X
            </button>
            {currentPage()}
          </ModalContainer>
        </>
      )}
    </ExpSubsBody>
  );
};

const ExpSubsBody = styled.div`
  background-image: url(${expSubsBackground});
  position: relative;
  width: 1920px;
  height: 100vb;
`;

const ExpSubsIntro = styled.div`
  color: white;
  position: absolute;
  top: 10%;
  left: 7%;

  > div:nth-child(1) {
    font-size: 40px;
    font-weight: 700;
  }

  > div:nth-child(2) {
    margin-top: 12px;
    font-size: 55px;
    font-weight: 700;
  }

  > div:nth-child(3) {
    margin-top: 10px;
    font-size: 55px;
    font-weight: 700;
  }
`;

const GuideLocation = styled.div`
  position: relative;
  top: 13%;
  left: 55%;
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
  width: 720px;
  height: 480px;
  background-color: white;
  padding: 20px;
  z-index: 999;
  border: 10px solid black;
  .modal_close_btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .next_page_btn {
    position: absolute;
    top: 90%;
    right: 5%;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
  }

  .before_page_btn {
    position: absolute;
    top: 90%;
    left: 5%;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default ExpSubs;
