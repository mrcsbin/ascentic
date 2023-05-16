import styled from "styled-components";
import HEART from "../../../assets/mypage/heart.png";
import HEART_EMPTY from "../../../assets/mypage/heart_empty.png";
import TEST_ITEM_IMAGE from "../../../assets/storemain.jpeg";
import { useState } from "react";

function WishItems() {
  const [like, setLike] = useState(true);

  return (
    <>
      <WishItemCard>
        <ImageBox>
          <WishItemImage src={TEST_ITEM_IMAGE} alt="상품 이미지" />
          <ButtonImage src={HEART} alt="좋아요 버튼" />
        </ImageBox>
        <NameBox>
          <WishItemName>향수01</WishItemName>
        </NameBox>
      </WishItemCard>
      <WishItemCard>
        <ImageBox>
          <WishItemImage src={TEST_ITEM_IMAGE} alt="상품 이미지" />
          <ButtonImage src={HEART} alt="좋아요 버튼" />
        </ImageBox>
        <NameBox>
          <WishItemName>향수02</WishItemName>
        </NameBox>
      </WishItemCard>
      <WishItemCard>
        <ImageBox>
          <WishItemImage src={TEST_ITEM_IMAGE} alt="상품 이미지" />
          <ButtonImage src={HEART} alt="좋아요 버튼" />
        </ImageBox>
        <NameBox>
          <WishItemName>향수03</WishItemName>
        </NameBox>
      </WishItemCard>
      <WishItemCard>
        <ImageBox>
          <WishItemImage src={TEST_ITEM_IMAGE} alt="상품 이미지" />
          <ButtonImage src={HEART} alt="좋아요 버튼" />
        </ImageBox>
        <NameBox>
          <WishItemName>향수04</WishItemName>
        </NameBox>
      </WishItemCard>
    </>
  );
}

export const WishList = () => {
  return (
    <WishListWrap>
      <ContentHeader>좋아요</ContentHeader>
      <WishItemsContents>
        <WishItems />
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
  justify-content: space-between;
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
