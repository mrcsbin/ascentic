import styled from "styled-components";
import HEART from "../../../assets/mypage/heart.png";
import HEART_EMPTY from "../../../assets/mypage/heart_empty.png";
import TEST_ITEM_IMAGE from "../../../assets/storemain.webp";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../../utils/Cookies";

function WishItems({ item }) {
  const [isWish, setIsWish] = useState(true);

  const clickHandle = () => {
    if (getCookie("accessToken")) {
      axios
        .post(
          `http://localhost:8080/wish/set`,
          { prodNum: item.productNum },
          {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          }
        )
        .then(() => {
          setIsWish(!isWish);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <>
      <WishItemCard>
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
  console.log(wishList);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/wish/get", {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });
        setWishList(res.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, []);

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
`;

const IsNotItem = styled.div``;

const SetWishButton = styled.button``;
