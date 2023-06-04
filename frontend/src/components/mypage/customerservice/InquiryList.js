import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getCookie } from "../../../utils/Cookies";
import axios from "axios";
import PLUS from "../../../assets/admin/plus-square.png";
import MINUS from "../../../assets/admin/minus-square.png";
import NewInquiry from "./NewInquiry";
export const InquiryItem = ({ item, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <InquiryCard>
        <InquiryNumber>{item.inquiryNum}</InquiryNumber>
        <InquiryCategory>{item.inquiryCategory}</InquiryCategory>
        <InquiryTitle>{item.inquiryTitle}</InquiryTitle>
        <InquiryState>
          {item.inquiryState === true ? "답변 완료" : "답변 대기중"}
        </InquiryState>
        <LogoBox>
          <Logo src={isModalOpen ? MINUS : PLUS} onClick={handleToggleModal} />
        </LogoBox>
      </InquiryCard>
      {isModalOpen && <Modal item={item} />}
    </>
  );
};

const InquiryCard = styled.div`
  box-sizing: border-box;
  padding: 25px 5px;
  display: flex;
  border-bottom: 1px solid grey;
`;

const InquiryNumber = styled.div`
  width: 10%;
  text-align: center;
`;

const InquiryCategory = styled.div`
  width: 25%;
  text-align: center;
`;

const InquiryTitle = styled.div`
  width: 50%;
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
      <ContentHeader>
        1:1 문의내역
        <ButtonContainer>
          <StyledButton onClick={handleNewInquiryButtonClick}>
            질문하기
          </StyledButton>
        </ButtonContainer>
      </ContentHeader>

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
  min-height: 80vh;
  font-size: 1.1rem;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
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
const NoSuchAnswer = styled.div`
  text-align: center;
  font-size: 2rem;
`;
