import { useLocation } from "react-router-dom";
import "../styles/SignUpSuccess.css";
import LOGO from "../assets/mainwide.jpg";

const SignUpSuccess = () => {
  const location = useLocation();
  const name = location.state.value;

  return (
    <div className="success-wrap">
      <div className="success-header">
        <img src={LOGO} alt="" />
        <h1>
          {name}님의 <br />
          회원가입이 완료되었습니다.
        </h1>
      </div>
      <div className="success-info">
        <p>
          환영합니다 ! <br />
          이제부터 ascentic의 모든 서비스를 이용하실 수 있습니다.
        </p>
        <p>
          *회원가입 내역 확인 및 수정은
          <span>마이페이지 &gt; 개인정보 수정</span> 에서 가능합니다.
        </p>
      </div>
      <div className="success-button">
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          로그인페이지
        </button>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          메인페이지
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccess;
