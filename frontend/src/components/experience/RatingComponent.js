import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";

const RatingForm = styled.form`
  .header {
    margin-top: 15px;
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  }
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    height: auto;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 15px;
  }

  .rating-fieldset {
    display: inline-block;
    direction: rtl;
    border: 0;
  }
  .rating-fieldset legend {
    text-align: left;
  }
  .rating-fieldset input[type="radio"] {
    display: none;
  }
  .rating-fieldset label {
    font-size: 2rem;
    color: transparent;
    text-shadow: 0 0 0 lightgray;
  }
  .rating-fieldset label.active:hover {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.99);
  }
  .rating-fieldset label.active:hover ~ label {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.99);
  }
  .rating-fieldset input[type="radio"]:checked ~ label {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.99);
  }
  .rating-fieldset.disabled label {
    pointer-events: none;
  }

  .textreview {
    width: 60%;
  }
  #reviewContents {
    width: 100%;
    height: 25px;
    border: 0;
    margin: 0 15px;
    padding: 5px 15px;
    font-size: 1.2rem;
    font-weight: 500;
    border-bottom: solid 1.5px #d3d3d3;
    resize: none;
  }

  .wrapper > button {
    font-size: 1.1rem;
    font-weight: 500;
    padding: 5px 15px;
    margin: 0 10px;
    color: white;
    background-color: black;
    border: 1.5px solid black;
  }
  .wrapper > button:hover {
    font-size: 1.1rem;
    font-weight: 500;
    padding: 5px 15px;
    color: black;
    background-color: white;
    border: 1.5px solid black;
  }
`;

const RatingComponent = ({ sbSendNum, score, review }) => {
  const [rating, setRating] = useState(score);
  const [reviewText, setReviewText] = useState(score !== null ? review : "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "reviewStar") {
      setRating(Number(e.target.value));
    } else if (e.target.id === "reviewContents" && score === null) {
      setReviewText(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 별점이랑 텍스트 다 채워야지 제출 됨~
    if (!rating || reviewText.length < 10) {
      alert("별점과 리뷰(10자 이상)를 모두 채워주세요");
      return;
    }

    const reviewData = {
      sbSendNum: sbSendNum,
      sbSendScore: rating,
      sbSendReview: reviewText,
    };

    try {
      const response = await axios.post("/subscribeReview", reviewData);
      console.log(response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RatingForm
      className="wrapper"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <div className="header">리뷰</div>
      <div className="wrapper">
        {/* 제출 후에는 별점과 리뷰 변경 불가능 */}
        <fieldset
          className={`rating-fieldset ${isSubmitted ? "disabled" : "active"}`}
          value="5"
        >
          <input
            type="radio"
            name="reviewStar"
            value="5"
            id="rate1"
            checked={rating === 5}
            disabled={score !== null}
          />
          <label htmlFor="rate1">★</label>
          <input
            type="radio"
            name="reviewStar"
            value="4"
            id="rate2"
            checked={rating === 4}
            disabled={score !== null}
          />
          <label htmlFor="rate2">★</label>
          <input
            type="radio"
            name="reviewStar"
            value="3"
            id="rate3"
            checked={rating === 3}
            disabled={score !== null}
          />
          <label htmlFor="rate3">★</label>
          <input
            type="radio"
            name="reviewStar"
            value="2"
            id="rate4"
            checked={rating === 2}
            disabled={score !== null}
          />
          <label htmlFor="rate4">★</label>
          <input
            type="radio"
            name="reviewStar"
            value="1"
            id="rate5"
            checked={rating === 1}
            disabled={score !== null}
          />
          <label htmlFor="rate5">★</label>
        </fieldset>
        <div className="textreview">
          <textarea
            // className="col-auto form-control"
            type="text"
            id="reviewContents"
            value={reviewText}
            readOnly={score !== null}
            placeholder={
              score === null
                ? "이번 달의 체험 패키지에 대한 만족도를 들려주세요! 고객님의 의견은 서비스 개선에 큰 도움이 됩니다."
                : ""
            }
          ></textarea>
        </div>
        {!isSubmitted && score === null && <button type="submit">등록</button>}
      </div>
    </RatingForm>
  );
};

export default RatingComponent;
