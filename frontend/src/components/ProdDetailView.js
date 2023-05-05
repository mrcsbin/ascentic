import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProdDetail.css';

function ProdDetailView({ productData, scentData }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [onWish, setOnWish] = useState();
  let wishAlready;

  //수량 설정
  function QuantButton(x) {
    if (x == '+') setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  }

  // 주문창으로 이동
  const handleOrderClick = () => {
    navigate(`/order/${productData.prod_num}/${quantity}`);
  };

  // 장바구니 페이지 이동
  const handleCartClick = () => {
    navigate(`/cart/${productData.prod_num}/${quantity}`);
  };

  // 찜하기 구현
  const handleWishClick = () => {
    onWish ? (wishAlready = 'Add') : (wishAlready = 'delete'); //찜했다 안했다 하기 위함
    axios
      .post(`/wish${wishAlready}`) // url별로 추가/삭제 백에서 처리
      .then((response) => {
        if (response.data === 1) {
          setOnWish(true);
        } else {
          setOnWish(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //처음에 위시 되어있는지 받아옴
  useEffect(() => {
    axios
      .get('/wishCheck') // Todo 회원 아이디 추가해야됨
      .then((response) => {
        if (response.data === 1) {
          setOnWish(true);
        } else {
          setOnWish(false);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  //실제 화면
  return (
    <div>
      {/* 전체 박스 */}
      <div>
        {/* 이미지 */}
        {/* <img src={productData.imageUrl} alt={productData.name} /> */}
      </div>
      <div>
        {/* 상세창 전체 */}
        {/* <div>
          이름,가격
          <p>{productData.prod_category}</p>
          <h2>{productData.name}</h2>
          <span>{productData.price}원</span>
        </div> */}

        <button onClick={() => handleWishClick}>
          {/* 찜하기 버튼 */}
          찜하기
        </button>
        {/* <div>
          향설명
          <p>{scentData.info_text}</p>
        </div> */}
        <div>
          <span>수량</span>
          <button onClick={() => QuantButton('-')}> - </button>
          {/* to do : 화살표로 대체 */}
          <span>{quantity}</span>
          <button onClick={() => QuantButton('+')}> + </button>
        </div>
        <div>
          <button onClick={handleOrderClick}>주문하기</button>
          <button onClick={handleCartClick}>장바구니</button>
        </div>
        <div>
          {/* 제품 세부정보 */}
          {/* <p>{productData.description}</p> */}
        </div>
        <div>
          {/* 배송 반품 */}
          {/* <p></p> */}
        </div>
      </div>
    </div>
  );
}

export default ProdDetailView;
