import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveTab } from "../../../store/modules/mypage";

export const Withdrawal = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      dispatch(setActiveTab("회원탈퇴"));
    };
    fetchProfileData();
  }, [dispatch]);

  return (
    <Wrap>
      <ContentHeader>회원탈퇴</ContentHeader>
    </Wrap>
  );
};

const Wrap = styled.div``;

const ContentHeader = styled.div`
  padding: 0px 0px 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
`;
