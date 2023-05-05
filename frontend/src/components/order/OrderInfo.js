import { useState } from "react";
import OrderInfoForm from "./OrderInfoForm";

// 주문자 정보
function OrderInfo() {
  // +, - 확장응 위한 State
  const [detail, setDetail] = useState(false);

  // Session을 읽어올 변수
  const isSessiongId = sessionStorage.getItem("user_id");

  // +, - 버튼 클릭이벤트
  function changeDetail() {
    setDetail(!detail);
  }

  // 세션값에 따라 render 할 컴포넌트 지정
  function renderComponent() {
    if (isSessiongId) {
      // 세션값이 없을 떄
      return <h1>로그인 컴포넌트</h1>;
    } else {
      // 세션값이 있을 때
      return <OrderInfoForm></OrderInfoForm>;
    }
  }

  return (
    <div>
      <div className="sub_title">
        주문자 정보<button onClick={changeDetail}>{detail ? "-" : "+"}</button>
      </div>
      {/* 세션값 존재 여부에 따라 로그인 컴포넌트가 오거나, 주문자 정보 입력 폼이 올 수 있음* */}
      {detail && renderComponent()}
    </div>
  );
}

export default OrderInfo;
