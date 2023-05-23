import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";

const RatingForm = styled.form`
  .wrapper {
    display: block;
    font-size: 20px;
    height: auto;
  }

  .rating-fieldset {
    display: inline-block;
    direction: rtl;
    border: 0;
  }

  .rating-fieldset legend {
    text-align: right;
  }

  .rating-fieldset input[type="radio"] {
    display: none;
  }

  .rating-fieldset label {
    font-size: 3em;
    color: transparent;
    text-shadow: 0 0 0 #f0f0f0;
  }

  .rating-fieldset label:hover {
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
  }

  .rating-fieldset label:hover ~ label {
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
  }

  .rating-fieldset input[type="radio"]:checked ~ label {
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
  }

  #reviewContents {
    width: 90%;
    height: 20px;
    // box-sizing: border-box;
    margin-top: 1.3%;
    border-bottom: solid 1.5px #d3d3d3;
    border-left: none;
    border-top: none;
    border-right: none;
    font-size: 18px;
    resize: none;
  }
`;

const RatingComponent = ({ sbSendNum, score, review }) => {
  const [rating, setRating] = useState(score);
  const [reviewText, setReviewText] = useState(score !== null ? review : "");

  const handleChange = (e) => {
    if (e.target.name === "reviewStar") {
      setRating(Number(e.target.value));
    } else if (e.target.id === "reviewContents" && score === null) {
      setReviewText(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      sbSendNum: sbSendNum,
      sbSendScore: rating,
      sbSendReview: reviewText,
    };

    try {
      const response = await axios.post("/subscribeReview", reviewData);
      console.log(response.data);
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
      <div className="wrapper">
        <fieldset className="rating-fieldset" value="5">
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
        <div>
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
        {score === null && (
          <div>
            <button type="submit">Submit</button>
          </div>
        )}
      </div>
    </RatingForm>
  );
};

export default RatingComponent;
