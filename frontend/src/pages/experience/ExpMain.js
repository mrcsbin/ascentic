import { styled } from "styled-components";
import mainImg from "../../assets/expMain/expMaiImg1.png";
import { Link } from "react-router-dom";

const ExpMain = () => {
  return (
    <MainWrapper>
      <Content1>
        <div className="content1_left"></div>
        <div className="content1_right">
          <div className="comment1">
            <div>
              ascentic
              <br />
              경험을 만들어주는...
            </div>
            <div>
              find your scent
              <br /> 어쩌구 저쩌구 이러이러한 서비스
              <br /> 내게 맞는 향을 찾기 위해 어쩌구
              <br /> 매달 찾아오는 다른 향기로 원하는 분위기
              <br /> 찾아보세요 구독서비스 워라워라
            </div>
          </div>
        </div>
      </Content1>
      <Content2>
        <div className="content2_left">
          <div className="comment2">
            <div>
              ascentic
              <br />
              자신의 향을 찾기위한 여정
            </div>
            <div>
              find me
              <br /> 원하는 향과 분위기를 찾아 ascentic의 제품을 추천받아
              <br /> 자신을 발견해보세요 ~~~
            </div>
            <Link to="/exp/taste">
              <button>find my scent</button>
            </Link>
          </div>
        </div>
        <div className="content2_right"></div>
      </Content2>
      <Content3>
        <div className="comment3">
          <div>구독 서비스 신청 페이지(시향지, 샘플)</div>
          <div>ascentic 자신의 향을 찾기위한 여정</div>
          <div>매달 찾아오는 ascentic의 패키지로 경험해보는 향의 세계 ~~~</div>
          <Link to="/exp/subs">
            <button>참여하기</button>
          </Link>
        </div>
      </Content3>
    </MainWrapper>
  );
};

export default ExpMain;

const MainWrapper = styled.div`
  width: 1920px;
  height: 2100px;
  /* background-color: blue; */
`;

const Content1 = styled.div`
  width: 100%;
  height: 638px;
  background-color: white;
  display: flex;

  .content1_left {
    width: 1120px;
    height: 100%;
    background-image: url(${mainImg});
  }

  .content1_right {
    /* background-color: red; */
    width: 800px;
    height: 100%;
  }

  .comment1 {
    margin-top: 375px;
    margin-left: 200px;
    width: 500px;
    text-align: right;
  }

  .comment1 > div:nth-child(1) {
    font-size: 48px;
    font-weight: 600;
  }

  .comment1 > div:nth-child(2) {
    margin-top: 30px;
    font-size: 25px;
  }
`;

const Content2 = styled.div`
  width: 100%;
  height: 638px;
  margin-top: 30px;
  background-color: red;
  display: flex;

  .content2_left {
    background-color: black;
    width: 870px;
    height: 100%;
  }

  .content2_right {
    width: 1050px;
    height: 100%;
    background-image: url(${mainImg});
  }

  .comment2 {
    margin-top: 130px;
    margin-left: 50px;
    width: 700px;
    text-align: right;
    color: white;
  }

  .comment2 > div:nth-child(1) {
    font-size: 48px;
    font-weight: 600;
  }

  .comment2 > div:nth-child(2) {
    margin-top: 70px;
    font-size: 25px;
  }

  button {
    margin-top: 70px;
    width: 200px;
    height: 55px;
    border: 1px solid white;
    background-color: black;
    color: white;
  }
`;

const Content3 = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 765px;
  display: flex;
  background-image: url(${mainImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.5); /* 배경 색상 설정 */
  background-blend-mode: lighten; /* 혼합 모드 설정 */

  .comment3 {
    margin-top: 250px;
    margin-left: 600px;
    width: 700px;
    text-align: center;
  }

  .comment3 > div:nth-child(1) {
    font-size: 30px;
    font-weight: 600;
  }
  .comment3 > div:nth-child(2) {
    margin-top: 50px;
    font-size: 30px;
  }

  .comment3 > div:nth-child(3) {
    margin-top: 30px;
  }

  button {
    margin-top: 70px;
    width: 200px;
    height: 55px;
    border: 1px solid black;
    background-color: black;
    color: white;
  }
`;
