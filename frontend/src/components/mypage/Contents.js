import styled from "styled-components";
import { useSelector } from "react-redux";
import { OrderList } from "./shopping/OrderList";
import { WishList } from "./shopping/WishList";
import { Subscribe } from "./shopping/Subscribe";
import { Update } from "./customerservice/Update";
import { Notification } from "./customerservice/Notification";
import { InquiryList } from "./customerservice/InquiryList";
// import { ReviewList } from "./shopping/ReviewList";

export const Content = () => {
  const activeTab = useSelector((state) => state.mypage.activeTab);

  return (
    <ContentArea>
      {activeTab === "주문" && <OrderList />}
      {/* {activeTab === "후기" && <ReviewList />} */}
      {activeTab === "좋아요" && <WishList />}
      {activeTab === "구독" && <Subscribe />}
      {activeTab === "회원정보수정" && <Update />}
      {activeTab === "알림 설정" && <Notification />}
      {activeTab === "1:1 문의 내역" && <InquiryList />}
    </ContentArea>
  );
};

const ContentArea = styled.div`
  box-sizing: border-box;
  padding: 30px 50px 50px 80px;
  width: 70%;
`;
