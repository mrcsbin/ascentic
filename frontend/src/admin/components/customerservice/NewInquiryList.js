import styled from "styled-components";

export const NewInquiryList = () => {
  return (
    <>
      <HeaderWrap>
        <HeaderLeft>고객 문의</HeaderLeft>
        <HeaderRight></HeaderRight>
      </HeaderWrap>
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`;
