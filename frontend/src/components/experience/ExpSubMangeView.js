import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import '../../styles/ExpSubManageView.css';
import RatingComponent from './RatingComponent';
import { getCookie } from '../../utils/Cookies';

const ExpSubsManageView = ({ sbMember, subscribe, success, TasteRes }) => {
  // ------------------------------------ 구독기간 관련 ---------------------------------------
  // const start = new Date(sbMember.sbStartDate); // 구독시작 날짜
  const start = new Date(sbMember.sbStartDate); // 구독시작 날짜
  const currentDate = new Date(); // 현재 날짜
  const [startYear, startMonth] = [start.getFullYear(), start.getMonth()];
  const [currnetYear, currnetMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ];

  console.log(
    'sbMember====================================================================='
  );
  console.log(sbMember);
  console.log(
    'subscribe======================================================================'
  );
  console.log(subscribe);

  //구독중인 기간
  const subsDuration =
    (currnetYear - startYear) * 12 + (currnetMonth - startMonth);

  // ------------------------------ 과거 배송상품 관련 -------------------------------------------

  let years = [];
  for (let i = startYear; i <= currnetYear; i++) {
    years = [...years, i];
  }

  const [months, setmonths] = useState([]);

  const monthOptions = (value) => {
    let months = [];

    if (value == currnetYear) {


      if (startYear == chosenYear) {
        for (let i = startMonth; i <= currnetMonth; i++) {
          months = [...months, i];
        }
      } else {
        for (let i = 1; i <= currnetMonth; i++) {
          months = [...months, i];
        }
      }
    } else if (value == startYear) {
      // 아니면 시작한 달부터 그 년의 12월까지
      for (let i = startMonth; i <= 12; i++) {
        months = [...months, i];
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        months = [...months, i];
      }
    }

    setmonths(months);
  };
  useEffect(() => {
    monthOptions(currnetYear);
  }, []);

  // ------------------------------------ 구독상품 관련 ---------------------------------------

  const [filterProd, setFilterProd] = useState([]);
  const [chosenYear, setChosenYear] = useState(currnetYear);
  const [chosenMonth, setChoenMonth] = useState(currnetMonth);

  useEffect(() => {
    const filterByMonth = (chosenYear, chosenMonth) => {
      if (chosenMonth < 10) chosenMonth = '0' + chosenMonth;
      const chosenDate = chosenYear + chosenMonth;
      console.log(chosenDate, 'chosenDate', typeof chosenDate);

      let filtered = subscribe.filter(
        (data) =>
          data.sbSendStart.slice(0, 4) + data.sbSendStart.slice(5, 7) ==
          chosenDate
      );
      setFilterProd(filtered);
    };
    filterByMonth(chosenYear, chosenMonth);
  }, [chosenYear, chosenMonth, subscribe]);

  // ------------------------------------ 구독상품 정보와 리뷰 ---------------------------------------
  // let showSubsInfo = false;
  // if (filterProd.length >= 1) {
  //   showSubsInfo = true;
  // }
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  const SubsInfo = () => {
    if (filterProd.length >= 1) {
      return (
        <div className="subs-info">
          <span>
            {chosenYear}년 {chosenMonth}월
          </span>
          <div className="on-delivery">
            <span>{sbMember.sbSendEnd ? '배송 완료' : '배송중'}</span>
          </div>
          <div className="subs-prod-name-intro">
            <div>
              <div className="maybe-for-image"></div>
              <div className="scent-name">
                <p>
                  <span>{filterProd[0].spScent.scentName}</span>
                </p>
              </div>
              <div className="intro-price">
                {filterProd[0].spIntro}
                <span>{addComma(filterProd[0].spPrice)}원</span>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
          <div className="rating-component">
            {/* {console.log("ssss")}
            {console.log(filterProd[0])} */}
            <RatingComponent
              sbSendNum={filterProd[0].sbSendNum}
              score={filterProd[0].sbSendScore}
              review={filterProd[0].sbSendReview}
            ></RatingComponent>
          </div>

          <div className="address">
            <span>배송지 주소</span>
            <p>{sbMember.mainAddress}</p>
            <p>{sbMember.subAddress}</p>
          </div>
          <div>
            <span>송장번호가 ERD에 없음</span>
          </div>
          <div className="clear-both"></div>
        </div>
      );
    } else {
      return <div className="no-info">요청하신 자료가 존재하지 않습니다</div>;
    }
  };

  // ------------------------------------ 구독해지하기---------------------------------------

  const endSubscribe = async () => {
    const confirmation = window.confirm('정말로 해지하시겠습니까?');

    if (!confirmation) {
      return;
    }

    try {
      await axios.get('/endSubscribe', {
        headers: {
          Authorization: 'Bearer ' + getCookie('accessToken'),
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------------------------------------------

  return (
    <div className="page-wrapper">
      <div className="sbMember">
        <div className="hello-member">
          <p>
            안녕하세요. <span> {sbMember.memberName}</span>님
          </p>
          <p>오늘도 향기로운 하루 되세요!</p>
        </div>
        <div className="sbMember-info">
          <div className="subscribe-or-not">
            {sbMember.sbEndDate ? '구독하지 않는 중' : '구독중'}
          </div>
          <div className="duration-payDay">
            <p>
              구독기간 <span> {subsDuration}개월</span>
            </p>
            결제일
            <span> 매월 {sbMember.sbPaymentDay}일</span>
          </div>
          {/* <div className="scentNote-payInfo"> */}
          <div className="duration-payDay">
            <p> ScentNote</p>
            <p>
              <span> 첫번째 향 {TasteRes.firstPlace}</span>
              <br />
              <span> 두번째 향 {TasteRes.secondPlace}</span>
              <br />
              <span> 세번째 향 {TasteRes.thirdPlace}</span>
            </p>
            결제정보 = <span> {sbMember.sbPay}</span>
          </div>
        </div>
      </div>

      <div className="clear-both"></div>
      <div className="select-year-month">
        <select
          value={chosenYear}
          onChange={(event) => {
            setChosenYear(event.target.value);
            monthOptions(event.target.value);
          }}
        >
          {years.map((year, index) => {
            return <option key={index}>{year}</option>;
          })}
        </select>
        <select
          value={chosenMonth}
          onChange={(event) => {
            setChoenMonth(event.target.value);
          }}
        >
          {months.map((month, index) => {
            return <option key={index}> {month}</option>;
          })}
        </select>
        <br />
        <br />
        <hr />
        {console.log('filterProd = ', filterProd)}
        {console.log('sbMember = ', sbMember)}
      </div>
      <SubsInfo />
      {/* <button className="end-subscribe" onClick={endSubscribe}>구독 해지하기</button> */}
      {sbMember.sbEndDate === null && (
        <button className="end-subscribe" onClick={endSubscribe}>
          구독 해지하기
        </button>
      )}
    </div>
  );
};

export default ExpSubsManageView;
