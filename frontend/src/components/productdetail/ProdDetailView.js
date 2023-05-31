import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProdDetail.css";
import { getCookie } from "../../utils/Cookies";
import wish from "../../assets/wish_icon.svg";
import unwish from "../../assets/unwish_icon.svg";
import uptri from "../../assets/up_triangle.svg";
import styled from "styled-components";
import Carousel from "./Carousel";
import ProductReview from "./ProductReview";
import { setWish } from "../../api/WishApi";
import { addCart } from "../../api/CartApi";

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

  function QuantButton(x) {
    if (x === "+") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  }

  const handleCartClick = async () => {
    const cartData = {
      productOptionName: prodOption,
      productCount: quantity,
      productOptionNum: prodOptionNum,
    };

    if (getCookie("accessToken")) {
      await addCart(getCookie("accessToken"), cartData).then(() => {
        if (
          window.confirm("카트에 상품이 담겼습니다. 카트로 이동하시겠습니까?")
        ) {
          navigate(`/cart`, { state: cartData });
        }
      });
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const handleWishClick = () => {
    if (getCookie("accessToken")) {
      setWish(getCookie("accessToken"), productData.prodNum).then(() => {
        setIsWish(!isWish);
      });
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const OptionCard = ({ options, index }) => {
    return (
      <>
        {productData.prodOptions[index].optionState === "판매중" ? (
          <OptionButton
            isSelected={options === prodOption}
            className={
              prodOption === options ? "prodOptionBtn-active" : "prodOptionBtn"
            }
            onClick={() => {
              setProdOption(options);
              setProdPrice(productData.prodOptions[index].prodPrice);
              setProdOptionNum(productData.prodOptions[index].prodOptionNum);
            }}
          >
            {options}
          </OptionButton>
        ) : (
          <SoldOutButton className="prodOptionSoldOutBtn">
            {options} 품절
          </SoldOutButton>
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
    <>
      <Wrap className="Wrapper-all">
        <Container className="img-and-content">
          <LeftContainer className="Imgscroll">
            {productData.prodImage.map((imgUrl, index) => {
              return (
                <ProductImageBox className="img-box" key={index}>
                  <ProductImage
                    key={index}
                    className="img-box"
                    src={`http://localhost:8080/images/${imgUrl}`}
                    alt="이미지 손상됨"
                  />
                </ProductImageBox>
              );
            })}
          </LeftContainer>
          <RightContainer>
            <SideBar className="detail-section">
              <NameCategoryPriceBox className="name-price">
                <ProductCategory>{productData.prodCategory}</ProductCategory>
                <ProductNameBox className="name">
                  <ProductName>{productData.prodName}</ProductName>
                  <WishBox className="wishbtn" onClick={handleWishClick}>
                    {isWish ? (
                      <Wish src={wish} alt="wish_icon" />
                    ) : (
                      <Wish src={unwish} alt="unwish_icon" />
                    )}
                  </WishBox>
                </ProductNameBox>
                <ProductPrice className="price">
                  {addComma(prodPrice)}원
                </ProductPrice>
              </NameCategoryPriceBox>
              <ProduceInfo className="prodinfobox">
                {productData.prodInfo}
              </ProduceInfo>
              <ScentBox className="scent-content">
                <ScentName className="scentname">
                  {productData.scent.scentNoteName} |&nbsp;
                  {productData.scent.scentName}
                </ScentName>
                <ScentInfo className="scentinfo">
                  {productData.scent.scentContent}
                </ScentInfo>
              </ScentBox>
              <OptionWrapper className="optionwrapper">
                <p>옵션</p>
                <OptionBox className="optionbox">
                  {Object.keys(productData.prodOptions).map(
                    (options, index) => {
                      return (
                        <OptionCard
                          options={productData.prodOptions[options].prodOption}
                          key={index}
                          index={index}
                        />
                      );
                    }
                  )}
                </OptionBox>
              </OptionWrapper>
              <QuantityWrapper className="detail-quantity">
                <p>수량</p>
                <QuantityBox className="quantitybox">
                  <QuantityButton
                    className="quantitybtn"
                    onClick={() => QuantButton("-")}
                  >
                    <QuantityDownButtonImage
                      className="down"
                      src={uptri}
                      alt="quantity_down_btn"
                    />
                  </QuantityButton>
                  <Quantity className="quantity">{quantity}</Quantity>
                  <QuantityButton
                    className="quantitybtn"
                    onClick={() => QuantButton("+")}
                  >
                    <QuantityUpButtonImage src={uptri} alt="quantity_up_btn" />
                  </QuantityButton>
                </QuantityBox>
              </QuantityWrapper>
              <AmountBox className="finalPrice">
                <p>최종 가격</p>
                <Amount className="fprice">
                  {addComma(quantity * prodPrice)}원
                </Amount>
              </AmountBox>
              <OrderCartBox className="order-cart">
                <OrderCartButton className="cartbtn" onClick={handleCartClick}>
                  장바구니 담기
                </OrderCartButton>
              </OrderCartBox>
              <AdditionalWrapper className="additional-content">
                <AdditionalModal className="prod-info-modal">
                  <ModalName className="modalname">
                    제품 세부정보
                    {ProdInfoModal === false ? (
                      <ShowAndHideButton onClick={() => setProdInfoModal(true)}>
                        +
                      </ShowAndHideButton>
                    ) : (
                      <ShowAndHideButton
                        onClick={() => setProdInfoModal(false)}
                      >
                        -
                      </ShowAndHideButton>
                    )}
                  </ModalName>
                  {ProdInfoModal && (
                    <ModalContent className="modal-content">
                      <p>{productData.prodInfo}</p>
                    </ModalContent>
                  )}
                </AdditionalModal>
                <AdditionalModal className="prod-info-modal">
                  <ModalName className="modalname">
                    배송 & 반품
                    {deliInfoModal === false ? (
                      <ShowAndHideButton onClick={() => setDeliInfoModal(true)}>
                        +
                      </ShowAndHideButton>
                    ) : (
                      <ShowAndHideButton
                        onClick={() => setDeliInfoModal(false)}
                      >
                        -
                      </ShowAndHideButton>
                    )}
                  </ModalName>
                  {deliInfoModal && (
                    <ModalContent className="modal-content">
                      <p>3만원 이상 구매하실 경우 배송 비용은 무료입니다. </p>
                      <p>
                        주문일로부터 1-2 영업일 이내 출고됩니다. 배송은 지역
                        택배사 사정에 따라 약간의 지연이 생길 수 있습니다.
                        배송이 시작되면 구매자에게는 이메일, 수령인에게는 카카오
                        알림톡으로 배송 정보를 전송해 드립니다.
                        CJ대한통운(https://www.cjlogistics.com){" "}
                      </p>
                      <p>
                        * 상품 혹은 증정품의 포장(랩핑)을 개봉 및 훼손한 경우
                        반품이 불가합니다.
                      </p>
                      <p>
                        * 단순 변심 또는 주문 실수로 인한 교환이 불가합니다.
                        신중한 구매 부탁드립니다.
                      </p>
                    </ModalContent>
                  )}
                </AdditionalModal>
              </AdditionalWrapper>
            </SideBar>
          </RightContainer>
        </Container>
        <RecommendBar>
          <RecommendTitle>추천 제품</RecommendTitle>
          <RecommendItemBox>
            <Carousel
              prodNum={productData.prodNum}
              category={productData.prodCategory}
              navigate={navigate}
            />
          </RecommendItemBox>
        </RecommendBar>
        <ProductReview review={productData.review} />
      </Wrap>
    </>
  );
}

export default ProdDetailView;

const Wrap = styled.div`
  /* width: 85vw; */
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
`;

const Container = styled.div`
  /* width: 100%; */
  width: 70%;
  margin: 0 auto;

  display: flex;
`;

const LeftContainer = styled.div`
  /* float: left; */
  /* width: 55vw; */
  width: 60%;
  height: 800px;
  margin: 0;
  /* margin-bottom: 5vw; */
  margin-bottom: 10vw;

  padding: 0;
  margin-top: 160px;
  overflow-y: overlay;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    outline: none;
    border-radius: 10px;
    background-color: #f3f1f1;
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }
`;

const ProductImageBox = styled.div`
  /* width: 55vw; */
  width: 100%;
  height: fit-content;
  overflow: hidden;
`;

const ProductImage = styled.img`
  /* width: 55vw; */
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const RightContainer = styled.div`
  width: 40%;
`;

const SideBar = styled.div`
  /* position: fixed; */
  /* float: right; */
  /* width: 25vw; */
  /* width: 100%; */
  height: fit-content;
  padding: 0;
  padding-top: 170px;
  margin: 0;
  margin-left: 5vw;
`;

const NameCategoryPriceBox = styled.div``;

const ProductCategory = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
  text-align: left;
`;

const ProductNameBox = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin: 1.5rem 0;
`;

const ProductName = styled.div`
  font-family: "Pretendard";
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  margin-right: 1rem;
  text-align: left;
  line-height: 1.2;
`;

const WishBox = styled.div`
  width: 35px;
  cursor: pointer;
`;

const Wish = styled.img`
  width: 35px;
  object-fit: cover;
`;

const ProductPrice = styled.div`
  font-family: "Pretendard";
  font-size: 1.8rem;
  font-weight: 500;
  margin: 2rem 0;
  text-align: right;
`;

const ProduceInfo = styled.div`
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0;
  text-align: right;
  word-break: keep-all;
  line-height: 1.4;
`;

const ScentBox = styled.div`
  font-family: "Pretendard";
  margin: 0;
  text-align: left;
  padding-top: 1rem;
`;

const ScentName = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
  margin-bottom: 1rem;
  text-align: left;
`;

const ScentInfo = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  text-align: left;
  word-break: keep-all;
  line-height: 1.4;
`;

const OptionWrapper = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0 2rem 0;
  p {
    font-family: "Pretendard";
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const OptionBox = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: center;
  align-items: stretch;
`;

const OptionButton = styled.button`
  display: block;
  margin: 0;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  color: ${(props) => (props.isSelected ? "white" : "black")};
  border: 1.5px solid black;
  background-color: ${(props) => (props.isSelected ? "black" : "white")};
  cursor: pointer;
`;

const SoldOutButton = styled.button`
  cursor: none;
  display: block;
  width: 40%;
  height: 40px;
  margin: 0;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  color: white;
  border: 1.5px solid black;
  background-color: rgb(192, 190, 190);
`;

const QuantityWrapper = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 2.5rem 0;
  p {
    font-family: "Pretendard";
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const QuantityBox = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const QuantityButton = styled.div`
  display: block;
  margin: 0 1rem;
  padding: 0;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const QuantityUpButtonImage = styled.img`
  width: 15px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const QuantityDownButtonImage = styled.img`
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  width: 15px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  transform: rotate(180deg);
`;

const Quantity = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  width: 50px;
  font-family: "Pretendard";
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: black;
  border: 0;
`;

const AmountBox = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 2rem 0;
  p {
    font-family: "Pretendard";
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const Amount = styled.div`
  font-family: "Pretendard";
  font-size: 1.8rem;
  font-weight: 500;
  text-align: right;
`;

const OrderCartBox = styled.div`
  display: flex;
  margin: 2rem 0;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OrderCartButton = styled.button`
  display: block;
  width: 100%;
  height: 60px;
  margin: 0;
  padding: 0;
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  color: white;
  border: 1.5px solid black;
  background-color: black;
  &:hover {
    color: black;
    border: 1.5px solid black;
    background-color: white;
  }
`;

const AdditionalWrapper = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  border-bottom: 1px solid #8e8e8e;
`;

const AdditionalModal = styled.div`
  font-family: "Pretendard";
`;

const ModalName = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: left;
  border-top: 1px solid #8e8e8e;
`;

const ShowAndHideButton = styled.button`
  border: none;
  font-size: 35px;
  background-color: transparent;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 0rem 1rem 1rem 1rem;
  /* border-top: 1px solid #8e8e8e; */
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  line-height: 1.5;
  p {
    margin: 0.5rem 0;
    text-align: left;
    word-break: keep-all;
  }
`;

const RecommendBar = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 5%;
`;

const RecommendTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
`;

const RecommendItemBox = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const ItemCard = styled.div`
  width: 33.333%;
  height: 33.333%;
`;

const ItemImage = styled.img``;

const ItemName = styled.div``;

const ItemPrice = styled.div``;
