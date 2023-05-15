import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/Cookies";
import TestResult from "../../components/ExpTasteRes";
import "../../styles/ExpTaste.css";

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
  const location = useLocation();

  function handleData(e) {
    setTaste({
      ...taste,
      [e.target.name]: Number(e.currentTarget.value),
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
      setActiveComp(7);
      setTaste(location.state.taste);
      console.log(location);
    }
  }, []);

  // 대기 중일 때
  if (loading) {
    // return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!resultData) {
    return null;
  }

  return (
    <div>
      {activeComp === 0 && (
        <ExpTestMain
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setActiveComp={setActiveComp}
        />
      )}
      {activeComp === 1 && (
        <TasteTestStart
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setTaste={setTaste}
          setActiveComp={setActiveComp}
        />
      )}
      {activeComp === 2 && (
        <TasteTest1
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setActiveComp={setActiveComp}
        />
      )}
      {activeComp === 3 && (
        <TasteTest2
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setActiveComp={setActiveComp}
        />
      )}
      {activeComp === 4 && (
        <TasteTest3
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setActiveComp={setActiveComp}
        />
      )}
      {activeComp === 5 && (
        <TasteTest4
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setActiveComp={setActiveComp}
        />
      )}
      {activeComp === 6 && (
        <TasteTest5
          taste={taste}
          resultData={resultData}
          handleData={handleData}
          setActiveComp={setActiveComp}
        />
      )}
      {/* 설문 후 결과 저장 및 불러오기 */}
      {activeComp === 7 && (
        <ToTestResult
          taste={taste}
          resultData={resultData}
          setActiveComp={setActiveComp}
          setResultData={setResultData}
        />
      )}
      {/* 위에서 불러온 결과 창으로 보여주기 */}
      {activeComp === 8 && (
        <TestResult
          taste={taste}
          resultData={resultData}
          setActiveComp={setActiveComp}
          setResultData={setResultData}
        />
      )}
    </div>
  );
};

const ExpTestMain = ({ resultData, handleData, setActiveComp }) => {
  //파일 따로 생성 (백엔드 axios 연결 필요 - 받아오기)
  return (
    <div>
      <div className="startTaste">
        <img src="#" alt="" />
        <div className="content1">
          <h2>[a]scentic</h2>
          <h3>자신의 향을 찾기 위한 여정</h3>
          <span>취향을 통해 자신을 발견해보세요.</span>
          <span>에이센틱과 함께 당신의 취향을 찾고</span>
          <span>원하는 분위기와 느낌을 가져보세요.</span>
        </div>
        <div className="buttonbox">
          {resultData.firstPlace === "null" ? (
            <button onClick={() => setActiveComp(1)}>찾아보기</button>
          ) : (
            <div>
              <button onClick={() => setActiveComp(1)}>다시하기</button>
              <button onClick={() => setActiveComp(8)} result={resultData}>
                결과 확인하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TasteTestStart = ({
  taste,
  resultData,
  handleData,
  setTaste,
  setActiveComp,
}) => {
  console.log(taste);
  return (
    <div>
      <div>
        <div>에이센틱이 회원님을 어떻게 부르면 좋을까요?</div>
        <input
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
        />
        <div>
          <div>성별</div>
          <button
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
        <div>
          <div>나이</div>
          <input
            type="number"
            name="tasteAge"
            value={taste.tasteAge}
            onChange={handleData}
          />
        </div>
        <div>
          <div>개인정보수집동의</div>
          <input
            type="checkbox"
            name="tasteAgree"
            checked={taste.tasteAgree}
            onChange={(e) =>
              setTaste({
                ...taste,
                [e.target.name]: e.target.checked,
              })
            }
          />
        </div>
        <button onClick={() => setActiveComp(0)}>이전</button>
        <button
          disabled={
            (taste.tasteName === "") |
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

const TasteTest1 = ({ taste, resultData, handleData, setActiveComp }) => {
  console.log(taste);
  return (
    <div>
      <div>
        <div>더 좋아하는 장소의 향을 선택해주세요.</div>
        <button value={1} name="tasteTest1" onClick={handleData}>
          <img src="#" alt="" />
          도시
        </button>
        <button value={2} name="tasteTest1" onClick={handleData}>
          <img src="#" alt="" />
          자연
        </button>
        <button onClick={() => setActiveComp(1)}>이전</button>
        <button
          disabled={taste.tasteTest1 === "" ? true : false}
          onClick={() => setActiveComp(3)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const TasteTest2 = ({ taste, resultData, handleData, setActiveComp }) => {
  return (
    <div>
      <div>
        <div>나타내고 싶은 분위기를 선택해주세요.</div>
        <button value={1} name="tasteTest2" onClick={handleData}>
          <img src="#" alt="" />
          우아함
        </button>
        <button value={2} name="tasteTest2" onClick={handleData}>
          <img src="#" alt="" />
          시원함
        </button>
        <button value={3} name="tasteTest2" onClick={handleData}>
          <img src="#" alt="" />
          발랄함
        </button>
        <button onClick={() => setActiveComp(2)}>이전</button>
        <button
          disabled={taste.tasteTest2 === "" ? true : false}
          onClick={() => setActiveComp(4)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
const TasteTest3 = ({ taste, resultData, handleData, setActiveComp }) => {
  return (
    <div>
      <div>
        <div>원하는 인상의 느낌을 선택해주세요.</div>
        <button value={1} name="tasteTest3" onClick={handleData}>
          <img src="#" alt="" />
          이미지가 확실하고 강렬한 인상을 주는 느낌 수정하자..
        </button>
        <button value={2} name="tasteTest3" onClick={handleData}>
          <img src="#" alt="" />
          차분하고 부드러운 느낌
        </button>
        <button onClick={() => setActiveComp(3)}>이전</button>
        <button
          disabled={taste.tasteTest3 === "" ? true : false}
          onClick={() => setActiveComp(5)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
const TasteTest4 = ({ taste, resultData, handleData, setActiveComp }) => {
  return (
    <div>
      <div>
        <div>자신의 성격을 선택해주세요.</div>
        <div>각 성격마다 설명 필요할듯요</div>
        <button value={1} name="tasteTest4" onClick={handleData}>
          <img src="#" alt="" />
          본능형
        </button>
        <button value={2} name="tasteTest4" onClick={handleData}>
          <img src="#" alt="" />
          감정형
        </button>
        <button value={3} name="tasteTest4" onClick={handleData}>
          <img src="#" alt="" />
          사고형
        </button>
        <button onClick={() => setActiveComp(4)}>이전</button>
        <button
          disabled={taste.tasteTest4 === "" ? true : false}
          onClick={() => setActiveComp(6)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const TasteTest5 = ({
  taste,
  resultData,
  handleData,
  setActiveComp,
  setResultData,
}) => {
  console.log(taste);

  return (
    <div>
      <div>
        <div>싫어하는 향을 선택해주세요.</div>
        <button value={1} name="tasteTest5" onClick={handleData}>
          <img src="#" alt="" />
          물내음
        </button>
        <button value={2} name="tasteTest5" onClick={handleData}>
          <img src="#" alt="" />풀
        </button>
        <button value={3} name="tasteTest5" onClick={handleData}>
          <img src="#" alt="" />
          시나몬
        </button>
        <button value={4} name="tasteTest5" onClick={handleData}>
          <img src="#" alt="" />
          과일
        </button>
        <button value={5} name="tasteTest5" onClick={handleData}>
          <img src="#" alt="" />
          남자스킨향
        </button>
        <button onClick={() => setActiveComp(5)}>이전</button>
        {/* taste에 모든 답변이 존재해야 결과 저장 */}
        <button
          disabled={taste.tasteTest5 === "" ? true : false}
          onClick={() => setActiveComp(7)}
        >
          결과보기
        </button>
      </div>
    </div>
  );
};

const ToTestResult = ({ taste, resultData, setResultData }) => {
  const Navigate = useNavigate();
  const [testloading, setTestloading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setTestloading(true);
      try {
        const res = await axios.post(`http://localhost:8080/tasteTest`, taste, {
          headers: {
            Authorization: "Bearer " + getCookie("accessToken"),
          },
        });
        setResultData(res.data);
        if (res.data.firstPlace === "null") {
          return Navigate("/login", {
            state: { taste: taste, pathname: "/exp/taste" },
          });
        }
      } catch (e) {
        console.log(e);
      }
      setTestloading(false);
    };
    fetchResult();
  }, []);

  // 대기 중일 때
  if (testloading) {
    return (
      <div>
        <img src="#" alt="" />
        <div>결과를 분석중입니다...</div>
      </div>
    );
  }
  // 아직 값이 설정되지 않았을 때
  if (!resultData) {
    return null;
  }
  if (resultData.firstPlace === "null") {
    return;
  }
  //값이 저장되었을 때
  else {
    return (
      <div>
        <div>
          <TestResult resultData={resultData} />
        </div>
      </div>
    );
  }
};

export default ExpTaste;
