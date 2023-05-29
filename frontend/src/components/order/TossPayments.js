import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";

import "../App.css";

const selector = "#payment-widget";
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export function CheckoutPage() {
  const [price, setPrice] = useState(50_000);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  return (
    <div>
      <h1>주문서</h1>
      <span>{`${price.toLocaleString()}원`}</span>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setPrice(event.target.checked ? price - 5_000 : price + 5_000);
            }}
          />
          5,000원 할인 쿠폰 적용
        </label>
      </div>
      <div id="payment-widget" />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: "토스 티셔츠 외 2건",
              customerName: "김토스",
              customerEmail: "customer123@gmail.com",
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (error) {
            // handle error
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
}

{
  /* <head>
  <meta charset="utf-8" />
  <!-- 결제위젯 SDK 추가 -->
  <script src="https://js.tosspayments.com/v1/payment-widget"></script>
</head>
<body>
  <!-- 결제위젯, 이용약관 영역 -->
  <div id="payment-method"></div>
  <div id="agreement"></div>
  <!-- 결제하기 버튼 -->
  <button id="payment-button">결제하기</button>
  <script>
    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
    const customerKey = "cfy966II3JFcefeByCd2C" // 내 상점의 고객을 식별하는 고유한 키
    const button = document.getElementById("payment-button")
    // ------  결제위젯 초기화 ------ 
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = PaymentWidget(clientKey, customerKey) // 회원 결제
    // const paymentWidget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS) // 비회원 결제
    // ------  결제위젯 렌더링 ------ 
    // 결제위젯이 렌더링될 DOM 요소를 지정하는 CSS 선택자 및 결제 금액을 넣어주세요. 
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    paymentWidget.renderPaymentMethods("#payment-method", 15000)
    // ------  이용약관 렌더링 ------
    // 이용약관이 렌더링될 DOM 요소를 지정하는 CSS 선택자를 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement('#agreement')
    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
    button.addEventListener("click", function () {
      paymentWidget.requestPayment({
        orderId: "KeLwIUF7tTGEzzpgOAx30",            // 주문 ID(직접 만들어주세요)
        orderName: "토스 티셔츠 외 2건",                 // 주문명
        successUrl: "https://my-store.com/success",  // 결제에 성공하면 이동하는 페이지(직접 만들어주세요)
        failUrl: "https://my-store.com/fail",        // 결제에 실패하면 이동하는 페이지(직접 만들어주세요)
        customerEmail: "customer123@gmail.com",
        customerName: "김토스"
      })
    })
  </script>
</body>  */
}
