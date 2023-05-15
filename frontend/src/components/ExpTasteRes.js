import React from "react";
import { Link } from "react-router-dom";

const TestResult = ({ resultData }) => {
  //9가지 경우의 수로 향 소개 및 소분류 명칭-설명 저장
  const resultpage = [
    {
      noteName: "Animal",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Woody",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Herbal&Green",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Floral",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Mossy",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Citrus",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Fruity",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Watery&Powdery",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
    {
      noteName: "Special",
      noteInfo: "",
      scentName1: "",
      scentName2: "",
      scentName3: "",
    },
  ];

  const firstPlace = resultpage.filter(
    (r) => r.noteName == resultData.firstPlace
  );
  const secondPlace = resultpage.filter(
    (r) => r.noteName == resultData.secondPlace
  );
  const thirdPlace = resultpage.filter(
    (r) => r.noteName == resultData.thirdPlace
  );

  const TasteResultview = ({ place }) => {
    //이미지파일 확장자 jpg나 png로 통일
    return (
      <div>
        <div className="notename">{place.noteName}</div>
        <div className="noteimg">
          {/* <img
            src={`http://localhost:8080/download?img=${place.noteName}.png`}
            alt=""
          /> */}
        </div>
        {place.noteInfo}
        <div className="scentname">
          {/* <img
            src={`http://localhost:8080/download?img=${place.scentName1}.png`}
            alt=""
          /> */}
          {place.scentName1}
        </div>
        <div className="scentname">
          {/* <img
            src={`http://localhost:8080/download?img=${place.scentName2}.png`}
            alt=""
          /> */}
          {place.scentName2}
        </div>
        <div className="scentname">
          {/* <img
            src={`http://localhost:8080/download?img=${place.scentName3}.png`}
            alt=""
          /> */}
          {place.scentName3}
        </div>
      </div>
    );
  };
  //result 는 TasteResultDTO형태임
  return (
    <div>
      <div className="firstTaste">
        <TasteResultview place={firstPlace[0]} />
      </div>
      <Link to="/exp/subs">체험 패키지 구독 신청하러 가기</Link>
      <div className="secondTaste">
        <TasteResultview place={secondPlace[0]} />
      </div>
      <div className="thirdTaste">
        <TasteResultview place={thirdPlace[0]} />
      </div>
    </div>
  );
};

export default TestResult;
