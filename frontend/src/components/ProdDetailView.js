import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProdDetail.css";
import { getCookie } from "../utils/Cookies";
import wish from "../assets/wish_icon.svg";
import unwish from "../assets/unwish_icon.svg";
import uptri from "../assets/up_triangle.svg";

function ProdDetailView({ productData }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [prodOption, setProdOption] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodOptionNum, setProdOptionNum] = useState(0);
  const [isWish, setIsWish] = useState(productData.wish);

  const [ProdInfoModal, setProdInfoModal] = useState(false);
  const [deliInfoModal, setDeliInfoModal] = useState(false);

  useEffect(() => {
    // 판매중인 상품을 초기값으로 set
    const saleOption = productData.prodOptions.find(
      (option) => option.optionState === "판매중"
    );

    if (saleOption) {
      setProdOption(saleOption.prodOption);
      setProdPrice(saleOption.prodPrice);
      setProdOptionNum(saleOption.prodOptionNum);
    }
  }, [productData.prodOptions]);

  //수량 설정
  function QuantButton(x) {
    if (x === "+") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  }

  // 장바구니 페이지 이동
  const handleCartClick = () => {
    const dataForCart = {
      optionName: prodOption,
      prodCount: quantity,
      optionNum: prodOptionNum,
    };

    console.log(dataForCart);

    if (getCookie("accessToken")) {
      axios
        .post("http://localhost:8080/cart/add", dataForCart, {
          headers: {
            Authorization: "Bearer " + getCookie("accessToken"),
          },
        })
        .then(() => {
          if (
            window.confirm("카트에 상품이 담겼습니다. 카트로 이동하시겠습니까?")
          ) {
            navigate(`/cart`, { state: dataForCart });
          }
        })
        .catch((error) => {});
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const handleWishClick = () => {
    if (getCookie("accessToken")) {
      axios
        .post(
          `http://localhost:8080/wish/set`,
          { prodNum: productData.prodNum },
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

  const OptionCard = ({ options, index }) => {
    return (
      <>
        {productData.prodOptions[index].optionState === "판매중" ? (
          <button
            className={
              prodOption === options ? "prodOptionBtn-active" : "prodOptionBtn"
            }
            onClick={() => {
              console.log("Gg");
              console.log(options);
              console.log(productData.prodOptions[index].prodPrice);
              console.log(productData.prodOptions[index].prodOptionNum);
              setProdOption(options);
              setProdPrice(productData.prodOptions[index].prodPrice);
              setProdOptionNum(productData.prodOptions[index].prodOptionNum);
            }}
          >
            {options}
          </button>
        ) : (
          <button className="prodOptionSoldOutBtn" disabled>
            {options} 품절
          </button>
        )}
      </>
    );
  };

  //가격에 쉼표 넣기
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  //실제 화면
  return (
    <div className="Wrapper-all">
      {/* 전체 박스 */}
      {/* 이미지와 상세설명등만 담는 박스 */}
      <div className="img-and-content">
        {/* 이미지 박스 */}
        <div className="Imgscroll">
          {/* 이미지 여러장 출력 */}
          {productData.prodImage.map((imgUrl, index) => {
            return (
              <div className="img-box" key={index}>
                <img
                  key={index}
                  className="img-box"
                  src={`http://localhost:8080/images/${imgUrl}`}
                  alt="이미지 손상됨"
                />
              </div>
            );
          })}
          {/* <img src={productData.imageUrl} alt={productData.name} /> */}
        </div>
        {/* 상세창 */}
        <div className="detail-section">
          {/* 이름,가격있는 부분 */}
          <div className="name-price">
            <p>{productData.prodCategory}</p>
            <div className="name">
              <h2>{productData.prodName}</h2>
              <div className="wishbtn" onClick={handleWishClick}>
                {isWish ? (
                  <img src={wish} alt="wish_icon" />
                ) : (
                  <img src={unwish} alt="unwish_icon" />
                )}
              </div>
            </div>
            <div className="price">{addComma(prodPrice)}원</div>
          </div>
          {/* 설명 박스 */}
          <div className="prodinfobox">{productData.prodInfo}</div>
          <div className="scent-content">
            <div className="scentname">
              {productData.scent.scentNoteName} | {productData.scent.scentName}
            </div>
            <div className="scentinfo">{productData.scent.scentContent}</div>
          </div>
          {/* 옵션 버튼 */}
          <div className="optionwrapper">
            <p>옵션</p>
            <div className="optionbox">
              {Object.keys(productData.prodOptions).map((options, index) => {
                return (
                  <OptionCard
                    options={productData.prodOptions[options].prodOption}
                    key={index}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
          {/* 수량, 최종가격 */}
          <div className="detail-quantity">
            <p>수량</p>
            <div className="quantitybox">
              <div className="quantitybtn" onClick={() => QuantButton("-")}>
                <img className="down" src={uptri} alt="quantity_down_btn" />
              </div>
              <div className="quantity">{quantity}</div>
              <div className="quantitybtn" onClick={() => QuantButton("+")}>
                <img src={uptri} alt="quantity_up_btn" />
              </div>
            </div>
          </div>
          <div className="finalPrice">
            <p>최종 가격</p>
            <div className="fprice">{addComma(quantity * prodPrice)}원</div>
          </div>
          {/* 구매하기, 장바구니 박스 */}
          <div className="order-cart">
            <button className="cartbtn" onClick={handleCartClick}>
              장바구니 담기
            </button>
          </div>
          {/* 추가정보 박스 */}
          <div className="additional-content">
            <div className="prod-info-modal">
              <div className="modalname">
                제품 세부정보
                {ProdInfoModal === false ? (
                  <button onClick={() => setProdInfoModal(true)}>+</button>
                ) : (
                  <button onClick={() => setProdInfoModal(false)}>-</button>
                )}
              </div>
              {ProdInfoModal && (
                <div className="modal-content">
                  <p>{productData.prodInfo}</p>
                </div>
              )}
            </div>
            <div className="prod-info-modal">
              <div className="modalname">
                배송 & 반품
                {deliInfoModal === false ? (
                  <button onClick={() => setDeliInfoModal(true)}>+</button>
                ) : (
                  <button onClick={() => setDeliInfoModal(false)}>-</button>
                )}
              </div>
              {deliInfoModal && (
                <div className="modal-content">
                  <p>3만원 이상 구매하실 경우 배송 비용은 무료입니다. </p>
                  <p>
                    주문일로부터 1-2 영업일 이내 출고됩니다. 배송은 지역 택배사
                    사정에 따라 약간의 지연이 생길 수 있습니다. 배송이 시작되면
                    구매자에게는 이메일, 수령인에게는 카카오 알림톡으로 배송
                    정보를 전송해 드립니다.
                    CJ대한통운(https://www.cjlogistics.com){" "}
                  </p>
                  <p>
                    * 상품 혹은 증정품의 포장(랩핑)을 개봉 및 훼손한 경우 반품이
                    불가합니다.
                  </p>
                  <p>
                    * 단순 변심 또는 주문 실수로 인한 교환이 불가합니다. 신중한
                    구매 부탁드립니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdDetailView;
