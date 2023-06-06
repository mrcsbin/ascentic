import styled from "styled-components";
import HEART from "../../../assets/mypage/heart.png";
import HEART_EMPTY from "../../../assets/mypage/heart_empty.png";
import { useState, useEffect } from "react";
import { getCookie } from "../../../utils/Cookies";
import { getWishList, setWish } from "../../../api/WishApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await getWishList(getCookie("accessToken"));
      setWishList(response.data);
      await dispatch(setActiveTab("관심 상품"));
      setIsLoading(false);
    };
    fetchProductData();
  }, []);

  if (isLoading) {
    return <div style={{ height: "100vh" }}></div>;
  }

  return (
    <WishListWrap>
      <ContentHeader>관심 상품</ContentHeader>
      {wishList.length === 0 ? (
        <IsNotItemBox>관심 상품이 없습니다.</IsNotItemBox>
      ) : (
        <WishItemsContents>
          {wishList.map((item, index) => (
            <WishItems item={item} key={index} />
          ))}
        </WishItemsContents>
      )}
    </WishListWrap>
  );
};

const WishListWrap = styled.div``;

const ContentHeader = styled.div`
  padding: 0px 0px 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
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
  :hover {
    transform: scale(1.1);
  }
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
    transform: scale(1.3);
  }
  z-index: 9999;
`;

const IsNotItemBox = styled.div`
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

const IsNotItem = styled.div`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;

const SetWishButton = styled.button``;
