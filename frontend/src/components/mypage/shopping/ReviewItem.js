import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReviewModal from "./ReviewModal";
// import ReviewModal from "./ReviewModal";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const ReviewItem = ({ item }) => {
  const [reviewState, setReviewState] = useState(item.orderReviewState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickModalHandle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ItemCard>
        <StyledLink
          to={`/store/productdetail/${item.productNum}`}
          style={{ color: "black", textDecoration: "none", display: "flex" }}
        >
          <ItemInfoBox>
            <ItemImage
              src={`http://localhost:8080/images/${item.productImage}`}
              alt="상품 이미지"
            />
            <ItemNameOptionBox>
              <ItemName>{item.productName}</ItemName>
              <ItemOption>{item.productOptionName}</ItemOption>
              <ItemName>{item.orderId}20230602mrcsbin</ItemName>
            </ItemNameOptionBox>
          </ItemInfoBox>
        </StyledLink>
        <ItemOrderDate>{item.orderDate}</ItemOrderDate>
        <ItemAmountBox>
          <ItemAmount>{addComma(item.orderProductPrice)} 원</ItemAmount>
          <ItemCount>{item.orderProductCount} 개</ItemCount>
        </ItemAmountBox>
        {reviewState ? (
          <ItemOrderState>후기 작성 완료</ItemOrderState>
        ) : (
          <ItemOrderState onClick={clickModalHandle}>후기 작성</ItemOrderState>
        )}
      </ItemCard>
      {isModalOpen && (
        <ReviewModal item={item} clickModalHandle={clickModalHandle} />
      )}
    </>
  );
};

const ItemCard = styled.div`
  box-sizing: border-box;
  padding: 25px 0;
  display: flex;
  border-bottom: 1px solid grey;
`;

const ItemInfoBox = styled.div`
  width: 100%;
  display: flex;
`;

const StyledLink = styled(Link)`
  color: "black";
  text-align: none;
  display: flex;
  width: 40%;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 30px;
`;

const ItemNameOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemName = styled.div`
  padding: 15px 0;
`;

const ItemOption = styled.div`
  color: grey;
`;

const ItemOrderDate = styled.div`
  text-align: center;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemAmountBox = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const ItemAmount = styled.div`
  padding: 15px 0;
  text-align: center;
`;

const ItemCount = styled.div`
  text-align: center;
`;

const ItemOrderState = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  cursor: pointer;
`;

// const ModalContainer = styled.div`
//   // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
// `;

// const ModalBackdrop = styled.div`
//   // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
//   z-index: 1; //위치지정 요소
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.4);
//   border-radius: 10px;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;

// const ModalBtn = styled.button`
//   background-color: var(--coz-purple-600);
//   text-decoration: none;
//   border: none;
//   padding: 20px;
//   color: white;
//   border-radius: 30px;
//   cursor: grab;
// `;

// const ExitBtn = styled(ModalBtn)`
//   background-color: #4000c7;
//   border-radius: 10px;
//   text-decoration: none;
//   margin: 10px;
//   padding: 5px 10px;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalView = styled.div.attrs((props) => ({
//   // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
//   role: "dialog",
// }))`
//   // Modal창 CSS를 구현합니다.
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   border-radius: 20px;
//   width: 500px;
//   height: 200px;
//   background-color: #ffffff;
//   > div.desc {
//     margin: 50px;
//     font-size: 20px;
//     color: var(--coz-purple-600);
//   }
// `;
