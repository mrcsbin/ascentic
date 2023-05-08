import { useState } from "react";
import "../styles/MyPage.css";

function MyPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="mypage-wrap">
      <div className="info-area">
        <div className="info-img-box">
          <div>
            <p>마이 페이지</p>
          </div>
          <div>
            <img src="asd" alt="" />
          </div>
        </div>
        <div className="name-box">
          <p>닉네임01 바꿔야함</p>
          <button>개인 정보 수정</button>
        </div>
        <div>회원 등급</div>
      </div>
      <div className="side-box">
        <div className="big-tab">
          <h1>나의 쇼핑</h1>
        </div>
        <div className="small-tab">
          <h2
            className={activeTab === 0 ? "active" : ""}
            onClick={() => handleClick(0)}
          >
            주문 내역 조회
          </h2>
          <h2
            className={activeTab === 1 ? "active" : ""}
            onClick={() => handleClick(1)}
          >
            구매 후기
          </h2>
          <h2
            className={activeTab === 2 ? "active" : ""}
            onClick={() => handleClick(2)}
          >
            좋아요
          </h2>
          <h2
            className={activeTab === 3 ? "active" : ""}
            onClick={() => handleClick(3)}
          >
            구독 관리
          </h2>
        </div>
        <div className="big-tab">
          <h1>커뮤니티</h1>
        </div>
        <div className="small-tab">
          <h2
            className={activeTab === 4 ? "active" : ""}
            onClick={() => handleClick(4)}
          >
            게시글 목록
          </h2>
          <h2
            className={activeTab === 5 ? "active" : ""}
            onClick={() => handleClick(5)}
          >
            댓글 목록
          </h2>
          <h2
            className={activeTab === 6 ? "active" : ""}
            onClick={() => handleClick(6)}
          >
            팔로워 | 팔로잉
          </h2>
          <h2
            className={activeTab === 7 ? "active" : ""}
            onClick={() => handleClick(7)}
          >
            무엇으로 할깝숑
          </h2>
        </div>
        <div className="big-tab">
          <h1>고객 서비스</h1>
        </div>
        <div className="small-tab">
          <h2
            className={activeTab === 8 ? "active" : ""}
            onClick={() => handleClick(8)}
          >
            고객 센터
          </h2>
          <h2
            className={activeTab === 9 ? "active" : ""}
            onClick={() => handleClick(9)}
          >
            1:1 문의 내역
          </h2>
          <h2
            className={activeTab === 10 ? "active" : ""}
            onClick={() => handleClick(10)}
          >
            공지 사항
          </h2>
        </div>
      </div>
      <div className="main-area"></div>
    </div>
  );
}

export default MyPage;
