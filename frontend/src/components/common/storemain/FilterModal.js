import React, { useState, useEffect } from "react";
import "../../../styles/StoreMain.css";
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
  const { open, close, header, onModalData, getSortOption, getProdcategory } =
    props;

  const [sortOption, setSortOption] = useState(getSortOption);
  const [prodcategory, setProdcategory] = useState(getProdcategory);

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
        text: "바디워시",
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
      setProdcategory(e.currentTarget.value);
    };

    return (
      <div>
        <header>
          제품 카테고리
          {showOption === false ? (
            <button onClick={() => setShowOption(true)}>+</button>
          ) : (
            <button onClick={() => setShowOption(false)}>-</button>
          )}
        </header>
        {showOption === true ? (
          <div className="prodcategory">
            <ul>
              {productCategoryList.map((c) => (
                <li key={c.name}>
                  <button
                    value={c.name}
                    style={{
                      borderColor: prodcategory == c.name ? "black" : "",
                    }}
                    onClick={clickProdcategory}
                  >
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
    const sortOptionList = [
      {
        name: "latest",
        text: "신상품순",
      },
      {
        name: "viewCount",
        text: "조회순",
      },
      {
        name: "wishCount",
        text: "인기순",
      },
      {
        name: "highPrice",
        text: "높은 가격순",
      },
      {
        name: "lowPrice",
        text: "낮은 가격순",
      },
    ];

    const [showOption, setShowOption] = useState(true);
    const clickSortOption = (e) => {
      setSortOption(e.target.value);
    };
    return (
      <div>
        <header>
          정렬형식
          {showOption === false ? (
            <button onClick={() => setShowOption(true)}>+</button>
          ) : (
            <button onClick={() => setShowOption(false)}>-</button>
          )}
        </header>
        {showOption === true ? (
          <div className="sortoption">
            <ul>
              {sortOptionList.map((s) => (
                <li key={s.name}>
                  <button
                    value={s.name}
                    style={{
                      color: sortOption == s.name ? "white" : "",
                      backgroundColor: sortOption == s.name ? "black" : "",
                    }}
                    onClick={clickSortOption}
                  >
                    {s.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };
  const handleReset = () => {
    setSortOption(getSortOption);
    setProdcategory(getProdcategory);
  };
  const handleSubmit = () => {
    onModalData(sortOption, prodcategory);
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <ProductCategories />
            <SortOption />
          </main>
          <footer>
            <button className="alldel" onClick={handleReset}>
              초기화
            </button>
            <button className="filterresult" onClick={handleSubmit}>
              결과
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default FilterModal;
