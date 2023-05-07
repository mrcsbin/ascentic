import { useState } from "react";
import OrderInfoForm from "./OrderInfoForm";

// 주문자 정보
function OrderInfo(props) {
  // 동의 관련 state
  const [allAgree, setAllAgree] = useState(false);
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

  // 이메일 유효성 체크
  function validateEmail(email) {
    const re = /^[a-z0-9_]+$/;
    if (email.length < 4 || email.length > 20) {
      return false;
    }
    return re.test(String(email).toLowerCase());
  }

  // 이메일 도메인 유효성 체크
  function validateEmailDomain(emailDomain) {
    const re = /^([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;
    return re.test(String(emailDomain).toLowerCase());
  }

  // 이름 유효성 체크
  function validateName(name) {
    const re = /^[a-zA-Z가-힣]+$/;
    return re.test(name);
  }

  // 전화번호 유효성 체크
  function validatePhoneNumber(phoneNumber) {
    const re = /^\d{10,11}$/;
    return re.test(phoneNumber);
  }

  // 저장하고 다음 단계로 이동 버튼 클릭 이벤트
  const saveAndNext = (e) => {
    e.preventDefault();
    const { check1, check2 } = checkValues;

    if (check1 && check2) {
      props.changeSaveExtend(); // 저장후 배송정보 자동 확장
      const errors = {};

      if (!props.order.email || !validateEmail(props.order.email)) {
        errors.email = "유효한 이메일 주소를 입력해주세요.";
        alert(errors.email);
        return false;
      }

      if (!props.order.domain || !validateEmailDomain(props.order.domain)) {
        errors.domain = "유효한 이메일 도메인 주소를 입력해주세요.";
        alert(errors.domain);
        return false;
      }

      if (!props.order.name || !validateName(props.order.name)) {
        errors.name = "유효한 이름을 입력해주세요.";
        alert(errors.name);
        return false;
      }

      if (!props.order.tel || !validatePhoneNumber(props.order.tel)) {
        errors.tel = "유효한 전화번호를 입력해주세요.";
        alert(errors.tel);
        return false;
      }

      alert("저장되었습니다");
    } else {
      alert("모두 동의가 필요합니다.");
    }
  };

  return (
    <div>
      <div className="sub_title">
        주문자 정보
        <button onClick={props.changeExtend}>{props.extend ? "-" : "+"}</button>
      </div>
      {props.extend && (
        <div className="order_form">
          <div className="email_content">
            <div>이메일</div>
            <input
              type="text"
              value={props.order.email}
              onChange={(e) =>
                props.changeOrder({ ...props.order, email: e.target.value })
              }
            ></input>
            @
            <input
              type="text"
              value={props.order.domain}
              onChange={(e) =>
                props.changeOrder({ ...props.order, domain: e.target.value })
              }
            ></input>
            <select
              onChange={(e) =>
                props.changeOrder({ ...props.order, domain: e.target.value })
              }
            >
              <option value="">옵션 선택</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="yahoo.com">yahoo.com</option>
            </select>
          </div>
          <div className="name_content">
            <div>이름</div>
            <input
              type="text"
              value={props.order.name}
              onChange={(e) =>
                props.changeOrder({ ...props.order, name: e.target.value })
              }
            ></input>
          </div>
          <div className="phone_content">
            <div>연락처</div>
            <input
              type="text"
              value={props.order.tel}
              placeholder="예 : 01012341234"
              onChange={(e) =>
                props.changeOrder({ ...props.order, tel: e.target.value })
              }
            ></input>
            <button>인증하기</button>
          </div>
          <div className="order_info_agree">
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
          </div>
          <button onClick={saveAndNext}>저장하고 다음 단계로</button>
        </div>
      )}
    </div>
  );
}

export default OrderInfo;
