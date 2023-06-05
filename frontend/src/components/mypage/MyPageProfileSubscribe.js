import { Link } from "react-router-dom";
import styled from "styled-components";

export const MyPageProfileSubscribe = () => {
  return (
    <>
      <Wrap>
        <DownSide>
          <DownSideContent>
            구독중인 상품이 없습니다.
            <ExpLink to="/exp/subs">구독하러가기</ExpLink>
          </DownSideContent>
        </DownSide>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin-top: 3rem;
`;

const DownSide = styled.div``;

const DownSideContent = styled.div`
  padding: 10rem 0;
  font-size: 1rem;
  color: rgba(34, 34, 34, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DownSideLinkBox = styled.div`
  margin-top: 1rem;
`;

const ExpLink = styled(Link)`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;
