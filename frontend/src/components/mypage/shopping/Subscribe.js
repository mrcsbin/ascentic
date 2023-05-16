import styled from "styled-components";

export const Subscribe = () => {
  return (
    <Wrap>
      <ContentHeader>구독관리</ContentHeader>
    </Wrap>
  );
};

const Wrap = styled.div`
  border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;
