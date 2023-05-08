import React, { useState, useEffect } from "react";
import all from "../../../assets/productCategory/category_all.webp";
import best from "../../../assets/productCategory/category_best.webp";
import body from "../../../assets/productCategory/category_body.webp";
import candle from "../../../assets/productCategory/category_candle.webp";
import diffuser from "../../../assets/productCategory/category_diffuser.png";
import fabric from "../../../assets/productCategory/category_fabric.webp";
import hand from "../../../assets/productCategory/category_hand.webp";
import perfume from "../../../assets/productCategory/category_perfume.webp";
import shampoo from "../../../assets/productCategory/category_shampoo.webp";

const FilterModal = (props) => {
  const { open, close, header } = props;

  const [sortOption, setSortOption] = useState("latest");
  const [prodcategory, setProdcategory] = useState("");

  const ProductCategories = () => {
    const productCategoryList = [
      {
        name: "all",
        text: "전체보기",
        image: all,
      },
      {
        name: "best",
        text: "베스트셀러",
        image: best,
      },
      {
        name: "perfume",
        text: "향수",
        image: perfume,
      },
      {
        name: "diffuser",
        text: "디퓨저",
        image: diffuser,
      },
      {
        name: "candle",
        text: "향초",
        image: candle,
      },
      {
        name: "hand",
        text: "핸드크림",
        image: hand,
      },
      {
        name: "shampoo",
        text: "샴푸",
        image: shampoo,
      },
      {
        name: "body",
        text: "핸드앤바디워시",
        image: body,
      },
      {
        name: "fabric",
        text: "섬유향수",
        image: fabric,
      },
    ];
    const [showOption, setShowOption] = useState(true);
    const clickProdcategory = (e) => {
      setProdcategory(e.target.value);
    };

    return (
      <div>
        <header>
          제품 카테고리
          {showOption === false ? (
            <button onClick={() => setShowOption(!showOption)}>+</button>
          ) : (
            <button onClick={() => setShowOption(!showOption)}>-</button>
          )}
        </header>
        {showOption === true ? (
          <div className="prodcategory">
            <ul>
              {productCategoryList.map((c) => (
                <li>
                  <button value={c.name} onClick={clickProdcategory}>
                    {/* 버튼focus - div에 value===prodcategory ? className변경 또는 style설정 */}
                    <div className="cateimg_prod">
                      <img src={c.image} alt=""></img>
                    </div>
                    {c.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };

  const SortOption = () => {
    const [showOption, setShowOption] = useState(true);
    const clickSortOption = (e) => {
      setSortOption(e.target.value);
    };
    return (
      <div>
        <header>
          정렬형식
          {showOption === false ? (
            <button onClick={() => setShowOption(!showOption)}>+</button>
          ) : (
            <button onClick={() => setShowOption(!showOption)}>-</button>
          )}
        </header>
        {showOption === true ? (
          <div className="sortoption">
            <ul>
              <li>
                <button value="latest" onClick={clickSortOption}>
                  신상품순
                </button>
              </li>
              <li>
                <button value="viewCount" onClick={clickSortOption}>
                  조회순
                </button>
              </li>
              <li>
                <button value="wishCount" onClick={clickSortOption}>
                  인기순
                </button>
              </li>
              <li>
                <button value="highPrice" onClick={clickSortOption}>
                  높은 가격순
                </button>
              </li>
              <li>
                <button value="lowPrice" onClick={clickSortOption}>
                  낮은 가격순
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  };
  const handleReset = () => {
    setSortOption("latest");
    setProdcategory("all");
  };

  const handleSave = () => {
    close(sortOption, prodcategory);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={handleSave}>
              &times;
            </button>
          </header>
          <main>
            <ProductCategories />
            <SortOption />
          </main>
          <button className="alldel" onClick={handleReset}>
            초기화
          </button>
          <button className="filterresult" onClick={handleSave}>
            결과
          </button>
        </section>
      ) : null}
    </div>
  );
};

export default FilterModal;
