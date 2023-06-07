import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SectionsContainer, Section } from "react-fullpage";
import SPRING_IMAGE from "../assets/main/spring6.webp";
import SUMMER_IMAGE from "../assets/main/summer5.webp";
import FALL_IMAGE from "../assets/main/fall5.webp";
import WINTER_IMAGE from "../assets/main/winter2.webp";
import SPRING_VIDEO from "../assets/main/spring4.mp4";
import SUMMER_VIDEO from "../assets/main/summer4.mp4";
import FALL_VIDEO from "../assets/main/fall5.mp4";
import WINTER_VIDEO from "../assets/main/winter3.mp4";

function Main() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let options = {
    anchors: ["sectionOne", "sectionTwo", "sectionThree", "sectionFour"],
    navigation: true,
    scrollbars: true,
    // animation: 5000,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 이미지버전 */}
      {/* <SectionsContainer {...options}>
        <Wrap>
          <Section>
            <SectionOne>
              <ImageBox>
                <Image src={SPRING_IMAGE} alt="" />
              </ImageBox>
              <TextBox1>
                <TextWrapper>
                  <TextS>에이센틱과 함께하는 여정에서</TextS>
                  <TextS>나를 위한 향을 찾아보세요.</TextS>
                  <Text>ascentic test</Text>
                  <Button to="/exp/taste">알아보기</Button>
                </TextWrapper>
              </TextBox1>
            </SectionOne>
          </Section>
          <Section>
            <SectionTwo>
              <ImageBox>
                <Image src={SUMMER_IMAGE} alt="" />
              </ImageBox>
              <TextBox2>
                <TextWrapper>
                  <TextS>에이센틱이 선물하는</TextS>
                  <TextS>향기로운 체험을 매달 경험해보세요.</TextS>
                  <Text>ascentic subscribe</Text>
                  <Button to="/exp/subs">체험하기</Button>
                </TextWrapper>
              </TextBox2>
            </SectionTwo>
          </Section>
          <Section>
            <SectionThree>
              <ImageBox>
                <Image src={FALL_IMAGE} alt="" />
              </ImageBox>
              <TextBox3>
                <TextWrapper>
                  <TextS>에이센틱과 함께</TextS>
                  <TextS>일상을 향기로 가득 채우는 경험</TextS>
                  <Text>ascentic store</Text>
                  <Button to="/storemain/">쇼핑하기</Button>
                </TextWrapper>
              </TextBox3>
            </SectionThree>
          </Section>
          <Section>
            <SectionFour>
              <ImageBox>
                <Image src={WINTER_IMAGE} alt="" />
              </ImageBox>
              <TextBox4>
                <TextWrapper>
                  <TextS>에이센틱이 준비한</TextS>
                  <TextS>특별한 이벤트에 참여하세요.</TextS>
                  <Text>ascentic event</Text>
                  <Button to="/community/event">보러가기</Button>
                </TextWrapper>
              </TextBox4>
            </SectionFour>
          </Section>
        </Wrap>
      </SectionsContainer> */}
      {/* 비디오버전 */}
      <SectionsContainer {...options}>
        <Wrap>
          <Section>
            <SectionOne>
              <StyledVideo autoPlay muted loop>
                <source src={SPRING_VIDEO} type="video/mp4" />
              </StyledVideo>
              <TextBox1>
                <div className="textwrapper">
                  <TextS>에이센틱과 함께하는 여정에서</TextS>
                  <TextS>나를 위한 향을 찾아보세요.</TextS>
                  <Text>ascentic test</Text>
                  <Button to="/exp/taste">알아보기</Button>
                </div>
              </TextBox1>
            </SectionOne>
          </Section>
          <Section>
            <SectionTwo>
              <StyledVideo autoPlay muted loop>
                <source src={SUMMER_VIDEO} type="video/mp4" />
              </StyledVideo>
              <TextBox2>
                <div className="textwrapper">
                  <TextS>에이센틱이 선물하는</TextS>
                  <TextS>향기로운 체험을 매달 경험해보세요.</TextS>
                  <Text>ascentic subscribe</Text>
                  <Button to="/exp/subs">체험하기</Button>
                </div>
              </TextBox2>
            </SectionTwo>
          </Section>
          <Section>
            <SectionThree>
              <StyledVideo autoPlay muted loop>
                <source src={FALL_VIDEO} type="video/mp4" />
              </StyledVideo>
              <TextBox3>
                <div className="textwrapper">
                  <TextS>에이센틱과 함께</TextS>
                  <TextS>일상을 향기로 가득 채우는 경험</TextS>
                  <Text>ascentic store</Text>
                  <Button to="/storemain/">쇼핑하기</Button>
                </div>
              </TextBox3>
            </SectionThree>
          </Section>
          <Section>
            <SectionFour>
              <StyledVideo autoPlay muted loop>
                <source src={WINTER_VIDEO} type="video/mp4" />
              </StyledVideo>
              <TextBox4>
                <div className="textwrapper">
                  <TextS>에이센틱이 준비한</TextS>
                  <TextS>특별한 이벤트에 참여하세요.</TextS>
                  <Text>ascentic event</Text>
                  <Button to="/community/event">보러가기</Button>
                </div>
              </TextBox4>
            </SectionFour>
          </Section>
        </Wrap>
      </SectionsContainer>
    </>
  );
}

export default Main;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 107px;
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

const SectionFour = styled.div`
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
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  object-fit: cover;
  object-position: top center;
`;

const StyledVideo = styled.video`
  width: 100%;
  /* height: 800px; */
`;

const TextBox1 = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 65%;
  .textwrapper {
    width: 30%;
    margin: 0 auto;
    padding: 30px 0;
    /* border: 1.5px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
`;
const TextBox2 = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 34%;
  .textwrapper {
    width: 30%;
    margin: 0 16%;
    padding: 30px 0;
    /* border: 1.5px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
`;
const TextBox3 = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
  top: 65%;
  .textwrapper {
    width: 30%;
    margin: 0 20%;
    margin-left: 60%;
    padding: 30px 0;
    /* border: 1.5px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;
    color: white;
    text-align: right;
  }
`;
const TextBox4 = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 84%;
  .textwrapper {
    width: 30%;
    margin: 0 15%;
    padding: 30px 0;
    /* border: 1.5px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: white;
  }
`;

const TextS = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 5px 0;
`;
const Text = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 10px 0;
`;
const Button = styled(Link)`
  margin: 0;
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: 2.5px solid white;
  text-decoration: none;
  background-color: transparent;
  color: white;
  font-weight: 700;
  &:hover {
    background-color: rgba(256, 256, 256, 0.5);
    color: white;
    font-weight: 700;
  }
`;
