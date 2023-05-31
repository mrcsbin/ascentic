import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/Cookies";
import Loading from "../../components/common/Loading";
import "../../styles/ExpTaste.css";
import nightsky from "../../assets/expTasteTest/nightsky.mp4";
import logo from "../../assets/ascentic_logo_w.svg";
import city1 from "../../assets/expTasteTest/1city.webp";
import nature1 from "../../assets/expTasteTest/1nature.webp";
import cool2 from "../../assets/expTasteTest/2cool.webp";
import elegant2 from "../../assets/expTasteTest/2elegant.webp";
import lively2 from "../../assets/expTasteTest/2lively.webp";
import soft3 from "../../assets/expTasteTest/3soft.webp";
import strong3 from "../../assets/expTasteTest/3strong.webp";
import heart4 from "../../assets/expTasteTest/4heart.webp";
import sense4 from "../../assets/expTasteTest/4sense.webp";
import think4 from "../../assets/expTasteTest/4think.webp";
import cinnamon5 from "../../assets/expTasteTest/5cinnamon.webp";
import fruit5 from "../../assets/expTasteTest/5fruit.webp";
import grass5 from "../../assets/expTasteTest/5grass.webp";
import manskin5 from "../../assets/expTasteTest/5manskincare.webp";
import water5 from "../../assets/expTasteTest/5water3.webp";
import sky from "../../assets/expTasteTest/sky.mp4";

const ExpTaste = () => {
  const [taste, setTaste] = useState({
    tasteAgree: "",
    tasteName: "",
    tasteGender: "",
    tasteAge: "",
    tasteTest1: "",
    tasteTest2: "",
    tasteTest3: "",
    tasteTest4: "",
    tasteTest5: "",
  });
  const [resultData, setResultData] = useState();
  const [activeComp, setActiveComp] = useState(0);
  const Navigate = useNavigate();
  const location = useLocation();

  function handleData(e) {
    setTaste({
      ...taste,
      [e.currentTarget.name]: Number(e.currentTarget.value),
    });
  }

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/getTaste`, {
          headers: {
            Authorization: "Bearer " + getCookie("accessToken"),
          },
        });
        setResultData(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchResult();
    // console.log(location);
    if (location.state) {
      Navigate("/exp/taste/res", {
        state: { resultData: resultData },
      });
    }
  }, []);

  // 대기 중일 때
  if (loading) {
    return <Loading />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!resultData) {
    return null;
  }

  return (
    <div>
      {activeComp === 0 ? (
        <ExpTestMain resultData={resultData} setActiveComp={setActiveComp} />
      ) : (
        <div className="tasteTest">
          <video className="mainvideo" loop autoPlay muted>
            <source src={sky} type="video/mp4" />
          </video>
          {activeComp === 1 && (
            <TasteTestStart
              taste={taste}
              handleData={handleData}
              setTaste={setTaste}
              setActiveComp={setActiveComp}
            />
          )}
          {activeComp === 2 && (
            <TasteTest1
              taste={taste}
              handleData={handleData}
              setActiveComp={setActiveComp}
            />
          )}
          {activeComp === 3 && (
            <TasteTest2
              taste={taste}
              handleData={handleData}
              setActiveComp={setActiveComp}
            />
          )}
          {activeComp === 4 && (
            <TasteTest3
              taste={taste}
              handleData={handleData}
              setActiveComp={setActiveComp}
            />
          )}
          {activeComp === 5 && (
            <TasteTest4
              taste={taste}
              handleData={handleData}
              setActiveComp={setActiveComp}
            />
          )}
          {activeComp === 6 && (
            <TasteTest5
              taste={taste}
              handleData={handleData}
              setActiveComp={setActiveComp}
            />
          )}
        </div>
      )}
    </div>
  );
};

const ExpTestMain = ({ resultData, setActiveComp }) => {
  const Navigate = useNavigate();
  //파일 따로 생성 (백엔드 axios 연결 필요 - 받아오기)
  return (
    <div>
      <div className="startTaste">
        <video className="mainvideo" loop autoPlay muted>
          <source src={nightsky} type="video/mp4" />
        </video>
        <div className="contentbox">
          <img src={logo} alt="ascentic_logo" />
          <h3>자신의 향을 찾기 위한 여정</h3>
          <span>취향을 통해 자신을 발견해보세요.</span>
          <span>에이센틱과 함께 당신의 취향을 찾고</span>
          <span>원하는 분위기와 느낌을 가져보세요.</span>
          {resultData.firstPlace === "null" ? (
            <div className="buttonbox">
              <button onClick={() => setActiveComp(1)}>찾아보기</button>
            </div>
          ) : (
            <div className="buttonbox">
              <button onClick={() => setActiveComp(1)}>다시하기</button>
              <button
                onClick={() =>
                  Navigate("/exp/taste/res", {
                    state: { resultData: resultData },
                  })
                }
              >
                결과 확인하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TasteTestStart = ({ taste, handleData, setTaste, setActiveComp }) => {
  console.log(taste);
  return (
    <div className="testcontentbox">
      <div className="maintext">에이센틱이 회원님을 알아가고 싶어요.</div>
      {/* <input
        type="text"
        placeholder="닉네임"
        name="tasteName"
        value={taste.tasteName}
        onChange={(e) =>
          setTaste({
            ...taste,
            [e.target.name]: e.currentTarget.value,
          })
        }
      /> */}
      <div className="testcontent">
        <div className="label">성별</div>
        <button
          className={taste.tasteGender === "man" ? "btnG-active" : "btnG"}
          value="man"
          name="tasteGender"
          onClick={(e) =>
            setTaste({
              ...taste,
              [e.target.name]: e.currentTarget.value,
            })
          }
        >
          남성
        </button>
        <button
          className={taste.tasteGender === "woman" ? "btnG-active" : "btnG"}
          value="woman"
          name="tasteGender"
          onClick={(e) =>
            setTaste({
              ...taste,
              [e.target.name]: e.currentTarget.value,
            })
          }
        >
          여성
        </button>
      </div>
      <div className="testcontent">
        <div className="label">나이</div>
        <input
          type="number"
          name="tasteAge"
          min={8}
          value={taste.tasteAge}
          onChange={handleData}
        />
      </div>
      <div className="testcontent">
        <input
          type="checkbox"
          name="tasteAgree"
          id="tasteAgree"
          checked={taste.tasteAgree}
          onChange={(e) =>
            setTaste({
              ...taste,
              [e.target.name]: e.target.checked,
            })
          }
        />
        <label htmlFor="tasteAgree">
          개인정보수집동의: 본 문항은 결과에는 영향이 없으며 통계목적으로만
          사용됩니다.
        </label>
      </div>
      <div className="orderBtnbox">
        <button className="beforebtn" onClick={() => setActiveComp(0)}>
          이전
        </button>
        <button
          className="nextbtn"
          disabled={
            // (taste.tasteName === "") |
            (taste.tasteAge === "") |
            (taste.tasteGender === "") |
            (taste.tasteAgree === "")
              ? true
              : false
          }
          onClick={() => setActiveComp(2)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const TasteTest1 = ({ taste, handleData, setActiveComp }) => {
  console.log(taste);
  return (
    <div className="testcontentbox">
      <div className="maintext">더 좋아하는 장소의 향을 선택해주세요.</div>
      <div className="testimgBtnbox">
        <button
          className={
            taste.tasteTest1 === 1 ? "testimgBtn-active" : "testimgBtn"
          }
          value={1}
          name="tasteTest1"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={city1} alt="" />
          </div>
          도시
        </button>
        <button
          className={
            taste.tasteTest1 === 2 ? "testimgBtn-active" : "testimgBtn"
          }
          value={2}
          name="tasteTest1"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={nature1} alt="" />
          </div>
          자연
        </button>
      </div>
      <div className="orderBtnbox">
        <button className="beforebtn" onClick={() => setActiveComp(1)}>
          이전
        </button>
        <button
          className="nextbtn"
          disabled={taste.tasteTest1 === "" ? true : false}
          onClick={() => setActiveComp(3)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const TasteTest2 = ({ taste, handleData, setActiveComp }) => {
  return (
    <div className="testcontentbox">
      <div className="maintext">나타내고 싶은 분위기를 선택해주세요.</div>
      <div className="testimgBtnbox">
        <button
          className={
            taste.tasteTest2 === 1 ? "testimgBtn-active" : "testimgBtn"
          }
          value={1}
          name="tasteTest2"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={elegant2} alt="" />
          </div>
          우아함
        </button>
        <button
          className={
            taste.tasteTest2 === 2 ? "testimgBtn-active" : "testimgBtn"
          }
          value={2}
          name="tasteTest2"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={cool2} alt="" />
          </div>
          시원함
        </button>
        <button
          className={
            taste.tasteTest2 === 3 ? "testimgBtn-active" : "testimgBtn"
          }
          value={3}
          name="tasteTest2"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={lively2} alt="" />
          </div>
          발랄함
        </button>
      </div>
      <div className="orderBtnbox">
        <button className="beforebtn" onClick={() => setActiveComp(2)}>
          이전
        </button>
        <button
          className="nextbtn"
          disabled={taste.tasteTest2 === "" ? true : false}
          onClick={() => setActiveComp(4)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
const TasteTest3 = ({ taste, handleData, setActiveComp }) => {
  return (
    <div className="testcontentbox">
      <div className="maintext">원하는 향의 인상을 선택해주세요.</div>
      <div className="testimgBtnbox">
        <button
          className={
            taste.tasteTest3 === 1 ? "testimgBtn-active" : "testimgBtn"
          }
          value={1}
          name="tasteTest3"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={strong3} alt="" />
          </div>
          이미지가 확실하고 강렬한 인상
        </button>
        <button
          className={
            taste.tasteTest3 === 2 ? "testimgBtn-active" : "testimgBtn"
          }
          value={2}
          name="tasteTest3"
          onClick={handleData}
        >
          <div className="testBtnimg">
            <img src={soft3} alt="" />
          </div>
          차분하고 부드러운 인상
        </button>
      </div>
      <div className="orderBtnbox">
        <button className="beforebtn" onClick={() => setActiveComp(3)}>
          이전
        </button>
        <button
          className="nextbtn"
          disabled={taste.tasteTest3 === "" ? true : false}
          onClick={() => setActiveComp(5)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
const TasteTest4 = ({ taste, handleData, setActiveComp }) => {
  return (
    <div className="testcontentbox">
      <div className="maintext">
        자신의 성격유형(에니어그램)을 선택해주세요.
      </div>
      {/* 성격 설명 추후 터치모달로 수정해도 좋을듯 */}
      <div className="enneartext">
        본능형: 존재, 원칙, 의무 / 감정형: 관계, 인정, 사람 / 사고형: 상황,
        이성, 논리{" "}
      </div>
      <div className="testimgBtnbox">
        <button
          className={
            taste.tasteTest4 === 1 ? "testimgBtn-active" : "testimgBtn"
          }
          value={1}
          name="tasteTest4"
          onClick={handleData}
        >
          <div className="testBtnimg2">
            <img src={sense4} alt="" />
          </div>
          본능형
        </button>
        <button
          className={
            taste.tasteTest4 === 2 ? "testimgBtn-active" : "testimgBtn"
          }
          value={2}
          name="tasteTest4"
          onClick={handleData}
        >
          <div className="testBtnimg2">
            <img src={heart4} alt="" />
          </div>
          감정형
        </button>
        <button
          className={
            taste.tasteTest4 === 3 ? "testimgBtn-active" : "testimgBtn"
          }
          value={3}
          name="tasteTest4"
          onClick={handleData}
        >
          <div className="testBtnimg2">
            <img src={think4} alt="" />
          </div>
          사고형
        </button>
      </div>
      <div className="orderBtnbox">
        <button className="beforebtn" onClick={() => setActiveComp(4)}>
          이전
        </button>
        <button
          className="nextbtn"
          disabled={taste.tasteTest4 === "" ? true : false}
          onClick={() => setActiveComp(6)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const TasteTest5 = ({ taste, handleData, setActiveComp }) => {
  const Navigate = useNavigate();
  console.log(taste);

  return (
    <div className="testcontentbox">
      <div className="maintext">싫어하는 향을 선택해주세요.</div>
      <div className="testimgBtnbox">
        <button
          className={
            taste.tasteTest5 === 1 ? "testimgBtn2-active" : "testimgBtn2"
          }
          value={1}
          name="tasteTest5"
          onClick={handleData}
        >
          <div className="testBtnimgmini">
            <img src={water5} alt="" />
          </div>
          물내음
        </button>
        <button
          className={
            taste.tasteTest5 === 2 ? "testimgBtn2-active" : "testimgBtn2"
          }
          value={2}
          name="tasteTest5"
          onClick={handleData}
        >
          <div className="testBtnimgmini">
            <img src={grass5} alt="" />
          </div>
          풀
        </button>
        <button
          className={
            taste.tasteTest5 === 3 ? "testimgBtn2-active" : "testimgBtn2"
          }
          value={3}
          name="tasteTest5"
          onClick={handleData}
        >
          <div className="testBtnimgmini">
            <img src={cinnamon5} alt="" />
          </div>
          시나몬
        </button>
        <button
          className={
            taste.tasteTest5 === 4 ? "testimgBtn2-active" : "testimgBtn2"
          }
          value={4}
          name="tasteTest5"
          onClick={handleData}
        >
          <div className="testBtnimgmini">
            <img src={fruit5} alt="" />
          </div>
          과일
        </button>
        <button
          className={
            taste.tasteTest5 === 5 ? "testimgBtn2-active" : "testimgBtn2"
          }
          value={5}
          name="tasteTest5"
          onClick={handleData}
        >
          <div className="testBtnimgmini">
            <img src={manskin5} alt="" />
          </div>
          남자스킨향
        </button>
      </div>
      <div className="orderBtnbox">
        <button className="beforebtn" onClick={() => setActiveComp(5)}>
          이전
        </button>
        {/* taste에 모든 답변이 존재해야 결과 저장 */}
        <button
          className="nextbtn"
          disabled={taste.tasteTest5 === "" ? true : false}
          onClick={() =>
            Navigate("/exp/taste/res", {
              state: { taste: taste },
            })
          }
        >
          결과보기
        </button>
      </div>
    </div>
  );
};

export default ExpTaste;
