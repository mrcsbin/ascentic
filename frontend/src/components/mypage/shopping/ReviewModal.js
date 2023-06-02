import styled from "styled-components";
import EXIT_IMAGE from "../../../assets/mypage/exit-image.png";
import { useEffect } from "react";
import WriteReview from "./WriteReview";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

const ReviewModal = ({ item, clickModalHandle }) => {
  console.log(item);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  return (
    <>
      <ModalContainer>
        <ModalBackdrop onClick={() => clickModalHandle()}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ButtonBox>
              <ExitButton src={EXIT_IMAGE} onClick={() => clickModalHandle()} />
            </ButtonBox>
            <ModalContents>
              <ContentTitle>리뷰 쓰기</ContentTitle>
              <ItemCard>
                <ItemImageBox>
                  <ItemImage
                    src={`http://localhost:8080/images/${item.productImage}`}
                  />
                </ItemImageBox>
                <ItemInfoBox>
                  <ItemName>{item.productName}</ItemName>
                  <ItemOption>{item.productOptionName}</ItemOption>
                  <ItemPrice>{addComma(item.orderProductPrice)} 원</ItemPrice>
                </ItemInfoBox>
              </ItemCard>
              <RatingBox>
                <WriteReview></WriteReview>
              </RatingBox>
              <SubmitBox></SubmitBox>
            </ModalContents>
          </ModalView>
        </ModalBackdrop>
      </ModalContainer>
    </>
  );
};

export default ReviewModal;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  z-index: 9999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
`;

const ExitButton = styled.img`
  cursor: pointer;
  margin: 25px 25px 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  border-radius: 5px;
  width: 50%;
  height: 100%;
  background-color: white;
`;

const ModalContents = styled.div`
  font-size: 20px;
  color: var(--coz-purple-600);
  width: 80%;
  margin: 0 auto;
`;

const ContentTitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 2rem;
  border-bottom: 1px solid grey;
`;

const ItemCard = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid grey;
`;

const ItemImageBox = styled.div`
  width: 15%;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemInfoBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 3rem;
  box-sizing: border-box;
`;

const ItemName = styled.div`
  font-size: 1.5rem;
`;

const ItemOption = styled.div`
  font-size: 1.2rem;
  color: grey;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: grey;
`;

const RatingBox = styled.div``;

const SubmitBox = styled.div``;
