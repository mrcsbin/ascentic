import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePoint } from "../../store/modules/order";
import { styled } from "styled-components";

// 할인 혜택
const DiscountBenefit = () => {
  const dispatch = useDispatch(); // action 객체를 보내는 훅
  const pointInfo = useSelector((state) => state.order.pointInfo);

  const handleUpdatePoint = (e) => {
    const { name, value } = e.target;
    dispatch(updatePoint({ updatePointInfo: { [name]: value } }));
  };

  return (
    <DiscountBenefitForm>
      <div>
        <div>보유 포인트</div>
        <input
          type="text"
          value={pointInfo.holdPoint}
          dir="rtl" // 오른쪽부터 쓰기
          disabled={true}
        ></input>
      </div>
      <div>
        <div>포인트 사용</div>
        <input
          type="text"
          name="usePoint"
          value={pointInfo.usePoint}
          onChange={handleUpdatePoint}
          dir="rtl"
        ></input>
        <button>사용불가</button>
      </div>
      <div>배송비, 샘플키트는 포인트 결제 적용되지 않습니다.</div>
      <button>저장하고 다음 단계로</button>
    </DiscountBenefitForm>
  );
};

export default DiscountBenefit;

const DiscountBenefitForm = styled.div`
  margin-top: 50px;
  margin-left: 110px;
  width: 609px;
  height: 320px;

  > div > div {
    margin-left: 5px;
    margin-top: 30px;
  }

  > div:nth-child(1) > input {
    width: 490px;
    height: 30px;
    font-size: 16px;
    margin-top: 5px;
    margin-left: 4px;
    margin-right: 4px;
    padding-right: 15px;
  }

  > div:nth-child(2) > input {
    width: 350px;
    height: 30px;
    font-size: 16px;
    margin-left: 4px;
    margin-top: 5px;
    margin-right: 4px;
    padding-right: 15px;
  }

  > div:nth-child(2) > button {
    width: 135px;
    height: 36px;
    font-size: 14px;
    margin-top: 4px;
    background-color: white;
  }

  > div:nth-child(3) {
    margin-top: 12px;
    margin-left: 10px;
    color: #cfa614;
  }

  > button {
    margin-top: 30px;
    color: white;
    background-color: black;
    width: 515px;
    height: 50px;
    font-size: 18px;
  }
`;
