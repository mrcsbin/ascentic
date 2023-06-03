import styled from "styled-components";
import { Profile } from "../components/mypage/Profile";
import { Tab } from "../components/mypage/Tab";
import { Content } from "../components/mypage/Contents";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../store/modules/mypage";
import { useParams } from "react-router-dom";
import { OrderList } from "../components/mypage/shopping/OrderList";
import { ReviewList } from "../components/mypage/shopping/ReviewList";
import { WishList } from "../components/mypage/shopping/WishList";
import { Subscribe } from "../components/mypage/shopping/Subscribe";
import { Update } from "../components/mypage/customerservice/Update";
import { InquiryList } from "../components/mypage/customerservice/InquiryList";
import { Notification } from "../components/mypage/customerservice/Notification";

function MyPage() {
  const dispatch = useDispatch();
  const params = useParams();

  // useEffect(() => {
  //   const setDefaultTab = async () => {
  //     await dispatch(setActiveTab("주문"));
  //   };
  //   setDefaultTab();
  // }, []);

  return (
    <MyPageWrap>
      <Profile />
      <ContentWrap>
        <Tab />
        <ContentArea>
          {params.category === "orderlist" && <OrderList />}
          {params.category === "reviewlist" && <ReviewList />}
          {params.category === "wishlist" && <WishList />}
          {params.category === "subscribe" && <Subscribe />}
          {params.category === "update" && <Update />}
          {params.category === "alarm" && <Notification />}
          {params.category === "inquirylist" && <InquiryList />}
        </ContentArea>
      </ContentWrap>
    </MyPageWrap>
  );
}

export default MyPage;

const MyPageWrap = styled.div`
  width: 100%;
  margin: 0px auto;
  box-sizing: border-box;
  padding-top: 105px;
`;

const ContentWrap = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  box-sizing: border-box;
  padding: 30px 50px 50px 80px;
  width: 70%;
`;
