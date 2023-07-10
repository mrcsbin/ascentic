import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/modules/mypage";
import { Link } from "react-router-dom";

export const Tab = () => {
  const dispatch = useDispatch();
  const clickedTab = useSelector((state) => state.mypage.activeTab);

  const tabClickHandle = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <TabArea>
      <TabBox>
        <StyledLink to="/mypage">
          <MyPage>마이 페이지</MyPage>
        </StyledLink>
        <TabHeader>나의 쇼핑</TabHeader>
        <TabList>
          <StyledLink to="/mypage/orderlist">
            <TabBody
              clicked={clickedTab === "주문 내역"}
              onClick={() => tabClickHandle("주문 내역")}
            >
              주문 내역
            </TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/mypage/reviewlist">
            <TabBody
              clicked={clickedTab === "리뷰 관리"}
              onClick={() => tabClickHandle("리뷰 관리")}
            >
              리뷰 관리
            </TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/mypage/wishlist">
            <TabBody
              clicked={clickedTab === "관심 상품"}
              onClick={() => tabClickHandle("관심 상품")}
            >
              관심 상품
            </TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/mypage/subscribe">
            <TabBody
              clicked={clickedTab === "구독 내역"}
              onClick={() => tabClickHandle("구독 내역")}
            >
              구독 내역
            </TabBody>
          </StyledLink>
        </TabList>
      </TabBox>
      <TabBox>
        <TabHeader>고객 서비스</TabHeader>
        <TabList>
          <StyledLink to="/mypage/password">
            <TabBody
              clicked={clickedTab === "비밀번호변경"}
              onClick={() => tabClickHandle("비밀번호변경")}
            >
              비밀번호변경
            </TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/mypage/alarm">
            <TabBody
              clicked={clickedTab === "알림 설정"}
              onClick={() => tabClickHandle("알림 설정")}
            >
              알림 설정
            </TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/community/notice">
            <TabBody>고객센터</TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/mypage/inquirylist">
            <TabBody
              clicked={clickedTab === "1:1 문의 내역"}
              onClick={() => tabClickHandle("1:1 문의 내역")}
            >
              1:1 문의 내역
            </TabBody>
          </StyledLink>
        </TabList>
        <TabList>
          <StyledLink to="/mypage/withdrawal">
            <TabBody
              clicked={clickedTab === "회원탈퇴"}
              onClick={() => tabClickHandle("회원탈퇴")}
            >
              회원탈퇴
            </TabBody>
          </StyledLink>
        </TabList>
      </TabBox>
    </TabArea>
  );
};

const TabArea = styled.div`
  box-sizing: border-box;
  width: 15%;
  height: 100%;
  position: fixed;
`;

const TabBox = styled.div`
  position: relative;
  font-size: 15px;
`;

const TabHeader = styled.div`
  margin-top: 4rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const TabList = styled.div`
  margin-top: 1.3rem;
  font-size: 1.2rem;
`;

const TabBody = styled.div`
  display: inline;
  font-weight: ${(props) => (props.clicked ? "900" : "400")};
  color: ${(props) => (props.clicked ? "black" : "grey")};
  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const MyPage = styled.div`
  display: inline-block;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
`;
