import React from "react";

// 주문 상품 정보
function ProdInfo(props) {
  // 상품 수량(임시)
  const prods = props.prods;
  console.log(prods);

  return (
    <div>
      <div className="sub_title">
        주문 상품 정보
        <button onClick={props.changeExtend}>{props.extend ? "-" : "+"}</button>
      </div>
      {props.extend && (
        <div>
          {prods.map((prod) => (
            <div className="prod_info">
              <img
                src={`http://localhost:8080/getProdImg?prodNum=${prod.prodNum}&prodImageType=0`}
                alt="상품이미지"
              />
              <div className="purchase_info">
                <div>상품명 {prod.prodName}</div>
                <div>
                  {prod.prodOption} / {prod.prodeQunanity}
                </div>
              </div>
              <div>
                <div>{prod.prodPrice.toLocaleString()}원</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdInfo;
