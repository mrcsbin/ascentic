import React from "react";
import styled from "styled-components";
import logob from "../../assets/ascentic_logo_b.svg";

// 결제 수단
const SelectScent = ({ tasteResList, userTasteRes, setTasteRes }) => {
  const Categories = [
    {
      name: "전체보기",
      text: "all",
    },
    {
      name: "Animal",
      text: "Animal",
    },
    {
      name: "Watery&Powdery",
      text: "Watery&Powdery",
    },
    {
      name: "Woody",
      text: "Woody",
    },
    {
      name: "Mossy",
      text: "Mossy",
    },
    {
      name: "Herbal&Green",
      text: "Herbal&Green",
    },
    {
      name: "Floral",
      text: "Floral",
    },
    {
      name: "Citrus",
      text: "Citrus",
    },
    {
      name: "Fruity",
      text: "Fruity",
    },
    {
      name: "Special",
      text: "Special",
    },
  ];

  return (
    <SelectScentBox>
      <Title>구독 취향 선택</Title>
      <TasteResBox>
        <div>
          "&nbsp;
          <div className="logobox">
            <img src={logob} alt="ascentic_logo_b" />
          </div>
          이 찾은 당신의 취향&nbsp;"
        </div>
        <div className="scentplacebox">
          <div className="scentplace">
            <div>1위 : </div> {tasteResList.firstPlace}
          </div>
          <div className="scentplace">
            <div>2위 : </div> {tasteResList.secondPlace}
          </div>
          <div className="scentplace">
            <div>3위 : </div> {tasteResList.thirdPlace}
          </div>
        </div>
      </TasteResBox>
      <select
        defaultValue={userTasteRes}
        onChange={(e) => setTasteRes(e.target.value)}
      >
        {Categories.map((c) => (
          <option key={c.text} value={c.text}>
            {c.name}
          </option>
        ))}
      </select>
      <div>선택한 향으로 체험 패키지 구독 서비스를 신청합니다.</div>
    </SelectScentBox>
  );
};

export default SelectScent;

const SelectScentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  select {
    margin: 30px 0;
    width: 50%;
    height: 60px;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
  }
  > div {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
const Title = styled.div`
  width: 80%;
  text-align: left;
  font-size: 25px;
  font-weight: 700;
  padding-top: 10px;
`;

const TasteResBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin: 10px 0;
    font-size: 1.4rem;
    font-weight: 700;
  }
  .logobox {
    display: inline-block;
    width: 130px;
    height: 25px;
    overflow: hidden;
  }
  .logobox > img {
    width: 130px;
    height: 25px;
    object-fit: cover;
    object-position: center;
  }
  .scentplacebox {
    width: 60%;
    height: fit-content;
    border-left: 2px solid gray;
    margin: 20px 0;
  }
  .scentplace {
    margin: 10px 20px;
    font-size: 1.3rem;
    font-weight: 500;
    text-align: left;
    > div {
      display: inline-block;
      font-size: 1.1rem;
      font-weight: 700;
      color: gray;
    }
  }
  .scentplace:nth-child(2) {
    padding: 20px 0;
  }
`;
