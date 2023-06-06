import styled from "styled-components";
import { Tab } from "../components/mypage/Tab";
import { useParams } from "react-router-dom";
import { Order } from "../components/mypage/shopping/Order";
import { ReviewList } from "../components/mypage/shopping/ReviewList";
import { WishList } from "../components/mypage/shopping/WishList";
import { Subscribe } from "../components/mypage/shopping/Subscribe";
import { Update } from "../components/mypage/customerservice/Update";
import { InquiryList } from "../components/mypage/customerservice/InquiryList";
import { Notification } from "../components/mypage/customerservice/Notification";
import { MyPageProfile } from "../components/mypage/MyPageProfile";

function MyPage() {
  const params = useParams();

  return (
    <MyPageWrap>
      <ContentWrap>
        <Tab />
        <ContentArea>
          {params.category === undefined && <MyPageProfile />}
          {params.category === "orderlist" && <Order />}
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
  padding-top: 250px;
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
