import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/Cookies";
import "../../styles/ExpTaste.css";
import Loading from "../../components/common/Loading";

const TestResult = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [resultData, setResultData] = useState();

  const [testloading, setTestloading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setTestloading(true);
      try {
        const res = await axios.post(
          `http://localhost:8080/tasteTest`,
          location.state.taste,
          {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          }
        );
        setResultData(res.data);
        if (res.data.firstPlace === "null") {
          return Navigate("/login", {
            state: { taste: location.state.taste, pathname: "/exp/taste/res" },
          });
        }
      } catch (e) {
        console.log(e);
      }
      setTestloading(false);
    };
    if (location.state.taste) {
      fetchResult();
    } else if (location.state.resultData) {
      setResultData(location.state.resultData);
    }
  }, []);

  //9가지 경우의 수로 향 소개 및 소분류 명칭-설명 저장
  const resultpage = [
    {
      noteName: "Animal",
      noteInfo:
        "애니멀 노트는 동물의 향에서 유래된 묵직한 향조로, 다른 향조와 밸런스를 맞추면 고급 스러우면서도 관능적인 느낌을 자아냅니다. 동물성 향료로 만들어진 모든 향을 일반적으로 애니멀릭이라 통칭합니다. 애니멀릭은 향의 인상이 강해 단독으로 쓰기보다는 다른 향과 조합하여 주로 베이스 노트로 사용합니다. 주로 관능적이고 섹시한 느낌을 주며 향기의 밸런스를 맞춰주고 향의 풍미가 깊어지게 해주는 효과가 뛰어납니다. 대표적인 애니멀릭으로는 사향노루의 사향낭에서 얻은 향인 Musk, 향유고래의 위석에서 얻은 Ambergris, 사향고양이에서 얻은 Civet향이 있으며 현재 많은 애니멀 노트는 화학성분을 원료로 한 합성향료로 대체되었습니다.",
      scentName1: "Musk",
      scentName2: "Ambergris",
      scentName3: "Civet",
    },
    {
      noteName: "Woody",
      noteInfo:
        "우디 노트는 나무나 목재 에서 나는 담백한 향조로, 무게감 있게 향의 중심을 잡아주어 차분하고 고급 스러운 향을 연출합니다. 우디는 나무의 껍질이나 향목을 연상시키는 은은한 향이 특징인 향입니다. 우디 타입이라고 말하는 향수는 적지만 대부분의 향수가 우디 향을 포함하고 있습니다. 우디 계열은 향이 안정적이고 중후한 매력을 지니기 때문에 베이스 노트에 주로 사용됩니다. 대표적인 향으로 샌달우드(백단향), 시더우드가 있으며 특히 샌달우드의 경우 고가의 원료입니다.",
      scentName1: "Sandalwood",
      scentName2: "Cedarwook",
      scentName3: "Hinoki",
    },
    {
      noteName: "Herbal&Green",
      noteInfo:
        "허브&그린 노트는 라벤더 등 허브 향이나 풀잎을 비볐을 때 나는 신선한 향조로, 프레시한 이미지를 표현하며 자연의 푸릇한 향을 느낄 수 있습니다. 허벌은 라벤더나 로즈마리, 페퍼민트 등의 허브류에서 느낄 수 있는 향입니다. 향수에서는 안정감과 청량감을 주기 위해서 사용됩니다. 아로마 테라피에서 느낄 수 있는 포근함과 안정감을 느낄 수 있습니다. 그린은 풀과 나뭇잎을 연상시키는 향입니다. 나무의 향을 표현하는 우디와는 다르게 신선하지만 거칠지는 않습니다. 숲 속에서 느끼는 풀내음을 느낄 수 있으며 신선하고 깔끔한 향을 표현하기 위해 탑 노트에서 주로 사용됩니다.",
      scentName1: "Lavender",
      scentName2: "Eucalyptus",
      scentName3: "Hyacinth",
    },
    {
      noteName: "Floral",
      noteInfo:
        "플로럴 노트는 꽃에서 나는 향긋한 향조로, 꽃에 따라 우아하고 클래식하거나 관능적인 향으로 연출되어 향을 표현할 때 가장 중요한 노트 중 하나입니다. 플로랄은 꽃 향기를 내는 향으로 거의 대부분의 향수가 플로럴향을 포함합니다. 대표적인 플로랄 원료로는 장미, 쟈스민, 백합, 은방울꽃, 이아신스, 수선화, 라일락 등이 있습니다.",
      scentName1: "Rose",
      scentName2: "Jasmin",
      scentName3: "Lilac",
    },
    {
      noteName: "Mossy",
      noteInfo:
        "모시 노트는 우거진 숲속의 촉촉하게 젖은 이끼 향조로, 프레시한 그린이 아닌 다운된 그린을 연상시킵니다. 가볍게 표현되는 노트의 향을 차분하게 만들어주어 그윽한 분위기를 연출합니다. 모시는 촉촉하게 젖은 이끼와 비온 뒤의 숲에서 느낄 수 있는 상쾌함을 주는 향입니다. 모스(Moss) 향은 그린 향의 신선함과 우디의 중후한 느낌이 조화롭게 어울린 느낌입니다. 보통 오크모스(oakmoss)향이라 부르며 종류를 크게 구분짓지 않고 모스 향료로 향을 만듭니다. 플로랄이나 애니멀릭과 조합하여 여성 향수를 만들거나 우디 계열과 조합하여 남성 향수를 만듭니다.",
      scentName1: "OakMoss",
      scentName2: "TreeMoss",
      scentName3: "Moss",
    },
    {
      noteName: "Citrus",
      noteInfo:
        "시트러스 노트는 감귤 계열의 상큼한 향조로, 향수의 첫인상 을 표현하는 데 주로 사용되는 향입니다. 다운된 기분을 리프레시 시켜주며, 다크해질 수 있는 향을 기분 좋게 끌어올려 줍니다. 시트러스는 감귤류의 향을 표현한 향입니다. 감귤류 특유의 시원함과 상큼함이 잘 나타납니다. 시트러스는 향기의 휘발성과 확산성이 뛰어나 탑 노트에 주로 사용되거나 코롱 계열의 향수에서 주로 사용됩니다.",
      scentName1: "Bergamot",
      scentName2: "Lemon",
      scentName3: "Orange",
    },
    {
      noteName: "Fruity",
      noteInfo:
        "프루티 노트는 감귤 계열의 향을 제외한 모든 달콤한 과일 향조로, 통통 튀는 이미지를 표현하거나 향에 변주를 주기 위해 사용합니다. 프루티는 시트러스의 향을 제외한 나머지 다양한 과일향들을 표현한 향입니다. 복숭아, 딸기, 메론, 파인애플, 바나나 등 과일을 이용한 향으로 상큼하고 달콤한 향을 느낄 수 있습니다.",
      scentName1: "Apple",
      scentName2: "Peach",
      scentName3: "Melon",
    },
    {
      noteName: "Watery&Powdery",
      noteInfo:
        "워터리&파우더리 노트는 물이나 바다, 파우더 가루의 부드러운 향조로, 사용되는 향료에 따라 투명하거나 묵직한 느낌을 표현합니다. 워터리는 시원하고 신선한 느낌을 주는 향입니다. 남자 스킨 향이나 오이향과 비슷해서 꺼리기도 하지만 다른 향과 조화되면 상쾌하고 시원한 느낌을 주는 향입니다. 특유의 시원함으로 주로 여름에 사용합니다. 파우더리는 벨벳이나 파우더 같은 부드러운 느낌을 표현한 향입니다. 흔히 생각하는 화장품 향이나 베이비 파우더 향을 연상시키는 향입니다. 주로 여성 향수에 사용되지만 남성 향수에서도 부드러움을 표현하기 위해서 소량 사용되기도 합니다.",
      scentName1: "Aldehydal",
      scentName2: "Vanilla",
      scentName3: "Marine",
    },
    {
      noteName: "Special",
      noteInfo:
        "스페셜 노트는 향에 포인트를 줄 수 있는 향조로, 향신료와 같은 스파이시한 향기나 담뱃잎에서 느낄 수 있는 궐련향 등 유니크한 향을 연출합니다. 스파이시는 향수의 전체 베이스가 되기 보다는 다른 향을 돋보이거나 첫 인상을 강하게 주고자 할 때 사용됩니다. 향신료들이 지니는 자극적인 향을 지녔으며 특유의 톡 쏘는 향으로 첫 느낌을 강하게 줄 수 있습니다. 스파이시 향이 함께 사용되는 경우 동물계열이나 우디 계열의 향을 더 돋보이게 해주며 주로 남성 향수에 사용됩니다. 타바코-레더는 연초와 가죽의 향이 어우러진 남성적인 향입니다. 자작나무 타르와 잎 담배, 가죽의 향이 인상적이며 동물적인 감각이 돗보이는 남성 향수에 주로 쓰이는 향입니다. 스파이시처럼 메인 향으로 사용되기 보다는 다른 향과 조화하여 사용됩니다.",
      scentName1: "Cinnamon",
      scentName2: "Tabacco",
      scentName3: "Pepper",
    },
  ];

  const TasteResultview = ({ place }) => {
    //이미지파일 확장자 jpg나 png로 통일
    return (
      <div>
        <div className="info">에이센틱이 찾은 당신의 향</div>
        <div className="notename">{place.noteName}</div>
        <div className="noteimg">
          <img
            src={`http://localhost:8080/images/${place.noteName}.webp`}
            alt=""
          />
        </div>
        <div className="scentsbox">
          <div className="scentbox">
            <div className="scentimg">
              <img
                src={`http://localhost:8080/images/${place.scentName1}.webp`}
                alt=""
              />
            </div>
            <div className="scentname">{place.scentName1}</div>
          </div>
          <div className="scentbox">
            <div className="scentimg">
              <img
                src={`http://localhost:8080/images/${place.scentName2}.webp`}
                alt=""
              />
            </div>
            <div className="scentname">{place.scentName2}</div>
          </div>
          <div className="scentbox">
            <div className="scentimg">
              <img
                src={`http://localhost:8080/images/${place.scentName3}.webp`}
                alt=""
              />
            </div>
            <div className="scentname">{place.scentName3}</div>
          </div>
        </div>
        <div className="noteinfo">{place.noteInfo}</div>
      </div>
    );
  };

  // 대기 중일 때
  if (testloading) {
    return (
      // <div>
      //   <img src="#" alt="" />
      //   <div>결과를 분석중입니다...</div>
      // </div>
      <Loading />
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
    const firstPlace = resultpage.filter(
      (r) => r.noteName === resultData.firstPlace
    );
    const secondPlace = resultpage.filter(
      (r) => r.noteName === resultData.secondPlace
    );
    const thirdPlace = resultpage.filter(
      (r) => r.noteName === resultData.thirdPlace
    );
    //result 는 TasteResultDTO형태임
    return (
      <div className="testresbox">
        <div className="firstTaste">
          <TasteResultview place={firstPlace[0]} />
        </div>
        <div className="resbtnbox">
          <Link className="retrybtn" to="/exp/taste">
            다시하기
          </Link>
          <Link className="subsbtn" to="/exp/subs">
            체험 패키지 구독 신청하러 가기
          </Link>
        </div>
        {/* <div className="secondTaste">
        <TasteResultview place={secondPlace[0]} />
      </div>
      <div className="thirdTaste">
        <TasteResultview place={thirdPlace[0]} />
      </div> */}
      </div>
    );
  }
};

export default TestResult;
