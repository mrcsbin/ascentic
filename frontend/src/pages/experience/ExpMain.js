import styled from "styled-components";
import { Link } from "react-router-dom";
import logob from "../../assets/ascentic_logo_b.svg";
import logow from "../../assets/ascentic_logo_w.svg";
import content1 from "../../assets/expMain/expmain_content1.mp4";
import content2 from "../../assets/expMain/expmain_content2_1.webp";
import content2_4 from "../../assets/expMain/expmain_content2_4.webp";
import content3 from "../../assets/expMain/expmain_content3.webp";

const ExpMain = () => {
  return (
    <MainWrapper>
      <Content1>
        <div className="gradientbox"></div>
        <div className="content1_left">
          <video className="midVideo" loop autoPlay muted>
            <source src={content1} type="video/mp4" />
          </video>
        </div>
        <div className="comment1">
          <div>
            <img src={logob} alt="ascentic_logo_black" />
          </div>
          <div>경험을 선물해주는 곳.</div>
          <div>
            Feel the scent
            <br /> 향을 경험해보세요.
            <br /> 맞는 향을 찾기 위해 여정을 떠나고
            <br /> 매달 찾아오는 다른 향기의 선물과 함께
            <br /> 나만의 향을 찾는 과정에 초대합니다.
          </div>
        </div>
      </Content1>

      <Link to="/exp/taste" style={{ textDecoration: "none" }}>
        <Content2>
          <div className="comment2">
            <div>
              <img src={logow} alt="ascentic_logo_white" />
            </div>
            <div>자신의 향을 찾기위한 여정</div>
            <div>
              Find my scent
              <br /> 원하는 향과 분위기에 맞는 Note 찾기.
              <br /> 나만의 향을 찾기 위한 여정의 시작.
              <br /> 에이센틱이 준비한 여정으로 자신을 발견해보세요.
            </div>
            <button>시작하기</button>
          </div>
          <div className="content2_right">
            <img src={content2} alt="ExpMain_content2" />
          </div>
        </Content2>
      </Link>
      <Link to="/exp/subs" style={{ textDecoration: "none" }}>
        <Content3>
          <div className="comment3">
            <div>시향지 패키지 세트로 직접 아홉가지 Note를 체험해보세요.</div>
            <div>
              <div>
                <img src={logob} alt="ascentic_logo_black" />
              </div>
              매달 당신만을 위해 구성한 구독 체험패키지
            </div>
            <div>
              매달 찾아오는 에이센틱의 패키지로 경험해보는 향의 세계.
              <br /> 나의 취향 패키지로 매달 다른 향을 체험해보세요.
              <br /> 취향에 맞는 노트로 에이센틱이 직접 구성하여 보내드립니다.
            </div>
            <button>참여하기</button>
          </div>
        </Content3>
      </Link>
    </MainWrapper>
  );
};

export default ExpMain;

const MainWrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  overflow: auto;
`;

const Content1 = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  background-color: white;
  justify-content: space-between;
  align-items: flex-end;

  .gradientbox {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 900;
    width: 100%;
    height: 200px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }

  .content1_left {
    width: 65vw;
    height: 800px;
    overflow: hidden;
  }
  .content1_left > .midVideo {
    width: 65vw;
    height: 800px;
    object-fit: cover;
    object-position: 0 65%;
  }

  .comment1 {
    width: fit-content;
    height: 100%;
    padding: 2vw 5vw;
    font-family: "Pretendard";
    text-align: right;
  }
  .comment1 > div:nth-child(1) {
    display: inline-block;
    width: 200px;
    margin: 0.3rem 0;
    overflow: hidden;
  }
  .comment1 > div:nth-child(1) > img {
    width: 200px;
    object-fit: cover;
    object-position: center;
  }
  .comment1 > div:nth-child(2) {
    font-size: 2.2rem;
    font-weight: 600;
  }
  .comment1 > div:nth-child(3) {
    margin-top: 1.5rem;
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.5;
  }
`;

const Content2 = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  background-color: black;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;

  .content2_right {
    width: 55vw;
    height: 600px;
    overflow: hidden;
  }
  .content2_right > img {
    width: 55vw;
    height: 600px;
    object-fit: cover;
    object-position: center;
  }

  .comment2 {
    width: 35vw;
    height: 100%;
    padding: 2vw 5vw;
    font-family: "Pretendard";
    color: white;
    text-align: left;
  }
  .comment2 > div:nth-child(1) {
    display: inline-block;
    width: 180px;
    margin: 0.3rem 0;
    overflow: hidden;
  }
  .comment2 > div:nth-child(1) > img {
    width: 180px;
    object-fit: cover;
    object-position: center;
  }
  .comment2 > div:nth-child(2) {
    font-size: 2rem;
    font-weight: 600;
  }
  .comment2 > div:nth-child(3) {
    margin: 2rem 0;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.5;
  }
  button {
    padding: 0.8rem 3rem;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    border: 1.5px solid white;
    background-color: black;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: white;
      font-weight: 600;
      color: black;
    }
  }
`;

const Content3 = styled.div`
  margin-top: 3rem;
  display: flex;
  width: 100%;
  height: 600px;
  justify-content: center;
  align-items: center;
  background-image: url(${content3});
  background-repeat: no-repeat;
  background-position: 0 60%;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.3); /* 배경 색상 설정 */
  background-blend-mode: darken; /* 혼합 모드 설정 */

  .comment3 {
    margin: 0;
    padding: 40px 0;
    width: 100%;
    text-align: center;
    font-family: "Pretendard";
    color: black;
    background-color: rgba(256, 256, 256, 0.6);
  }

  .comment3 > div:nth-child(1) {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .comment3 > div:nth-child(2) {
    margin: 2rem auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    font-size: 2rem;
    font-weight: 600;
  }
  .comment3 > div:nth-child(2) > div:nth-child(1) {
    display: inline-block;
    width: 180px;
    margin: 0 1rem;
    overflow: hidden;
  }
  .comment3 > div:nth-child(2) > div:nth-child(1) > img {
    width: 180px;
    object-fit: cover;
    object-position: center;
  }
  .comment3 > div:nth-child(3) {
    margin-top: 2rem;
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.7;
  }

  button {
    padding: 0.8rem 4rem;
    margin-top: 2rem;
    font-size: 1.1rem;
    font-weight: 400;
    border: 1.5px solid black;
    background-color: black;
    color: white;
    cursor: pointer;
    &:hover {
      font-weight: 500;
      border: 1.5px solid white;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;
