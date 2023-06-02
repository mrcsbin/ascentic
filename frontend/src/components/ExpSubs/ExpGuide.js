import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import card1 from "../../assets/expSubs/expCard3.webp";
import card2 from "../../assets/expSubs/expCard2.webp";
import package1 from "../../assets/expSubs/expPackage4.webp";
import package2 from "../../assets/expSubs/expPackage3.webp";

const ExpGuide = (props) => {
  const [guideMode, setGuideMode] = useState(1);
  const now = new Date();
  const navigate = useNavigate();

  const changeExpPackageMode = () => {
    setGuideMode(1);
  };

  const changeCardMode = () => {
    setGuideMode(2);
  };

  // const cardApply = () => {
  //   alert("상품 상세 페이지로 이동");
  // };

  const expApply = () => {
    // alert("주문관련 컴포넌트 불러오기");
    props.showModal();
  };

  const selectGuide = () => {
    if (guideMode === 1) {
      return (
        <>
          <ButtonBox>
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
          </ButtonBox>

          <ExpGuide1>
            <ImageCard>
              <div>
                <img src={card1} alt="이미지 없음" />
              </div>
              <div>
                <img src={card2} alt="이미지 없음" />
              </div>
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
                <div>회원당 1회만 구매가능</div>
              </AddInfo>
              <Link
                to="/store/productdetail/1"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ApplyBtn>지금 구매하기</ApplyBtn>
              </Link>
            </GuideContent>
          </ExpGuide1>
        </>
      );
    } else if (guideMode === 2) {
      return (
        <>
          <ButtonBox>
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
          </ButtonBox>
          <ExpGuide1>
            <ImageCard>
              <div>
                <img src={package2} alt="이미지 없음" />
              </div>
              <div>
                <img src={package1} alt="이미지 없음" />
              </div>
            </ImageCard>

            <GuideContent>
              <div>체험 패키지 구독 서비스</div>
              <div>
                당신을 위한 Note : &nbsp;
                {props.userTasteRes === "null" ? "" : props.userTasteRes}
              </div>
              <div>
                매달 취향에 맞는 향의 체험 패키지를 정기 배송해드리는 에이센틱의
                구독 서비스입니다. 일주일 분량의 향수, 디퓨저, 향초, 핸드워시,
                샴푸 등으로 구성된 체험 패키지를 통해 매달 다른 테마의 향을 직접
                느껴보세요.
              </div>
              <div>
                패키지 구성: 큐레이션 카드, 매달 다르게 구성되는 체험 패키지
                <br />
                결제일: {now.getDate()}일 &nbsp;&nbsp;|&nbsp;&nbsp; 예상 도착일:
                결제 3일 후
              </div>
              <PriceInfo>매월 22,900원 정기결제 (배송비 포함)</PriceInfo>
              {props.userTasteRes === "null" ? (
                <ApplyBtn onClick={() => navigate("/exp/taste")}>
                  취향 테스트 먼저하기
                </ApplyBtn>
              ) : (
                <ApplyBtn onClick={() => expApply()}>구독 신청하기</ApplyBtn>
              )}
            </GuideContent>
          </ExpGuide1>
        </>
      );
    }
  };

  return selectGuide();
};
const ButtonBox = styled.div`
  width: 520px;
  background-color: transparent;
  button {
    border: none;
    font-size: 23px;
    margin-right: 20px;
    width: 180px;
    height: 65px;
    cursor: pointer;
  }
`;
const ExpGuide1 = styled.div`
  position: relative;
  width: 500px;
  height: 620px;
  background-color: white;
  padding: 50px;
`;

const ImageCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  margin: 0 auto;

  div {
    width: 225px;
    height: 225px;
    overflow: hidden;
  }
  img {
    width: 225px;
    height: 225px;
    object-fit: cover;
    object-position: 0 70%;
  }
`;

const GuideContent = styled.div`
  margin: 30px 0;
  > div:nth-child(1) {
    font-size: 30px;
    font-weight: 700;
  }

  > div:nth-child(2) {
    margin-top: 20px;
    font-size: 23px;
    font-weight: 600;
  }

  > div:nth-child(3) {
    margin-top: 20px;
    font-size: 1rem;
    line-height: 1.5;
  }

  > div:nth-child(4) {
    margin-top: 20px;
    font-size: 1rem;
    font-weight: 550;
    line-height: 1.5;
  }
`;

const PriceInfo = styled.div`
  width: 100%;
  margin: 30px 0;
  font-size: 25px;
  font-weight: 600;
  text-align: right;
`;

const AddInfo = styled.div`
  width: 180px;
  height: 30px;
  background-color: black;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
  div {
    padding-top: 5px;
    text-align: center;
  }
`;

const ApplyBtn = styled.button`
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  font-size: 23px;
  font-weight: 500;
  border: 1.5px solid black;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
  }
`;

export default ExpGuide;
