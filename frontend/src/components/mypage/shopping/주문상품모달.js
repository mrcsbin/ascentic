import { Link } from "react-router-dom";
import styled from "styled-components";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const 주문상품모달 = ({ item }) => {
  console.log(item);

  return (
    <>
      <ItemCard>
        <상단>{item.orderProductState}</상단>
        <하단>
          {/* <StyledLink
            to={`/store/productdetail/${item.productNum}`}
            style={{ color: "black", textDecoration: "none", display: "flex" }}
          > */}
          <ItemInfoBox>
            <ItemImage
              src={`http://localhost:8080/images/${item.productImage}`}
              alt="상품 이미지"
            />
            <ItemNameOptionBox>
              <ItemName>{item.productName}</ItemName>
              <ItemOption>{item.productOptionName}</ItemOption>
              <ItemName>
                {addComma(item.orderProductPrice)}원 &nbsp;&nbsp;
                {item.orderProductCount}개
              </ItemName>
            </ItemNameOptionBox>
          </ItemInfoBox>
          {/* </StyledLink> */}
          <버튼박스>
            <주문취소>주문취소</주문취소>
            <리뷰쓰기>리뷰쓰기</리뷰쓰기>
          </버튼박스>
        </하단>
      </ItemCard>
    </>
  );
};

const 상단 = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 1rem 30px;
`;

const 하단 = styled.div`
  display: flex;
`;

const 버튼박스 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 30%;
`;

const 주문취소 = styled.div`
  width: 80%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 500;
`;

const 리뷰쓰기 = styled.div`
  font-weight: 500;
  text-align: center;
  font-size: 1.3rem;
  width: 80%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
`;

const ItemCard = styled.div`
  /* box-sizing: border-box;
  padding: 25px 0;
  display: flex;
  border-bottom: 1px solid grey; */
  width: 100%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 24px 24px 16px;
  box-sizing: border-box;
`;

const StyledLink = styled(Link)`
  color: "black";
  text-align: none;
  display: flex;
  width: 40%;
`;

const ItemInfoBox = styled.div`
  width: 70%;
  display: flex;
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

const ItemOption = styled.div``;

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
`;
