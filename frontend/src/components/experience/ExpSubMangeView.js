import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import '../../styles/ExpSubManageView.css';
import RatingComponent from './RatingComponent';
import { getCookie } from '../../utils/Cookies';
import { CardInfo } from '../../constants/card';

const ExpSubsManageView = ({ sbMember, subscribe, success, TasteRes }) => {
  // ------------------------------------ 구독기간 관련 ---------------------------------------
  // const start = new Date(sbMember.sbStartDate); // 구독시작 날짜
  const start = new Date(sbMember.sbStartDate); // 구독시작 날짜
  const currentDate = new Date(); // 현재 날짜
  const startYear = start.getFullYear();
  const startMonth = start.getMonth() + 1;

  const theFirstSbDate = new Date(sbMember.theFirstSbStartDate);
  const firstYear = theFirstSbDate.getFullYear();
  const [currnetYear, currnetMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  ];

  //구독중인 기간
  let subsDuration =
    (currnetYear - startYear) * 12 + (currnetMonth - startMonth) + 1;
  // if (subsDuration === 0) subsDuration = 1;

  // ------------------------------ 과거 배송상품 관련 -------------------------------------------

  let years = [];
  for (let i = firstYear; i <= currnetYear; i++) {
    years = [...years, i];
  }

  const [months, setmonths] = useState([]);

  const monthOptions = (value) => {
    let months = [];

    for (let i = 1; i <= currnetMonth; i++) {
      months = [...months, i];
    }

    // // subscribe.map((sub) => {
    // let date = new Date(subscribe[0].sbSendPayDate);
    // let month = date.getMonth();
    // let year = date.getFullYear();

    // console.log('===============', month, value);
    // if (value == year) {
    //   for (let i = month; i <= currnetMonth; i++) {
    //     months = [...months, i + 1];
    //   }
    // } else {
    //   for (let i = 1; i <= 12; i++) {
    //     months = [...months, i];
    //   }
    // }

    setmonths(months);
  };

  useEffect(() => {
    monthOptions(currnetYear);
  }, []);

  // ------------------------------------ 구독상품 관련 ---------------------------------------

  const [filterProd, setFilterProd] = useState([]);
  const [chosenYear, setChosenYear] = useState(currnetYear);
  const [chosenMonth, setChoenMonth] = useState(currnetMonth);
  const [loading, setLoading] = useState(true);

  const filterByMonth = (chosenYear, chosenMonth) => {
    if (chosenMonth < 10) chosenMonth = '0' + chosenMonth;
    const chosenDate = chosenYear + chosenMonth;
    console.log(chosenDate, 'chosenDate', typeof chosenDate);

    let filtered = subscribe.filter(
      (data) =>
        data.sbSendPayDate.slice(0, 4) + data.sbSendPayDate.slice(5, 7) ==
        chosenDate
    );
    setFilterProd(filtered);
    setLoading(false);
  };

  useEffect(() => {
    filterByMonth(chosenYear, chosenMonth);
  }, [chosenYear, chosenMonth, subscribe, currnetMonth]);

  useEffect(() => {
    filterByMonth(currnetYear, currnetMonth);
  }, []);

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
    // if (loading) {
    //   console.log('로딩에 들어오긴하나');
    //   return <div>Loading...</div>; // 로딩 중일 때 로딩 표시
    // } else
    if (filterProd.length > 0) {
      return (
        <div className="subs-info">
          <div>
            <div className="subs-num">
              구독주문번호 : <span> {filterProd[0].sbSendNum}</span>
            </div>
            <div className="subs-state">
              <span>{filterProd[0].sbSendState}</span>
            </div>
          </div>
          <div className="subs-pay">
            <div>
              결제일 : <span> {filterProd[0].sbSendPayDate}</span>
            </div>

            <div>
              결제정보 :<span> {filterProd[0].sbSendPayment}</span>
            </div>
          </div>
          {filterProd[0].spScent.scentName ? (
            <div className="subs-prod">
              <div className="header">이번달의 패키지</div>
              <div>
                <div className="subs-prod-image">
                  <img
                    src={`http://localhost:8080/images/${filterProd[0].sbProdImage}`}
                    alt="sbProduct_image"
                  />
                </div>
                <div className="subs-prod-info">
                  <div>
                    <span>{filterProd[0].spScent.scentName} 향 패키지</span>
                    <span>: {filterProd[0].spScent.scentNoteName}</span>
                  </div>
                  <div className="intro">{filterProd[0].spIntro}</div>
                  <div className="price">
                    {addComma(filterProd[0].spPrice)}원
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="subs-prod">상품을 매칭중입니다...</div>
          )}
          <div className="clear-both"></div>
          <div className="address">
            <div>
              <span>배송지 주소</span>
              <p>{filterProd[0].sbSendPostcode}</p>
            </div>
            <div>
              <span>송장번호</span>
              <p>{filterProd[0].sbShippingCode}</p>
            </div>
          </div>
          <div className="clear-both"></div>
          {(filterProd[0].sbSendState === '배송중') |
            (filterProd[0].sbSendState === '배송완료') && (
            <div className="rating-component">
              <RatingComponent
                sbSendNum={filterProd[0].sbSendNum}
                score={filterProd[0].sbSendScore}
                review={filterProd[0].sbSendReview}
              ></RatingComponent>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          <div className="no-info">요청하신 자료가 존재하지 않습니다.</div>
        </>
      );
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
            안녕하세요. <span> {sbMember.memberName} </span>님!
          </p>
          <p>오늘도 향기로운 하루 되세요!</p>
        </div>
        <div className="duration-payDay">
          <p>{sbMember.sbEndDate ? '구독하지 않는 중' : '구독중'}</p>
          <p>
            구독기간 :<span>{subsDuration} 개월</span>
          </p>
          <p>
            결제일 :<span> 매월 {sbMember.sbPaymentDay} 일</span>
          </p>
          <p>
            결제정보 :
            <span>
              {/* {sbMember.sbPay.cardType} */}
              {CardInfo[sbMember.sbPay.issuerCode]}
              {/* {sbMember.sbPay.number} */}
            </span>
          </p>
        </div>
        <div className="sbMember-taste">
          <p>
            선택한 구독취향 : <span>{sbMember.tasteResult} </span>
          </p>
          <p>
            취향 1순위 :<span>{TasteRes.firstPlace}</span>
          </p>
          <p>
            취향 2순위 :<span>{TasteRes.secondPlace}</span>
          </p>
          <p>
            취향 3순위 :<span>{TasteRes.thirdPlace}</span>
          </p>
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
            return (
              <option key={index} value={year}>
                {year}년
              </option>
            );
          })}
        </select>
        <select
          value={chosenMonth}
          onChange={(event) => {
            setChoenMonth(event.target.value);
          }}
        >
          {months.map((month, index) => {
            return (
              <option key={index} value={month}>
                {month}월
              </option>
            );
          })}
        </select>
        {console.log('subscribe = ', subscribe)}
        {console.log('filterProd = ', filterProd)}
        {console.log('sbMember = ', sbMember)}
      </div>
      <hr />
      <SubsInfo />
      <hr />
      {sbMember.sbEndDate === null && (
        <button className="end-subscribe" onClick={endSubscribe}>
          구독 해지하기
        </button>
      )}
    </div>
  );
};

export default ExpSubsManageView;
