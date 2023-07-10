import styled from "styled-components";
import { Tab } from "../components/mypage/Tab";
import { useParams } from "react-router-dom";
import { Order } from "../components/mypage/shopping/Order";
import { Review } from "../components/mypage/shopping/Review";
import { Wish } from "../components/mypage/shopping/Wish";
import { Subscribe } from "../components/mypage/shopping/Subscribe";
import { PasswordUpdate } from "../components/mypage/customerservice/PasswordUpdate";
import { InquiryList } from "../components/mypage/customerservice/InquiryList";
import { Notification } from "../components/mypage/customerservice/Notification";
import { MyPageProfile } from "../components/mypage/MyPageProfile";
import { Withdrawal } from "../components/mypage/customerservice/Withdrawal";

function MyPage() {
  const params = useParams();

  return (
    <MyPageWrap>
      <ContentWrap>
        <Tab />
        <ContentArea>
          {params.category === undefined && <MyPageProfile />}
          {params.category === "orderlist" && <Order />}
          {params.category === "reviewlist" && <Review />}
          {params.category === "wishlist" && <Wish />}
          {params.category === "subscribe" && <Subscribe />}
          {params.category === "password" && <PasswordUpdate />}
          {params.category === "alarm" && <Notification />}
          {params.category === "inquirylist" && <InquiryList />}
          {params.category === "withdrawal" && <Withdrawal />}
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
  padding-top: 200px;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

const ContentArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-left: 18%;
  padding-bottom: 200px;
`;
