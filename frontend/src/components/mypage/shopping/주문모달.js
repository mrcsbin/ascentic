import styled from "styled-components";
import { 주문상품모달 } from "./주문상품모달";
import { Link } from "react-router-dom";

export const 주문모달 = ({ item }) => {
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  return (
    <>
      <주문모달Wrapper>
        <상단바>
          <주문날짜주문번호>
            <주문날짜>주문 날짜 : {item.orderDate} </주문날짜>
            <주문번호>주문 번호 : {item.orderId}</주문번호>
          </주문날짜주문번호>
          <StyledLink to={`/ordercomplete?orderId=${item.orderId}`}>
            <주문상세>주문 상세 보기</주문상세>
          </StyledLink>
        </상단바>
        {item.orderProductList.map((item, index) => (
          <주문상품모달 item={item} key={index} />
        ))}
      </주문모달Wrapper>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const 주문모달Wrapper = styled.div`
  width: 80%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 24px 24px 16px;
  box-sizing: border-box;
`;

const 상단바 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const 주문날짜주문번호 = styled.div`
  margin-bottom: 1rem;
`;

const 주문날짜 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const 주문번호 = styled.div`
  color: grey;
  font-size: 1.2rem;
`;

const 주문상세 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;
