import styled from "styled-components";
import { useSelector } from "react-redux";
import { OrderList } from "./shopping/OrderList";
import { Review } from "./shopping/Review";
import { WishList } from "./shopping/WishList";
import { Subscribe } from "./shopping/Subscribe";
import { Update } from "./Update";

export const Content = () => {
  const activeTab = useSelector((state) => state.mypage.activeTab);

  return (
    <ContentArea>
      {activeTab === "주문" && <OrderList />}
      {activeTab === "후기" && <Review />}
      {activeTab === "좋아요" && <WishList />}
      {activeTab === "구독" && <Subscribe />}
      {activeTab === "개인정보수정" && <Update />}
    </ContentArea>
  );
};

const ContentArea = styled.div`
  box-sizing: border-box;
  padding: 30px 50px 50px 80px;
  width: 70%;
`;
