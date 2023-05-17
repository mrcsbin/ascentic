import styled from "styled-components";
import ASCENTIC_LOGO from "../assets/mainImage.svg";

const Withdrawal = () => {
  return (
    <Wrap>
      <Header>
        <HeaderImage src={ASCENTIC_LOGO} alt="홈페이지 로고" />
        <HeaderContent>그동안 이용해주셔서 감사합니다.</HeaderContent>
      </Header>
      <Section>
        <BodyContent></BodyContent>
        <GotoMainButton></GotoMainButton>
      </Section>
    </Wrap>
  );
};

export default Withdrawal;

const Wrap = styled.div``;

const Header = styled.div``;

const HeaderImage = styled.img``;

const HeaderContent = styled.div``;

const Section = styled.div``;

const BodyContent = styled.div``;

const GotoMainButton = styled.button``;
