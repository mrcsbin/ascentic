import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveTab } from "../../../store/modules/mypage";

export const Subscribe = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("구독 내역"));
  }, []);

  return (
    <Wrap>
      <ContentHeader>구독내역</ContentHeader>
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
