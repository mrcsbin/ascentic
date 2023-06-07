import styled from "styled-components";
import { ReviewItem } from "./ReviewItem";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";
import { getOrderReviewList } from "../../../api/OrderProduct";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";

export const Review = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("전체");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      await getOrderReviewList(getCookie("accessToken")).then((response) => {
        setReviewList(
          response
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .filter((item) => item.orderProductReviewState !== "리뷰 삭제")
        );
        setFilteredList(
          response
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .filter((item) => item.orderProductReviewState !== "리뷰 삭제")
        );
      });
      dispatch(setActiveTab("리뷰 관리"));
      setIsLoading(false);
    };
    fetchProductData();
  }, [dispatch]);

  if (isLoading) {
    return <div style={{ height: "100vh" }}></div>;
  }

  return (
    <ReviewListWrap>
      <ContentBar>
        <ContentHeader>리뷰 관리</ContentHeader>
        {reviewList.length !== 0 && (
          <FilterBox>
            <Filter
              isFilter={filter === "전체"}
              onClick={() => {
                setFilter("전체");
                setFilteredList(reviewList);
              }}
            >
              전체
            </Filter>
            <Filter
              isFilter={filter === "리뷰 작성"}
              onClick={() => {
                setFilter("리뷰 작성");
                setFilteredList(
                  reviewList.filter(
                    (review) => review.orderProductReviewState === "리뷰 작성"
                  )
                );
              }}
            >
              리뷰 작성
            </Filter>
            <Filter
              isFilter={filter === "작성한 리뷰"}
              onClick={() => {
                setFilter("작성한 리뷰");
                setFilteredList(
                  reviewList.filter(
                    (review) =>
                      review.orderProductReviewState === "리뷰 작성 완료"
                  )
                );
              }}
            >
              작성한 리뷰
            </Filter>
          </FilterBox>
        )}
      </ContentBar>
      {filteredList.length === 0 ? (
        <IsNotItem>
          {filter === "작성한 리뷰" && "작성한 리뷰가 없습니다."}
          {filter === "리뷰 작성" && "작성 가능한 리뷰가 없습니다."}
          {filter === "전체" && "구매 이력이 없습니다."}
        </IsNotItem>
      ) : (
        <>
          <ItemInfoBox>
            <ItemBigBox>
              <ItemName>상품 정보</ItemName>
            </ItemBigBox>
            <ItemSmallBox>
              <OrderDate>주문 일자</OrderDate>
            </ItemSmallBox>
            <ItemSmallBox>
              <OrderAmount>주문금액 (수량)</OrderAmount>
            </ItemSmallBox>
            <ItemSmallBox>
              <OrderState></OrderState>
            </ItemSmallBox>
          </ItemInfoBox>
          {filteredList.map((item, index) => (
            <ReviewItem
              item={item}
              key={index}
              isComplete={item.orderProductReviewState === "리뷰 작성 완료"}
            />
          ))}
        </>
      )}
    </ReviewListWrap>
  );
};

const ReviewListWrap = styled.div`
  height: 500px;
`;

const ContentBar = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
`;

const ContentHeader = styled.div`
  padding: 0px 0px 20px;
  font-size: 1.8rem;
  font-weight: 700;
`;

const FilterBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Filter = styled.div`
  border: ${(props) => (props.isFilter ? "2px solid black" : "1px solid grey")};
  padding: 10px 11px;
  width: 80px;
  border-radius: 10px;
  text-align: center;
  margin-right: 11px;
  cursor: pointer;
  font-weight: ${(props) => props.isFilter && "bold"};
`;

const ItemInfoBox = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid grey;
`;

const ItemBigBox = styled.div`
  width: 40%;
`;

const ItemName = styled.div`
  text-align: center;
`;

const ItemSmallBox = styled.div`
  width: 20%;
`;

const OrderDate = styled.div`
  text-align: center;
`;

const OrderAmount = styled.div`
  text-align: center;
`;

const OrderState = styled.div`
  text-align: center;
`;

const IsNotItem = styled.div`
  height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
`;
