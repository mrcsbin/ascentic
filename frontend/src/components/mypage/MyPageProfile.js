import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../store/modules/mypage";
import { MyPageProfileOrder } from "./MyPageProfileOrder";
import { MyPageProfileSubscribe } from "./MyPageProfileSubscribe";
import { useState } from "react";
import { getMyPageProfile, updateProfileImg } from "../../api/MemberApi";
import { getCookie } from "../../utils/Cookies";

function addComma(num) {
  if (num === undefined) {
    return 0;
  } else {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
}

export const MyPageProfile = () => {
  const [showNotification, setShowNotification] = useState(false);
  const fileInput = useRef(null);
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const DefaultProfileImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const changeHandle = async (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
    const imageFormData = new FormData();
    imageFormData.append("profileImg", imageFile);
    await updateProfileImg(getCookie("accessToken"), imageFormData);
    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await getMyPageProfile(getCookie("accessToken"));
      setProfileData(response);
      dispatch(setActiveTab(""));
      setIsLoading(false);
      if (response.profileImage === null) {
        setImage(DefaultProfileImageURL);
      } else {
        setImage(`http://localhost:8080/images/${response.profileImage}`);
      }
    };
    fetchProfileData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Wrap>
        <LeftBox>
          <ImageBox>
            <Image src={image} />
          </ImageBox>
          <ProfileBox>
            <ProfileName>{profileData.profileName}</ProfileName>
            <ProfileEmail>{profileData.profileEmail}</ProfileEmail>
            <ImageUpload
              type="file"
              accept="image/*"
              name="image"
              ref={fileInput}
              onChange={changeHandle}
            ></ImageUpload>
            <ProfileButton
              onClick={() => {
                fileInput.current.click();
              }}
            >
              이미지 변경
            </ProfileButton>
            <TasteButton to="/exp/taste">취향 테스트</TasteButton>
          </ProfileBox>
        </LeftBox>
        <RightBox>
          <WishButton to="/mypage/wishlist">
            <RightButtonContentValue>
              {profileData.wishCount}
            </RightButtonContentValue>
            <RightButtonContentName>관심 상품</RightButtonContentName>
          </WishButton>
          <PointButton>
            <RightButtonContentValue>
              {addComma(profileData.point)}
            </RightButtonContentValue>
            <RightButtonContentName>포인트</RightButtonContentName>
          </PointButton>
        </RightBox>
      </Wrap>
      <MyPageProfileOrder />
      <MyPageProfileSubscribe />
      {showNotification && (
        <NotificationContainer>
          <NotificationText>저장되었습니다.</NotificationText>
        </NotificationContainer>
      )}
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  padding: 3rem 0 3rem 3rem;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
`;

const LeftBox = styled.div`
  display: flex;
`;

const RightBox = styled.div`
  position: relative;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 0;
    background-color: #ebebeb;
    width: 1px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  margin-right: 12px;
  width: 130px;
  height: 130px;
  border-radius: 100%;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const ProfileBox = styled.div`
  margin-left: 30px;
  padding-top: 10px;
`;

const ProfileName = styled.strong`
  display: block;
  line-height: 21px;
  font-size: 1.3rem;
  font-weight: 600;
`;

const ProfileEmail = styled.p`
  margin-top: 20px;
  display: block;
  line-height: 21px;
  font-size: 1.1rem;
  color: rgba(34, 34, 34, 0.5);
`;

const ImageUpload = styled.input`
  display: none;
`;

const ProfileButton = styled(Link)`
  margin-top: 20px;
  height: 40px;
  border: 1px solid #d3d3d3;
  color: rgba(34, 34, 34, 0.8);
  font-size: 0.9rem;
  letter-spacing: -0.06px;
  padding: 0 14px;
  border-radius: 10px;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
`;

const TasteButton = styled(Link)`
  margin-left: 7px;
  margin-top: 20px;
  height: 40px;
  border: 1px solid #d3d3d3;
  color: rgba(34, 34, 34, 0.8);
  font-size: 0.9rem;
  padding: 0 14px;
  border-radius: 10px;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  color: rgba(34, 34, 34, 0.8);
  text-decoration: none;
`;

const PointButton = styled(Link)`
  pointer-events: none;
  cursor: default;
  display: inline-block;
  width: 159px;
  text-align: center;
  text-decoration: none;
`;

const WishButton = styled(PointButton)`
  cursor: pointer;
  pointer-events: all;
  text-decoration: none;
`;

const RightButtonContentValue = styled.strong`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: black;
  margin-bottom: 1rem;
`;

const RightButtonContentName = styled.p`
  font-size: 1rem;
  color: rgba(34, 34, 34, 0.5);
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 70px;
  left: 46%;
  padding: 10px 20px;
  background-color: black;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease-in-out, ${fadeOut} 1.5s 1s forwards;
`;

const NotificationText = styled.p`
  margin: 0;
  padding: 20 20px;
  font-size: 1.3rem;
  color: white;
`;
