import React from "react";
import { NavLink } from "react-router-dom";
import all from "../../../assets/productCategory/category_all.webp";
import body from "../../../assets/productCategory/category_body.webp";
import candle from "../../../assets/productCategory/category_candle.webp";
import diffuser from "../../../assets/productCategory/category_diffuser.png";
import fabric from "../../../assets/productCategory/category_fabric.webp";
import hand from "../../../assets/productCategory/category_hand.webp";
import perfume from "../../../assets/productCategory/category_perfume.webp";
import shampoo from "../../../assets/productCategory/category_shampoo.webp";
import styled from "styled-components";

const productCategoryList = [
  {
    name: "all",
    text: "all",
    image: all,
  },
  {
    name: "향수",
    text: "향수",
    image: perfume,
  },
  {
    name: "디퓨저",
    text: "디퓨저",
    image: diffuser,
  },
  {
    name: "향초",
    text: "향초",
    image: candle,
  },
  {
    name: "핸드크림",
    text: "핸드크림",
    image: hand,
  },
  {
    name: "샴푸",
    text: "샴푸",
    image: shampoo,
  },
  {
    name: "바디워시",
    text: "바디워시",
    image: body,
  },
  {
    name: "섬유향수",
    text: "섬유향수",
    image: fabric,
  },
];

const StoreManageCategories = () => {
  return (
    <CategoriesContainer className="categories">
      <CategoriesBox className="categoriesbox">
        {productCategoryList.map((c) => (
          <CategoryLink
            className={({ isActive }) =>
              isActive ? "catebox-active" : "catebox"
            }
            key={c.name}
            to={"/admin/storemanagement/" + c.text}
          >
            <CategoryImgEffect className="cateimgEffect">
              <CategoryImgBox className="cateimgbox">
                <CategoryImg className="cateimg" src={c.image} alt="" />
              </CategoryImgBox>
            </CategoryImgEffect>
            {c.name}
          </CategoryLink>
        ))}
      </CategoriesBox>
    </CategoriesContainer>
  );
};

export default StoreManageCategories;

/* 카테고리 */
const CategoriesContainer = styled.div`
  width: 80vw;
  height: 150px;
  margin: 0 20%;
  padding: 0;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1352px) {
    overflow: scroll;
  }
`;

const CategoriesBox = styled.div`
  width: 1100px;
  margin: 0 auto;
`;

const CategoryLink = styled(NavLink)`
  display: block;
  padding: 0 10px;
  width: 90px;
  float: left;
  font-family: "Pretendard";
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.1;
  text-decoration: none;
  align-items: center;
  color: black;

  &:hover,
  &.catebox-active {
    font-weight: 600;
  }
`;

const CategoryImgEffect = styled.div`
  margin: 5px auto;
  width: 90px;
  height: 90px;
  border: solid white 1px;
  border-radius: 50%;

  ${CategoryLink}:hover &,
  ${CategoryLink}.catebox-active & {
    border: solid black 1px;
  }
`;

const CategoryImgBox = styled.div`
  margin: 5px;
  padding: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;

const CategoryImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;
