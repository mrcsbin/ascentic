import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/StoreMain.css";
import CardList from "../../components/common/storemain/CardList";
import Categories from "../../components/common/storemain/Categories";
import FilterModal from "../../components/common/storemain/FilterModal";
import mainimg from "../../assets/storemain.jpeg";
import mainvideo from "../../assets/storemain.mp4";

function StoreMain() {
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState(products);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  const category = params.category || "all";

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
    sortByOption(productList, sortOption);
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
    if (sortOption == "wishCount") {
      productList.sort((a, b) => {
        return b.prodWishCount - a.prodWishCount;
      });
    } else if (sortOption == "latest") {
      productList.sort((a, b) => {
        return b.prodNum - a.prodNum;
      });
    } else if (sortOption == "highPrice") {
      productList.sort((a, b) => {
        return b.prodPrice - a.prodPrice;
      });
    } else if (sortOption == "lowPrice") {
      productList.sort((a, b) => {
        return a.prodPrice - b.prodPrice;
      });
    } else if (sortOption == "viewCount") {
      productList.sort((a, b) => {
        return b.prodReadCount - a.prodReadCount;
      });
    } else return;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/listscent?category=${category}`);
        setProducts(res.data);
        setProductList(res.data);
        //console.log(products);
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
    <div>
      <div className="imagebox">
        <img src={mainimg} alt="" />
        {/* <video loop autoPlay muted>
          <source src={mainvideo} type="video/mp4" />
        </video> */}
      </div>
      <div className="infobox">소개글</div>
      <Categories />
      <div>
        <button onClick={openModal} className="filter">
          필터
        </button>
        <FilterModal
          open={modalOpen}
          close={closeModal}
          onModalData={handleModalData}
          header="필터"
          getSortOption={sortOption}
          getProdcategory={prodcategory}
        />
      </div>
      <div className="prodnum">{productList.length} 제품</div>
      <CardList products={productList} />
    </div>
  );
}

export default StoreMain;
