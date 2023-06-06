import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveTab } from "../../../store/modules/mypage";

export const Subscribe = () => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setActiveTab("구독 내역"));
  }, []);

  // if (isLoading) {
  //   return <div style={{ height: "100vh" }}></div>;
  // }

  return (
    <Wrap>
      <ContentHeader>구독 내역</ContentHeader>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 500px;
`;

const ContentHeader = styled.div`
  padding: 0px 0 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
`;
