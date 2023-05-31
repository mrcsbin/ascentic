import styled from "styled-components";
import HEART from "../../../assets/mypage/heart.png";
import HEART_EMPTY from "../../../assets/mypage/heart_empty.png";
import { useState, useEffect } from "react";
import { getCookie } from "../../../utils/Cookies";
import { getWishList, setWish } from "../../../api/WishApi";
import { useNavigate } from "react-router-dom";

function WishItems({ item }) {
  const [isWish, setIsWish] = useState(true);
  const navigate = useNavigate();

  const clickHandle = (e) => {
    e.stopPropagation();
    if (getCookie("accessToken")) {
      setWish(getCookie("accessToken"), item.productNum).then(() => {
        setIsWish(!isWish);
      });
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <>
      <WishItemCard
        onClick={() => navigate(`/store/productdetail/${item.productNum}`)}
      >
        <ImageBox>
          <WishItemImage
            src={`http://localhost:8080/images/${item.productImage}`}
            alt="상품 이미지"
          />
          <SetWishButton onClick={clickHandle}>
            <ButtonImage src={isWish ? HEART : HEART_EMPTY} alt="좋아요 버튼" />
          </SetWishButton>
        </ImageBox>
        <NameBox>
          <WishItemName>{item.productName}</WishItemName>
        </NameBox>
      </WishItemCard>
    </>
  );
}

export const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await getWishList(getCookie("accessToken"));
      setWishList(response.data);
      setIsLoading(false);
    };
    fetchProductData();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <WishListWrap>
      <ContentHeader>좋아요</ContentHeader>
      <WishItemsContents>
        {wishList.length === 0 ? (
          <IsNotItem>좋아요 목록이 없습니다.</IsNotItem>
        ) : (
          wishList.map((item, index) => <WishItems item={item} key={index} />)
        )}
      </WishItemsContents>
    </WishListWrap>
  );
};

const WishListWrap = styled.div`
  border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const WishItemsContents = styled.div`
  margin: 40px auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

const WishItemCard = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  width: 33.33333%;
`;

const ImageBox = styled.div`
  position: relative;
  display: block;
  padding-bottom: 100%;
  overflow: hidden;
`;

const WishItemImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const NameBox = styled.div`
  margin-top: 20px;
`;

const WishItemName = styled.div``;

const ButtonImage = styled.img`
  width: 30px;
  height: 30px;
  right: 3%;
  bottom: 3%;
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  z-index: 9999;
`;

const IsNotItem = styled.div``;

const SetWishButton = styled.button``;
