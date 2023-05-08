// import React, { useState } from "react";
// import { useRef } from "react";

// // 주문자 정보 입력 폼
// // 이메일, 이름, 연력처, 동의 여부
// function OrderInfoForm(props) {
//   // 이메일 관련 변수
//   // const [email, setEmail] = useState("");
//   //   const [domain, setDomain] = useState("");
//   // const domainRef = useRef(null);
//   // const userNameRef = useRef(null);
//   // const userPhoneRef = useRef(null);

//   // 도메인 확인용(나중에 삭제)
//   // function domainChange() {
//   //   console.log(domainRef.current.value);
//   // }

//   // function authBtn() {
//   //   // 휴대폰 인증 관련 내용 추가
//   // }

//   // 동의 관련 state
//   const [allAgree, setAllAgree] = useState(false);
//   const [checkValues, setCheckValues] = useState({
//     check1: false,
//     check2: false,
//   });

//   // 동의 체크 이벤트
//   const handleCheckChange = (e) => {
//     const { name, checked } = e.target;
//     setCheckValues((prev) => ({ ...prev, [name]: checked }));
//   };

//   // 모두 동의 체크 이벤트
//   const handleCheckAllChange = (e) => {
//     const { checked } = e.target;
//     setCheckValues({
//       check1: checked,
//       check2: checked,
//     });
//   };

//   // 저장하고 다음 단계로 이동 버튼 클릭 이벤트
//   const saveAndNext = (e) => {
//     e.preventDefault();
//     const { check1, check2 } = checkValues;

//     if (check1 && check2) {
//       alert("저장되었습니다.");
//     } else {
//       alert("모두 동의가 필요합니다.");
//     }

//     // 이메일, 이름, 연락처 검증 추가
//   };

//   return (
//     <div className="order_form">
//       <div className="email_content">
//         <div>이메일</div>
//         <input
//           type="text"
//           value={props.order.email}
//           // placeholder={props.order.email}
//           // onChange={(e) => setEmail(e.target.value)}
//         ></input>
//         @<input type="text" value={props.order.domain}></input>
//         <select>
//           <option value="">옵션 선택</option>
//           <option value="naver.com">naver.com</option>
//           <option value="gmail.com">gmail.com</option>
//           <option value="hanmail.net">hanmail.net</option>
//           <option value="nate.com">nate.com</option>
//           <option value="yahoo.com">yahoo.com</option>
//         </select>
//       </div>
//       <div className="name_content">
//         <div>이름</div>
//         <input type="text" value={props.order.name}></input>
//       </div>
//       <div className="phone_content">
//         <div>연락처</div>
//         <input
//           type="text"
//           value={props.order.tel}
//           placeholder="예 : 01012341234"
//         ></input>
//         <button>인증하기</button>
//       </div>
//       <div className="order_info_agree">
//         <div>
//           <input
//             type="checkbox"
//             name="allAgree"
//             checked={checkValues.allAgree}
//             onChange={handleCheckAllChange}
//           ></input>{" "}
//           모두 동의합니다.
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             name="check1"
//             checked={checkValues.check1}
//             onChange={handleCheckChange}
//           ></input>{" "}
//           (필수) 개인정보처리방침 동의 자세히 보기
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             name="check2"
//             checked={checkValues.check2}
//             onChange={handleCheckChange}
//           ></input>{" "}
//           (필수) 이용약관 동의 자세히 보기
//         </div>
//       </div>
//       <button onClick={saveAndNext}>저장하고 다음 단계로</button>
//     </div>
//   );
// }

// export default OrderInfoForm;
