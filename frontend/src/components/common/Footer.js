import React from "react";
import "../../styles/Footer.css";
import { Link } from "react-router-dom";

//HSM
//RouteTest.js 에 임시로 연결

const Footer = () => {
  return (
    <div className="footer">
      {/* <hr className="footerSeparator" /> */}
      <section className="footerWrapper">
        <br />
        <section className="footerInfoFirst">
          주) [a]scentic | 사업자등록번호: 000-00-00000 | 대표자: 나해성 |
          서울특별시 마포구 어울마당로0길 00 | 대표번호: 1234-5678 | 이메일:
          cs@ascentic.com
        </section>
        <section className="footerInfoSecond">
          개인정보 보호 책임자: 팀장 나해성 | 호스팅 서비스 사업자: 멀티캠퍼스 |
          통신판매업신고: 아직없습니다 |{" "}
          <Link
            to="/storemain"
            style={{ textDecoration: "none", color: "black" }}
          >
            개인정보처리방침
          </Link>{" "}
          |{" "}
          <Link
            to="/storemain"
            style={{ textDecoration: "none", color: "black" }}
          >
            이용약관
          </Link>
        </section>
        <br />
        <section className="footerInfoThird">© Taste Lab 대한민국</section>
        <br />
      </section>
    </div>
  );
};

export default Footer;
