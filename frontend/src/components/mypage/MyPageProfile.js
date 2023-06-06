import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../store/modules/mypage";
import { MyPageProfileOrder } from "./MyPageProfileOrder";
import { MyPageProfileSubscribe } from "./MyPageProfileSubscribe";
import { useState } from "react";
import { getMyPageProfile } from "../../api/MemberApi";
import { getCookie } from "../../utils/Cookies";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const MyPageProfile = () => {
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [taste, setTaste] = useState();

  const dispatch = useDispatch();
  const DefaultProfileImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await getMyPageProfile(getCookie("accessToken"));
      setProfileData(response);
      dispatch(setActiveTab(""));
      setIsLoading(false);
    };
    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Wrap>
        <LeftBox>
          <ImageBox>
            <Image
              src={
                profileData.profileImage === null
                  ? DefaultProfileImageURL
                  : `http://localhost:8080/images/${profileData.profileImage}`
              }
            />
          </ImageBox>
          <ProfileBox>
            <ProfileName>{profileData.profileName}</ProfileName>
            <ProfileEmail>{profileData.profileEmail}</ProfileEmail>
            <ProfileButton to="/mypage/update">프로필 관리</ProfileButton>
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
      <MyPageProfileSubscribe setTaste={setTaste} />
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
  width: 100px;
  height: 100px;
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

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;

const ContentTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

const ContentPlusButton = styled(Link)`
  font-size: 1rem;
  color: rgba(34, 34, 34, 0.5);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
