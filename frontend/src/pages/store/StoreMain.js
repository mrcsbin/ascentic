import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/StoreMain.css";
import CardList from "../../components/common/storemain/CardList";
import Categories from "../../components/common/storemain/Categories";
import FilterModal from "../../components/common/storemain/FilterModal";

function StoreMain() {
  const [products, setProducts] = useState([]);
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
  const closeModal = ({ sortOption }, { prodcategory }) => {
    setSortOption(sortOption);
    setProdcategory(prodcategory);
    setModalOpen(false);
  };

  function productCategory(products, prodcategory) {
    if (prodcategory === "all") {
      return;
    } else if (prodcategory === "best") {
      products.sort((a, b) => {
        return b.prod_wish - a.prod_wish;
      });
      products.slice(0, 12);
    } else {
      setProducts(products.filter((p) => p.prod_category === prodcategory));
    }
  }

  function sortByOption(products, sortOption) {
    if (sortOption == "wishCount") {
      products.sort((a, b) => {
        return b.prod_wish - a.prod_wish;
      });
    } else if (sortOption == "latest") {
      products.sort((a, b) => {
        return b.prod_num - a.prod_num;
      });
    } else if (sortOption == "highPrice") {
      products.sort((a, b) => {
        return b.prod_price - a.prod_price;
      });
    } else if (sortOption == "lowPrice") {
      products.sort((a, b) => {
        return a.prod_price - b.prod_price;
      });
    } else if (sortOption == "viewCount") {
      products.sort((a, b) => {
        return b.prod_vCount - a.prod_vCount;
      });
    } else return;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/list?category=${category}`
        );
        setProducts(res.data);
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
    <Loading />;
    return <Loading isLoading={loading} />;
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
        <img src="" alt="" />
      </div>
      <div className="infobox">소개글</div>
      <Categories />
      <div>
        <button onClick={openModal} className="filter">
          필터
        </button>
        <FilterModal open={modalOpen} close={closeModal} header="필터" />
      </div>
      {productCategory(products, prodcategory)}
      <div className="prodnum">{products.length} 제품</div>
      {sortByOption(products, sortOption)}
      <CardList products={products} />
    </div>
  );
}

export default StoreMain;
