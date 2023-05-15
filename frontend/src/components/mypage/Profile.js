import styled from "styled-components";
import TEST_IMAGE from "../../assets/mainwide.jpg";

export const Profile = () => {
  return (
    // <>
    //   <ProfileArea>
    //     <ProfileImageBox>
    //       <ProfileImage src={TEST_IMAGE} alt="프로필 이미지" />
    //       <ProfileImageChangePara>프로필 이미지 수정</ProfileImageChangePara>
    //     </ProfileImageBox>
    //     <ProfileInfoBox>
    //       <ProfileInfoContainer>
    //         <ProfileNameContainer>
    //           <ProfileName>섬빔섬빔</ProfileName>
    //           <ProfileChangeParaContainer>
    //             <ProfileChangePara>개인 정보 수정</ProfileChangePara>
    //           </ProfileChangeParaContainer>
    //         </ProfileNameContainer>
    //         <ProfileMemberGrade>회원 등급(개인 정보 수정)</ProfileMemberGrade>
    //       </ProfileInfoContainer>
    //       <PointContainer>포인트</PointContainer>
    //       <ReviewContainer>리뷰</ReviewContainer>
    //       <FollowFollowerContainer>팔로우/팔로워</FollowFollowerContainer>
    //     </ProfileInfoBox>
    //   </ProfileArea>
    // </>
    <ProfileWrap>
      <ProfileArea>
        <ProfileImageBox>
          <ProfileImage src={TEST_IMAGE} alt="프로필 이미지" />
        </ProfileImageBox>
        <ProfileInfoBox>
          <ProfileInfoContainer>
            <ProfileName>섬빔섬빔</ProfileName>
            <ProfileChangeParaBox>
              <ProfileChangePara>개인 정보 수정</ProfileChangePara>
            </ProfileChangeParaBox>
          </ProfileInfoContainer>
          <PointContainer>
            <PointHeader>포인트</PointHeader>
            <PointContent>8,000 원</PointContent>
          </PointContainer>
          <ReviewContainer>
            <ReviewHeader>리뷰</ReviewHeader>
            <ReviewContent>0 개</ReviewContent>
          </ReviewContainer>
          <FollowFollowerContainer>
            <FollowFollowerHeader>알림(?)</FollowFollowerHeader>
            <FollowFollowerContent>0 개</FollowFollowerContent>
          </FollowFollowerContainer>
        </ProfileInfoBox>
      </ProfileArea>
    </ProfileWrap>
  );
};

// 회원 등급 O
// const ProfileArea = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   padding: 50px 0;
//   margin: 0px auto;
//   color: black;
//   display: flex;
// `;

// const ProfileImageBox = styled.div`
//   width: 200px;
//   text-align: center;
// `;

// const ProfileImage = styled.img`
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   margin: 20px;
// `;

// const ProfileImageChangePara = styled.div`
//   color: grey;
//   opacity: 0.5;
//   :hover {
//     color: black;
//     opacity: 1;
//     cursor: pointer;
//   }
// `;

// const ProfileInfoBox = styled.div`
//   display: flex;
// `;

// const ProfileInfoContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `;

// const ProfileNameContainer = styled.div`
//   position: relative;
//   display: flex;
//   margin: 20px 0;
// `;

// const ProfileName = styled.div`
//   font-size: 35px;
//   font-weight: 900;
// `;

// const ProfileChangeParaContainer = styled.div`
//   width: 120px;
//   display: flex;
//   justify-content: flex-end;
// `;

// const ProfileChangePara = styled.p`
//   position: absolute;
//   bottom: 0;
//   color: grey;
//   opacity: 0.5;
//   cursor: pointer;
//   :hover {
//     color: black;
//     opacity: 1;
//   }
// `;

// const ProfileMemberGrade = styled.div``;

// const PointContainer = styled.div``;

// const ReviewContainer = styled.div``;

// const FollowFollowerContainer = styled.div``;

// 회원 등급 X
const ProfileWrap = styled.div`
  padding: 0px 240px;
  background: wheat;
`;

const ProfileArea = styled.div`
  box-sizing: border-box;
  position: relative;
  padding: 35px;
  margin: 0px auto;
  color: black;
  display: flex;
`;

const ProfileImageBox = styled.div`
  width: 25%;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 20px;
`;

const ProfileInfoBox = styled.div`
  width: 75%;
  display: flex;
`;

const ProfileInfoContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProfileName = styled.div`
  margin: 20px 0;
  font-size: 35px;
  font-weight: 900;
`;

const ProfileChangeParaBox = styled.div``;

const ProfileChangePara = styled.p`
  color: grey;
  opacity: 0.5;
  cursor: pointer;
  display: inline-block;
  :hover {
    color: black;
    opacity: 1;
  }
`;

const PointContainer = styled.div`
  width: 20%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
`;

const PointHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 25px;
  font-weight: 700;
`;

const PointContent = styled.div`
  text-align: center;
`;

const ReviewContainer = styled.div`
  width: 20%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
`;

const ReviewHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 25px;
  font-weight: 700;
`;

const ReviewContent = styled.div`
  text-align: center;
`;

const FollowFollowerContainer = styled.div`
  width: 20%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
`;

const FollowFollowerHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 25px;
  font-weight: 700;
`;

const FollowFollowerContent = styled.div`
  text-align: center;
`;
