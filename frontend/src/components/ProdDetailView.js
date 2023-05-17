import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProdDetail.css";
import { getCookie } from "../utils/Cookies";

function ProdDetailView({ productData, productOption, isWish }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [onWish, setOnWish] = useState();
  const [prodOption, setProdOption] = useState();
  const [ProdInfoModal, setProdInfoModal] = useState(false);
  const [deliInfoModal, setDeliInfoModal] = useState(false);

  //이미지 배열 가져오기
  const [imgArr, setImgArr] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getProdImgDetailPage/${productData.prodNum}/1`
        );
        setImgArr(res.data);
        await axios
          .get(`/iswish?prodNum=${productData.prodNum}`, {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          })
          .then((response) => {
            if (response.data == 1) {
              setOnWish(true);
            } else {
              setOnWish(false);
            }
            console.log("onwish" + response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductData();
  }, []);

  //수량 설정
  function QuantButton(x) {
    if (x == "+") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  }

  // prodNum, 이름, 가격, 옵션 선택한거, 수량 총 5개 객체로 해서 넘기면 될듯

  // 주문창으로 이동
  const handleOrderClick = () => {
    const dataForOrder = {
      prodQuantity: quantity,
      prodOption: prodOption,
    };
    navigate(`/order`, { state: dataForOrder });
  };

  // 장바구니 페이지 이동
  const handleCartClick = () => {
    const dataForCart = {
      optionNum: prodOption.optionNum,
      prodCount: quantity,
    };

    console.log(dataForCart);

    axios
      .post("/cart/addv2", dataForCart, {
        headers: {
          Authorization: "Bearer " + getCookie("accessToken"),
        },
      })
      .then(() => {
        // navigate(`/cart`, { state: dataForCart });
      })
      .catch((error) => {});
  };

  // 찜하기 구현
  const handleWishClick = () => {
    if (onWish == true) {
      //찜했다 안했다 하기 위함
      axios
        .post(
          `/delwish`,
          { prodNum: productData.prodNum },
          {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          }
        ) // url별로 추가/삭제 백에서 처리
        .then(() => {
          setOnWish(!onWish);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      axios
        .post(
          `/addwish`,
          { prodNum: productData.prodNum },
          {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          }
        ) // url별로 추가/삭제 백에서 처리
        .then(() => {
          setOnWish(!onWish);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  //옵션 고르는 버튼(이미지로 표시해야되나?)
  const Optioncard = (options) => {
    // console.log('this is in OptionCard', options);
    //아니 여기서 왜 options.options 로 써야되는지 모르겠음
    const option = options.options.prodOption;

    return (
      <button
        className="prodOption"
        onClick={() => {
          setProdOption(
            options.options
            // console.log(options.options.optionNum)
          );
        }}
      >
        {option}
      </button>
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
        <div className="Img-scroll">
          {/* 이미지 여러장 출력 */}
          {imgArr.map((imgUrl, index) => {
            return (
              <img
                key={index}
                className="img-box"
                src={`http://localhost:8080/download?img=${imgUrl}`}
                alt="이미지 손상됨"
              />
            );
          })}

          {/* <img src={productData.imageUrl} alt={productData.name} /> */}
        </div>
        {/* 상세창 반 짤라서 윗부분 */}
        <div className="detail-section">
          {/* 이름,가격있는 부분 */}
          <div className="name-price">
            <p>{productData.prodCategory}</p>
            <div className="name">
              <h2>{productData.prodName}</h2>
              <button onClick={handleWishClick}>찜하기</button>
            </div>
            <div className="clear-both"></div>
            <span>{addComma(productData.prodPrice)}원</span>
          </div>
          <div className="clear-both"></div>
          {/* 향 설명 박스 */}
          <div className="scent-content">
            <p>{productData.scent.scentContent}</p>
          </div>
        </div>
        {/* 상세창 반 짤라서 아래부분 */}
        <div className="detail-section">
          {/* 옵션들 보여주기 */}
          <div>
            {productOption.map((options, index) => {
              return <Optioncard options={options} key={index} />;
            })}
            <div className="clear-both"></div>
          </div>
          {/* 수량, 구매하기 부분 */}
          <div className="detail-quantity">
            <p>수량</p>
            <div className="button">
              <button onClick={() => QuantButton("-")}> - </button>
              {/* to do : 화살표로 대체 */}
              {quantity}
              <button onClick={() => QuantButton("+")}> + </button>
            </div>
          </div>
          <div className="clear-both"></div>
          {/* 주문하기, 장바구니 박스 */}
          <div className="order-cart">
            <button onClick={handleOrderClick}>주문하기</button>
            <button onClick={handleCartClick}>장바구니</button>
          </div>
          <br />
          <hr />
          {/* 추가정보 박스 */}
          <div className="additional-content">
            <div className="prod-info-modal">
              제품 세부정보
              <button onClick={() => setProdInfoModal(!ProdInfoModal)}>
                +
              </button>
              {ProdInfoModal && (
                <div className="modal">
                  <div className="modal-content">
                    <p>{productData.prodInfo}</p>
                  </div>
                </div>
              )}
            </div>
            <br />
            <hr />
            <div className="prod-info-modal">
              배송 & 반품
              <button onClick={() => setDeliInfoModal(!deliInfoModal)}>
                +
              </button>
              {deliInfoModal && (
                <div className="modal">
                  <div className="modal-content">
                    <p>
                      3만원 이상 구매하실 경우 배송 비용은 무료입니다.
                      주문일로부터 1-2 영업일 이내 출고됩니다. 배송은 지역
                      택배사 사정에 따라 약간의 지연이 생길 수 있습니다. 배송이
                      시작되면 구매자에게는 이메일, 수령인에게는 카카오
                      알림톡으로 배송 정보를 전송해 드립니다.
                      CJ대한통운(https://www.cjlogistics.com) *상품 혹은
                      증정품의 포장(랩핑)을 개봉 및 훼손한 경우 반품이
                      불가합니다. *단순 변심 또는 주문 실수로 인한 교환이
                      불가합니다. 신중한 구매 부탁드립니다.
                    </p>
                  </div>
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
