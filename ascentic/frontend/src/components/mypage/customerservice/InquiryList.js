import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getCookie } from "../../../utils/Cookies";
import axios from "axios";
import PLUS from "../../../assets/admin/plus-square.png";
import MINUS from "../../../assets/admin/minus-square.png";
import NewInquiry from "./NewInquiry";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";
export const InquiryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateTime = new Date(item.inquiryDate);

  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const date = dateTime.getDate().toString().padStart(2, "0");
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = `${year} . ${month} . ${date}`;

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <InquiryCard>
        <InquiryNumber>{item.inquiryNum}</InquiryNumber>
        <InquiryCategory>{item.inquiryCategory}</InquiryCategory>
        <InquiryTitle>{item.inquiryTitle}</InquiryTitle>
        <InquiryDate>{formattedDateTime}</InquiryDate>
        <InquiryState>
          {item.inquiryState === true ? "답변 완료" : "답변 대기중"}
        </InquiryState>
        {item.inquiryState ? (
          <LogoBox>
            <Logo
              src={isModalOpen ? MINUS : PLUS}
              onClick={handleToggleModal}
            />
          </LogoBox>
        ) : (
          <LogoBox>
            <InquiryEmptyBar></InquiryEmptyBar>
          </LogoBox>
        )}
      </InquiryCard>
      {isModalOpen && <Modal item={item} />}
    </>
  );
};

const InquiryCard = styled.div`
  box-sizing: border-box;
  padding: 30px 0;
  display: flex;
  border-bottom: 1px solid grey;
`;

const InquiryNumber = styled.div`
  width: 10%;
  text-align: center;
`;

const InquiryCategory = styled.div`
  width: 10%;
  text-align: center;
`;

const InquiryDate = styled.div`
  text-align: center;
  width: 25%;
`;

const InquiryTitle = styled.div`
  text-align: center;
  width: 35%;
`;

const InquiryState = styled.div`
  width: 15%;
  text-align: center;
`;

const Modal = ({ item, isOpen }) => {
  const hasComment = Boolean(item?.inquiryComment);
  return (
    <>
      <ModalWrap hasComment={hasComment} className={isOpen ? "hide" : "show"}>
        <ModalSection>
          <ModalTitle>
            <ModalTitleLabel>질문 제목</ModalTitleLabel>
            <ModalTitleInput type="text" value={item.inquiryTitle} disabled />
          </ModalTitle>
          <ModalContent>
            <ModalContentLabel>질문 내용</ModalContentLabel>
            <ModalContentInput
              as="textarea"
              value={item.inquiryContent}
              rows={4}
              cols={50}
              disabled
            />
          </ModalContent>
        </ModalSection>
        {item.inquiryComment ? (
          <ModalSection>
            <ModalTitle>
              <ModalTitleLabel>답변 제목</ModalTitleLabel>
              <ModalTitleInput
                type="text"
                value={"re " + item.inquiryTitle}
                disabled
              />
            </ModalTitle>
            {item.inquiryState && (
              <ModalContent>
                <ModalContentLabel>답변 내용</ModalContentLabel>
                <ModalContentInput
                  as="textarea"
                  value={item.inquiryComment}
                  rows={4}
                  cols={50}
                  disabled
                />
              </ModalContent>
            )}
          </ModalSection>
        ) : (
          <></>
          // <NoSuchAnswer>해당 문의는 아직 답변이 없습니다.</NoSuchAnswer>
        )}
        <ModalButtonBox>
          <ModalSubmitButton></ModalSubmitButton>
        </ModalButtonBox>
      </ModalWrap>
    </>
  );
};
export const InquiryList = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const dispatch = useDispatch();

  const handleNewInquiryButtonClick = () => {
    setShowInquiry(!showInquiry);
  };

  const closeModal = () => {
    setShowInquiry(false);
  };

  const handleToggleModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e) => {
    const modalContainer = document.getElementById("modalContainer");
    if (modalContainer && !modalContainer.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/inquiry/getInquiry",
          {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
          }
        );
        setInquiryList(res.data);
      } catch (error) {
        console.error("Error fetching inquiry data:", error);
      } finally {
        setIsLoading(false);
        dispatch(setActiveTab("1:1 문의 내역"));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Wrap>
      <ContentBar>
        <ContentHeader>1:1 문의 내역</ContentHeader>
        <ButtonContainer>
          <StyledButton onClick={handleNewInquiryButtonClick}>
            문의하기
          </StyledButton>
        </ButtonContainer>
      </ContentBar>
      <ItemInfoBox>
        <InquiryNumberBar>문의 번호</InquiryNumberBar>
        <InquiryCategoryBar>카테고리</InquiryCategoryBar>
        <InquiryTitleBar>문의 제목</InquiryTitleBar>
        <InquiryDateBar>문의 날짜</InquiryDateBar>
        <InquiryStateBar>문의 상태</InquiryStateBar>
        <InquiryEmptyBar></InquiryEmptyBar>
      </ItemInfoBox>

      <NewInquiry
        showInquiry={showInquiry}
        handleNewInquiryButtonClick={handleNewInquiryButtonClick}
      />
      {inquiryList.map((item, index) => (
        <InquiryItem item={item} key={index} onClick={handleToggleModal} />
      ))}
      {selectedItem && (
        <Modal
          item={selectedItem}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  height: auto;
`;

const ContentBar = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
`;

const ContentHeader = styled.div`
  cursor: default;
  padding: 0 0 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333333;
  }

  &:focus {
    outline: none;
  }
`;
// Modal
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;
const ModalWrap = styled.div`
  background-color: transparent;
  height: ${({ hasComment }) => (hasComment ? "300px" : "300px")};
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s ease, transform 0.3s ease;
  border-bottom: 1px solid grey;

  &.show {
    animation: ${slideDown} 0.3s ease;
  }

  &.hide {
    animation: ${slideUp} 0.3s ease;
  }
`;

const ModalSection = styled.div`
  width: 95%;
  height: 50%;
  font-size: 1rem;
`;

const ModalTitle = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
`;

const ModalTitleLabel = styled.div`
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const ModalTitleInput = styled.input`
  font-size: 1.1rem;
  border: none;
  width: 80%;
  background-color: white;
  color: black;
`;

const ModalContent = styled.div`
  height: 50%;
  display: flex;
  width: 100%;
`;

const ModalContentLabel = styled.div`
  font-size: 1.1rem;
  width: 20%;
  text-align: center;
`;

const ModalContentInput = styled.input`
  font-size: 1.1rem;
  width: 80%;
  border: none;
  resize: none;
  overflow: auto;
  white-space: pre-line;
  background-color: white;
  color: black;
`;

const ModalButtonBox = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalSubmitButton = styled.div`
  cursor: pointer;
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ItemInfoBox = styled.div`
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid grey;
`;

const InquiryNumberBar = styled.div`
  text-align: center;
  width: 10%;
`;
const InquiryCategoryBar = styled.div`
  text-align: center;
  width: 10%;
`;

const InquiryTitleBar = styled.div`
  text-align: center;
  width: 35%;
`;

const InquiryDateBar = styled.div`
  text-align: center;
  width: 25%;
`;

const InquiryStateBar = styled.div`
  text-align: center;
  width: 15%;
`;

const InquiryEmptyBar = styled.div`
  width: 5%;
`;
