import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../store/modules/mypage";
import { useState } from "react";

export const Tab = () => {
  const dispatch = useDispatch();
  const [clickedDiv, setClickedDiv] = useState("주문");

  const tabClickHandle = async (tab) => {
    await dispatch(setActiveTab(tab));
    setClickedDiv(tab);
  };

  return (
    <TabArea>
      <TabBox>
        <TabHeader>나의 쇼핑</TabHeader>
        <TabList>
          <TabBody
            clicked={clickedDiv === "주문"}
            onClick={() => tabClickHandle("주문")}
          >
            주문 내역조회
          </TabBody>
        </TabList>
        <TabList>
          <TabBody
            clicked={clickedDiv === "후기"}
            onClick={() => tabClickHandle("후기")}
          >
            구매 후기
          </TabBody>
        </TabList>
        <TabList>
          <TabBody
            clicked={clickedDiv === "좋아요"}
            onClick={() => tabClickHandle("좋아요")}
          >
            좋아요
          </TabBody>
        </TabList>
        <TabList>
          <TabBody
            clicked={clickedDiv === "구독"}
            onClick={() => tabClickHandle("구독")}
          >
            구독
          </TabBody>
        </TabList>
      </TabBox>
      <TabBox>
        <TabHeader>커뮤니티</TabHeader>
        <TabList>
          <TabBody>주문 내역조회</TabBody>
        </TabList>
        <TabList>
          <TabBody>구매 후기</TabBody>
        </TabList>
        <TabList>
          <TabBody>찜 목록</TabBody>
        </TabList>
        <TabList>
          <TabBody>구독</TabBody>
        </TabList>
      </TabBox>
      <TabBox>
        <TabHeader>고객 서비스</TabHeader>
        <TabList>
          <TabBody
            clicked={clickedDiv === "회원정보수정"}
            onClick={() => tabClickHandle("회원정보수정")}
          >
            회원정보수정
          </TabBody>
        </TabList>
        <TabList>
          <TabBody
            clicked={clickedDiv === "알림 설정"}
            onClick={() => tabClickHandle("알림 설정")}
          >
            알림 설정
          </TabBody>
        </TabList>
        <TabList>
          <TabBody>고객센터</TabBody>
        </TabList>
        <TabList>
          <TabBody>1:1 문의 내역</TabBody>
        </TabList>
      </TabBox>
    </TabArea>
  );
};

const TabArea = styled.div`
  box-sizing: border-box;
  width: 15%;
  padding: 0 0 50px 70px;
`;

const TabBox = styled.div`
  position: relative;
  font-size: 15px;
`;

const TabHeader = styled.div`
  margin-top: 30px;
  font-size: 1.5rem;
`;

const TabList = styled.div`
  margin-top: 17px;
  font-size: 1rem;
  padding: 0 0 0 20px;
`;

const TabBody = styled.div`
  display: inline;
  font-weight: ${(props) => (props.clicked ? "900" : "400")};
  :hover {
    cursor: pointer;
    font-weight: 900;
  }
`;
