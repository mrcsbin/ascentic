import { styled } from "styled-components";
import { useState } from "react";
import expCard1 from "../../assets/expSubs/expCard1.png";
import expCard2 from "../../assets/expSubs/expCard2.png";
import packageCard1 from "../../assets/expSubs/packageCard1.png";
import packageCard2 from "../../assets/expSubs/packageCard2.png";

const ExpGuide = (props) => {
  const [guideMode, setGuideMode] = useState(1);

  const changeExpPackageMode = () => {
    setGuideMode(1);
  };

  const changeCardMode = () => {
    setGuideMode(2);
  };

  const cardApply = () => {
    alert("상품 상세 페이지로 이동");
  };

  const expApply = () => {
    alert("주문관련 컴포넌트 불러오기");
    props.showModal();
  };

  const selectGuide = () => {
    if (guideMode === 1) {
      return (
        <ExpGuide1>
          <button
            onClick={() => changeExpPackageMode()}
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            시향카드
          </button>
          <button
            onClick={() => changeCardMode()}
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            체험 패키지
          </button>
          <ImageCard>
            <img src={packageCard1} alt="이미지 없음"></img>
            <img src={packageCard2} alt="이미지 없음"></img>
          </ImageCard>

          <GuideContent>
            <div>시향카드 패키지</div>
            <div>9가지 노트 향을 담은 시향 카드</div>
            <div>
              Animal, Watery&Powdery, Woody, Mossy, Herbal & Green, Floral,
              Citrus, Fruity, Special
            </div>
            <div>에이센틱의 9가지 노트를 직접 체험해보세요.</div>
            <PriceInfo>6,600원 (배송비 포함)</PriceInfo>
            <AddInfo>
              <div>회원당 1회만 신청가능</div>
            </AddInfo>
            <ApplyBtn onClick={() => cardApply()}>지금 신청하다</ApplyBtn>
          </GuideContent>
        </ExpGuide1>
      );
    } else if (guideMode === 2) {
      return (
        <ExpGuide1>
          <button
            onClick={() => changeExpPackageMode()}
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            시향카드
          </button>
          <button
            onClick={() => changeCardMode()}
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            체험 패키지
          </button>
          <ImageCard>
            <img src={expCard1} alt="이미지 없음"></img>
            <img src={expCard2} alt="이미지 없음"></img>
          </ImageCard>

          <GuideContent>
            <div>체험 패키지 구독 서비스</div>
            <div>당신을 위한 Note {props.userTasteRes} </div>
            <div>
              매달 취향에 맞는 향의 체험 패키지를 정기 배송해드리는 에이센틱의
              구독 서비스입니다. 일주일 분량의 향수, 디퓨저, 향초, 핸드워시,
              샴푸 등으로 구성된 체험 패키지를 통해 매달 다른 테마의 향을 직접
              느껴보세요.
            </div>
            <div>
              패키지 구성: 큐레이션 카드, 매달 다르게 구성되는 체험 패키지
              결제일: 오늘 날짜 예상 도착일: 결제 3일 후
            </div>
            <PriceInfo>매월 22,900원 정기결제 (배송비 포함)</PriceInfo>
            <ApplyBtn onClick={() => expApply()}>구독 신청하기</ApplyBtn>
          </GuideContent>
        </ExpGuide1>
      );
    }
  };

  return selectGuide();
};

const ExpGuide1 = styled.div`
  position: relative;

  width: 600px;
  height: 720px;
  background-color: white;

  > button:nth-child(1) {
    border: none;
    font-size: 25px;
    position: absolute;
    top: -9.7%;
    width: 195px;
    height: 70px;
  }

  > button:nth-child(2) {
    border: none;
    font-size: 25px;
    position: absolute;
    left: 35%;
    top: -9.7%;
    width: 195px;
    height: 70px;
  }
`;

const ImageCard = styled.div`
  position: absolute;
  top: 3%;
  left: 7%;
  width: 515px;
  height: 225px;

  > img:nth-child(1) {
    position: absolute;
    width: 223px;
    height: 223px;
    background-color: red;
  }

  > img:nth-child(2) {
    position: absolute;
    left: 55%;
    width: 223px;
    height: 223px;
    background-color: white;
  }
`;

const GuideContent = styled.div`
  top: 38%;
  left: 7%;
  position: absolute;
  width: 515px;
  height: 400px;
  /* background-color: blue; */

  > div:nth-child(1) {
    margin-top: 6px;
    font-size: 35px;
    font-weight: 700;
  }

  > div:nth-child(2) {
    margin-top: 20px;
    font-size: 25px;
    font-weight: 600;
  }

  > div:nth-child(3) {
    margin-top: 20px;
    font-size: 15px;
  }

  > div:nth-child(4) {
    margin-top: 25px;
    font-size: 15px;
    font-weight: 550;
  }
`;

const PriceInfo = styled.div`
  width: 480px;
  height: 55px;
  /* background-color: red; */

  position: absolute;
  top: 60%;
  left: 10%;

  font-size: 27px;
  font-weight: 700;
  text-align: right;
`;

const AddInfo = styled.div`
  width: 180px;
  height: 25px;
  background-color: black;
  color: white;
  position: absolute;
  top: 80%;
  font-size: 16px;
  font-weight: 700;
  > div {
    margin-top: 3px;
    text-align: center;
  }
`;

const ApplyBtn = styled.button`
  position: absolute;
  top: 87%;
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  font-size: 23px;
`;

export default ExpGuide;
