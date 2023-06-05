import styled from "styled-components";

export const InquiryItem = ({ item }) => {
  console.log(item);
  return (
    <>
      <InquiryCard>
        <InquiryNumber>{item.inquiryNum}</InquiryNumber>
        <InquiryCategory>{item.inquiryCategory}</InquiryCategory>
        <InquiryTitle>{item.inquiryTitle}</InquiryTitle>
        <InquiryState>
          {item.inquiryState === true ? "답변 완료" : "답변 대기중"}
        </InquiryState>
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
