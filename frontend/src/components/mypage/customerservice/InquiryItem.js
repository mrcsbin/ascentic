import styled from "styled-components";

export const InquiryItem = () => {
  return (
    <>
      <InquiryCard>
        <InquiryNumber>3</InquiryNumber>
        <InquiryCategory>상품</InquiryCategory>
        <InquiryTitle>선물용으로 괜찮을까요?</InquiryTitle>
        <InquiryState>대기중</InquiryState>
      </InquiryCard>
      <InquiryCard>
        <InquiryNumber>2</InquiryNumber>
        <InquiryCategory>배송</InquiryCategory>
        <InquiryTitle>언제쯤 배송되나요?</InquiryTitle>
        <InquiryState>대기중</InquiryState>
      </InquiryCard>
      <InquiryCard>
        <InquiryNumber>1</InquiryNumber>
        <InquiryCategory>상품</InquiryCategory>
        <InquiryTitle>이 상품이 20대 남성에게 잘 어울릴까요?</InquiryTitle>
        <InquiryState>답변완료</InquiryState>
      </InquiryCard>
    </>
  );
};

const InquiryCard = styled.div`
  box-sizing: border-box;
  padding: 25px 5px;
  display: flex;
  border-bottom: 1px solid grey;
`;

const InquiryNumber = styled.div`
  width: 10%;
  text-align: center;
`;

const InquiryCategory = styled.div`
  width: 25%;
  text-align: center;
`;

const InquiryTitle = styled.div`
  width: 50%;
`;

const InquiryState = styled.div`
  width: 15%;
  text-align: center;
`;
