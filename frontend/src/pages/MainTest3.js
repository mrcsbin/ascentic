import React from "react";
import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";
import SPRING from "../assets/main/spring-image.jpg";
import SUMMER from "../assets/main/summer-image.jpg";
import AUTUMN from "../assets/main/autumn-image.jpg";
import WINTER from "../assets/main/winter-image.jpg";

function MainTest3() {
  let options = {
    anchors: ["sectionOne", "sectionTwo", "sectionThree"],
    navigation: false,
    scrollbars: false,
  };

  return (
    <SectionsContainer {...options}>
      <Wrap>
        <Section>
          <SectionOne>
            <ImageBox>
              <Image src={SPRING} alt="" />
            </ImageBox>
          </SectionOne>
        </Section>
        <Section>
          <SectionOne>
            <ImageBox>
              <Image src={SUMMER} alt="" />
            </ImageBox>
          </SectionOne>
        </Section>
        <Section>
          <SectionOne>
            <ImageBox>
              <Image src={AUTUMN} alt="" />
            </ImageBox>
          </SectionOne>
        </Section>
      </Wrap>
    </SectionsContainer>
  );
}

export default MainTest3;

const Wrap = styled.div``;

const SectionOne = styled.div``;

const SectionTwo = styled.div``;

const SectionThree = styled.div``;

const ImageBox = styled.div`
  /* margin-top: 108px; */
  width: 100%;
  height: 100vh;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
