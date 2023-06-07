import { Link } from "react-router-dom";
import styled from "styled-components";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const SubscribeItem = ({ item }) => {
  const startDate = new Date(item.subscribeSendDate);
  const nextPaymentDate = new Date(
    startDate.setMonth(startDate.getMonth() + 1)
  );

  const year = nextPaymentDate.getFullYear();
  const month = (nextPaymentDate.getMonth() + 1).toString().padStart(2, "0");
  const date = nextPaymentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year} . ${month} . ${date}`;

  return (
    <>
      <ItemCard>
        <ItemInfoBox>
          <ItemImage
            src={`http://localhost:8080/images/${item.subscribeProductImage}`}
            alt="상품 이미지"
          />
          <ItemNameOptionBox>
            <ItemName>{item.subscribeProductScent}</ItemName>
            <ItemOption>{item.subscribeProductScentNoteName}</ItemOption>
            <ItemName>{item.subscribeSendState}</ItemName>
          </ItemNameOptionBox>
        </ItemInfoBox>
        <ItemOrderBox>
          <ItemOrderDate>{item.subscribeSendDate}</ItemOrderDate>
          <ItemOrderDate>-</ItemOrderDate>
          <ItemOrderDate>{formattedDate}</ItemOrderDate>
        </ItemOrderBox>
        <ItemAmountBox>
          <ItemAmount>{addComma(item.subscribeProductPrice)} 원</ItemAmount>
        </ItemAmountBox>
        <ButtonBox >
          <Button to="/exp/subsmanage">한줄평 작성</Button>
        </ButtonBox>
      </ItemCard>
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
  width: 40%;
  display: flex;
`;

const ItemOrderBox = styled.div`
  text-align: center;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  line-height: 20px;
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

const ButtonBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const Button = styled(Link)`
  display: inline;
  cursor: pointer;
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;
