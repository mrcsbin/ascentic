import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/StoreMain.css";
import CardList from "../../components/common/storemain/CardList";
import Categories from "../../components/common/storemain/Categories";
import FilterModal from "../../components/common/storemain/FilterModal";
import mainimg from "../../assets/storemain.webp";
import filterimg from "../../assets/filter.png";
import logo from "../../assets/ascentic_logo_b.svg";
import video from "../../assets/storeMain/2.webm";
import all2 from "../../assets/storeMain/storemain_all2.mp4";
import animal from "../../assets/storeMain/storemain_animal.mp4";
import citrus from "../../assets/storeMain/storemain_citrus.mp4";
import floral2 from "../../assets/storeMain/storemain_floral2.mp4";
import fruity from "../../assets/storeMain/storemain_fruity2.mp4";
import green from "../../assets/storeMain/storemain_green.mp4";
import mossy from "../../assets/storeMain/storemain_mossy.mp4";
import special from "../../assets/storeMain/storemain_special2.mp4";
import watery from "../../assets/storeMain/storemain_watery.mp4";
import woody from "../../assets/storeMain/storemain_woody.mp4";

function StoreMain() {
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState(products);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  const category = params.category || "all";
  const encodecategory = escape(category);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOption, setSortOption] = useState("latest");
  const [prodcategory, setProdcategory] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModalData = (sortOption, prodcategory) => {
    setSortOption(sortOption);
    setProdcategory(prodcategory);
    productCategory(products, prodcategory);
  };

  function productCategory(products, prodcategory) {
    if (prodcategory === "all") {
      setProductList(products);
      return;
    } else if (prodcategory === "best") {
      products.sort((a, b) => {
        return b.prodWishCount - a.prodWishCount;
      });
      setProductList(products);
      productList.slice(0, 12);
    } else {
      setProductList(products.filter((p) => p.prodCategory === prodcategory));
      return;
    }
  }

  function sortByOption(productList, sortOption) {
    if (sortOption === "wishCount") {
      productList.sort((a, b) => {
        return b.prodWishCount - a.prodWishCount;
      });
    } else if (sortOption === "latest") {
      productList.sort((a, b) => {
        return b.prodNum - a.prodNum;
      });
    } else if (sortOption === "highPrice") {
      productList.sort((a, b) => {
        return b.prodPrice - a.prodPrice;
      });
    } else if (sortOption === "lowPrice") {
      productList.sort((a, b) => {
        return a.prodPrice - b.prodPrice;
      });
    } else if (sortOption === "viewCount") {
      productList.sort((a, b) => {
        return b.prodReadCount - a.prodReadCount;
      });
    } else return;
  }

  const infotext =
    "에이센틱과 함께 당신을 나타내는 향으로 일상을 가득 채워보세요.";
  const infotext2 =
    "기분, 날씨, 계절에 맞는 향의 변화에 따라 현재의 당신을 온전히 드러낼 수 있는 리듬을 부여합니다.";
  const infotext3 =
    "에이센틱 스토어에서 향과 함께 순간의 의미를 찾는 즐거움을 경험해보세요.";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/listscent?category=${encodecategory}`
        );
        setProducts(res.data);
        productCategory(res.data, prodcategory);
        setCurrentPage(1);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [category]);

  // 대기 중일 때
  if (loading) {
    // return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!products) {
    return null;
  }

  //productlist 필터 모달값 기본 적용 (전체 카테고리, 최신순 정렬)
  // 값이 유효할 때
  return (
    <div style={{ paddingBottom: "107px" }}>
      <div className="imagebox">
        {category === "all" && (
          <video className="topVideo" loop autoPlay muted>
            <source src={all2} type="video/mp4" />
          </video>
        )}
        {category === "Animal" && (
          <video className="midVideo" loop autoPlay muted>
            <source src={animal} type="video/mp4" />
          </video>
        )}
        {category === "Watery&Powdery" && (
          <video className="midVideo" loop autoPlay muted>
            <source src={watery} type="video/webm" />
          </video>
        )}
        {category === "Woody" && (
          <video className="topVideo" loop autoPlay muted>
            <source src={woody} type="video/webm" />
          </video>
        )}
        {category === "Mossy" && (
          <video className="midVideo" loop autoPlay muted>
            <source src={mossy} type="video/webm" />
          </video>
        )}
        {category === "Herbal&Green" && (
          <video className="midVideo" loop autoPlay muted>
            <source src={green} type="video/webm" />
          </video>
        )}
        {category === "Floral" && (
          <video className="topVideo" loop autoPlay muted>
            <source src={floral2} type="video/webm" />
          </video>
        )}
        {category === "Citrus" && (
          <video className="midVideo" loop autoPlay muted>
            <source src={citrus} type="video/webm" />
          </video>
        )}
        {category === "Fruity" && (
          <video className="topVideo" loop autoPlay muted>
            <source src={fruity} type="video/webm" />
          </video>
        )}
        {category === "Special" && (
          <video className="midVideo" loop autoPlay muted>
            <source src={special} type="video/webm" />
          </video>
        )}
      </div>
      <div className="infobox">
        <img src={logo} alt="ascentic_logo" />
        <span>{infotext}</span>
        <span>{infotext2}</span>
        <span>{infotext3}</span>
      </div>
      <Categories />
      <div className="buttonBox">
        <button onClick={openModal} className="filter">
          <img className="filterimg" src={filterimg} alt="" />
          필터
        </button>
        <div className="prodnum">{productList.length} 제품</div>
      </div>
      <FilterModal
        open={modalOpen}
        close={closeModal}
        onModalData={handleModalData}
        header="필터"
        getSortOption={sortOption}
        getProdcategory={prodcategory}
      />
      {sortByOption(productList, sortOption)}
      <CardList
        products={productList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default StoreMain;
