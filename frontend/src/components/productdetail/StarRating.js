import styled from "styled-components";
import EMPTY_STAR from "../../assets/productdetail/empty-star-image.png";
import FULL_STAR from "../../assets/productdetail/full-star-image.png";

import { useState, useEffect } from "react";

const StarRating = ({ rating }) => {
  const AVR_RATE = rating;
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates());
  }, []);

  return (
    <StarRateWrap>
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <div className="star_icon" key={`${item}_${idx}`}>
            <StarClip style={{ width: `${(ratesResArr[idx] / 14) * 100}%` }} />
            <StarImage />
          </div>
        );
      })}
    </StarRateWrap>
  );
};

export default StarRating;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
    position: relative;
    width: 35px;
    height: 35px;
  }
`;

const StarClip = styled.div`
  position: absolute;
  height: 100%;
  background-image: url(${FULL_STAR});
  background-size: cover;
`;

const StarImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${EMPTY_STAR});
  background-size: cover;
`;
