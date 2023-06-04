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
      {/* <TabBox>
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
      </TabBox> */}
      <TabBox>
        <TabHeader>고객 서비스</TabHeader>
        <TabList>
          <StyledLink to="/mypage/update">
            <TabBody
              clicked={clickedTab === "회원정보수정"}
              onClick={() => tabClickHandle("회원정보수정")}
            >
              회원정보수정
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
          <TabBody>고객센터</TabBody>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
