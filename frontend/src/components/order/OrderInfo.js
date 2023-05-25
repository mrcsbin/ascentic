import { useDispatch, useSelector } from "react-redux";
import { updateOrder, saveExtendChange } from "../../store/modules/order";
import { useState } from "react";
import styled from "styled-components";
import { getOrderInfo } from "../../api/MemberApi";
import { getCookie } from "../../utils/Cookies";
import { useEffect } from "react";

// 주문자 정보
const OrderInfo = () => {
  const accessToken = getCookie("accessToken");

  const dispatch = useDispatch();
  const orderInformation = useSelector((state) => state.order.orderInformation);

  const handleUpdateOrder = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    dispatch(updateOrder({ updateOrderInformation: { [name]: value } }));
  };

  const handleSaveExtendChange = (type) => {
    console.log(type);
    dispatch(saveExtendChange({ type }));
  };

  // 동의 관련 state
  const [checkValues, setCheckValues] = useState({
    check1: false,
    check2: false,
  });

  // 동의 체크 이벤트
  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setCheckValues((prev) => ({ ...prev, [name]: checked }));
  };

  // 모두 동의 체크 이벤트
  const handleCheckAllChange = (e) => {
    const { checked } = e.target;
    setCheckValues({
      check1: checked,
      check2: checked,
    });
  };

  // 저장하고 다음 단계로 이동 버튼 클릭 이벤트
  const saveAndNext = (e) => {
    e.preventDefault();

    if (checkValues.check1 && checkValues.check2) {
      handleSaveExtendChange("delivery");
      alert("저장되었습니다");
    } else {
      alert("모두 동의가 필요합니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOrderInfo(accessToken); // api 함수 호출
      console.log("gg");
      console.log(result);
      Object.entries(result).forEach(([name, value]) => {
        dispatch(updateOrder({ updateOrderInformation: { [name]: value } }));
      });
    };

    fetchData();
  }, []);

  return (
    <OrderForm>
      <EmailContent>
        <div>이메일</div>
        <input
          type="text"
          name="email"
          value={orderInformation.email}
          onChange={handleUpdateOrder}
        ></input>
        @
        <input
          type="text"
          name="domain"
          value={orderInformation.domain}
          onChange={handleUpdateOrder}
        ></input>
        <select
          name="domain"
          value={orderInformation.domain}
          onChange={handleUpdateOrder}
        >
          <option value="">옵션 선택</option>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="hanmail.net">hanmail.net</option>
          <option value="nate.com">nate.com</option>
          <option value="yahoo.com">yahoo.com</option>
        </select>
      </EmailContent>
      <NameContent>
        <div>이름</div>
        <input
          type="text"
          name="name"
          value={orderInformation.name}
          onChange={handleUpdateOrder}
        ></input>
      </NameContent>
      <PhoneContent>
        <div>연락처</div>
        <input
          type="text"
          name="tel"
          value={orderInformation.tel}
          onChange={handleUpdateOrder}
          placeholder="예 : 01012341234"
        ></input>
      </PhoneContent>
      <OrderAgree>
        <div>
          <input
            type="checkbox"
            name="allAgree"
            checked={checkValues.allAgree}
            onChange={handleCheckAllChange}
          ></input>{" "}
          모두 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check1"
            checked={checkValues.check1}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수) 개인정보처리방침 동의 자세히 보기
        </div>
        <div>
          <input
            type="checkbox"
            name="check2"
            checked={checkValues.check2}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수) 이용약관 동의 자세히 보기
        </div>
      </OrderAgree>
      <button onClick={saveAndNext}>저장하고 다음 단계로</button>
    </OrderForm>
  );
};

export default OrderInfo;

const OrderForm = styled.div`
  margin-top: 30px;
  margin-left: 60px;
  width: 609px;
  height: 450px;
  background-color: white;

  > button {
    margin-left: 60px;
    color: white;
    background-color: black;
    width: 455px;
    height: 50px;
    font-size: 18px;
  }
`;

const EmailContent = styled.div`
  margin-top: 30px;
  margin-left: 50px;

  > div {
    margin-left: 5px;
  }

  > input,
  select {
    box-sizing: border-box;
    width: 143px;
    height: 30px;
    font-size: 15px;
    margin-top: 5px;
    margin-left: 4px;
    margin-right: 4px;
    padding-left: 15px;
  }
`;

const NameContent = styled.div`
  margin-top: 30px;
  margin-left: 50px;

  > div {
    margin-left: 5px;
  }

  > input {
    box-sizing: border-box;
    width: 462px;
    height: 30px;
    font-size: 20px;
    margin-top: 5px;
    margin-left: 4px;
    margin-right: 4px;
    letter-spacing: 5px;
    padding-left: 15px;
  }
`;

const PhoneContent = styled.div`
  margin-top: 30px;
  margin-left: 50px;

  > div {
    margin-left: 5px;
  }

  > input {
    box-sizing: border-box;
    width: 462px;
    height: 31px;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 4px;
    margin-right: 4px;
    padding-left: 15px;
  }
`;

const OrderAgree = styled.div`
  margin-top: 40px;
  margin-left: 60px;
  /* border: 1px solid; */
  width: 515px;
  height: 120px;

  > div:nth-child(1) {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  > div {
    margin-top: 5px;
  }
`;
