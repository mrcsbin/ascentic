import React from "react";
import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";
import SPRING_IMAGE from "../assets/main/spring-image.jpg";
import SUMMER_IMAGE from "../assets/main/summer-image.jpg";
import AUTUMN_IMAGE from "../assets/main/autumn-image.jpg";
import WINTER from "../assets/main/winter-image.jpg";
import SPRING_VIDEO from "../assets/main/spring.mp4";
import CITRUS_IMAGE from "../assets/main/citrus1-image.jpg";

function Main() {
  let options = {
    anchors: ["sectionOne", "sectionTwo", "sectionThree"],
    navigation: true,
    scrollbars: false,
    // animation: 5000,
  };

  return (
    <SectionsContainer {...options}>
      <Wrap>
        <Section>
          <SectionOne>
            <ImageBox>
              <Image src={SPRING_IMAGE} alt="" />
            </ImageBox>
            <TextBox>
              <Text></Text>
              <Button></Button>
            </TextBox>
          </SectionOne>
        </Section>
        <Section>
          <SectionTwo>
            <ImageBox>
              <Image src={SUMMER_IMAGE} alt="" />
            </ImageBox>
            {/* <StyledVideo autoPlay muted loop>
              <source src={SPRING_VIDEO} type="video/mp4" />
            </StyledVideo> */}
          </SectionTwo>
        </Section>
        <Section>
          <SectionThree>
            <ImageBox>
              <Image src={CITRUS_IMAGE} alt="" />
            </ImageBox>
          </SectionThree>
        </Section>
      </Wrap>
    </SectionsContainer>
  );
}

export default Main;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const SectionOne = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
`;

const SectionTwo = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
`;

const SectionThree = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
`;

const ImageBox = styled.div`
  /* margin-top: 108px; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const StyledVideo = styled.video`
  width: 100%;
  /* height: 800px; */
`;

const TextBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Text = styled.div`
  font-size: 300px;
`;

const Button = styled.div``;
