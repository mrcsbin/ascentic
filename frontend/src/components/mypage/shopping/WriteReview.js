import React, { useState, useEffect } from "react";
import EMPTY_STAR from "../../../assets/productdetail/empty-star-image.png";
import FULL_STAR from "../../../assets/productdetail/full-star-image.png";

import styled from "styled-components";

const ARRAY = [0, 1, 2, 3, 4];

const WriteReview = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [hovered, setHovered] = useState(-1);
  const [reviewText, setReviewText] = useState("");

  const handleReviewTextChange = (event) => {
    const text = event.target.value;
    if (text.length <= 50) {
      setReviewText(text);
    } else {
      setReviewText(text.slice(0, 50));
    }
  };

  const handleStarHover = (index) => {
    setHovered(index);
  };

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  // useEffect(() => {
  //   sendReview();
  // }, [clicked]); //컨디마 컨디업

  // const sendReview = () => {
  //   let score = clicked.filter(Boolean).length;
  //   // fetch('http://52.78.63.175:8000/movie', {
  //   //   method: 'POST',
  //   //   Headers: {
  //   //     Authroization: 'e7f59ef4b4900fe5aa839fcbe7c5ceb7',
  //   //   },
  //   //   body: JSON.stringify({
  //   //     movie_id:1
  //   //     star: score,
  //   //   }),
  //   // });
  // };

  return (
    <Wrap>
      <RatingText>이 상품에 만족하셨나요 ?</RatingText>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <StarImage
              src={idx <= hovered || clicked[idx] ? FULL_STAR : EMPTY_STAR}
              key={idx}
              onClick={() => handleStarClick(idx)}
              onMouseEnter={() => handleStarHover(idx)}
              onMouseLeave={() => handleStarHover(-1)}
            />
          );
        })}
      </Stars>
      <ReviewText
        placeholder="상세한 리뷰는 다른 회원들에게 도움이 됩니다. (최소 20자 이상)"
        value={reviewText}
        onChange={handleReviewTextChange}
      />
      <CharacterCount isFull={reviewText.length === 50}>
        {reviewText.length} / 50
      </CharacterCount>
      <SubmitButtonBox>
        <SubmitButton>작성완료</SubmitButton>
      </SubmitButtonBox>
    </Wrap>
  );
};

export default WriteReview;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
`;

const RatingText = styled.div`
  color: color;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const StarImage = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const ReviewText = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 20px 10px;
  box-sizing: border-box;
  border: solid 1px black;
  border-radius: 5px;
  font-size: 1.5rem;
  resize: none;
  ::placeholder {
    font-size: 1.5rem;
    font-weight: 500;
    color: grey;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: ${(props) => (props.isFull ? "red" : "black")};
`;

const SubmitButtonBox = styled.div`
  margin: 50px auto 0 auto;
  width: 100%;
`;

const SubmitButton = styled.div`
  text-align: center;
  cursor: pointer;
  border: 2px solid black;
  padding: 22px 20px;
  border-radius: 10px;
  font-size: 1.5rem;
  box-sizing: border-box;
  font-weight: bold;
  :hover {
    border: 2px solid white;
    background-color: black;
    color: white;
  }
`;
