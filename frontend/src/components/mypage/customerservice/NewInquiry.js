import React from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { getCookie } from "../../../utils/Cookies";

const NewInquiry = ({ showInquiry, handleNewInquiryButtonClick }) => {
  const [inquiryCategory, setInquiryCategory] = React.useState("");
  const [inquiryTitle, setInquiryTitle] = React.useState("");
  const [inquiryContent, setInquiryContent] = React.useState("");
  const [error, setError] = React.useState("");
  const accessToken = getCookie("accessToken");
  const handleCategoryChange = (e) => {
    setInquiryCategory(e.target.value);
  };
  const closeModal = (e) => {
    e.preventDefault();
    handleNewInquiryButtonClick();
  };

  const handleTitleChange = (e) => {
    setInquiryTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setInquiryContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inquiryCategory || !inquiryTitle || !inquiryContent) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const data = {
        inquiryTitle,
        inquiryContent,
        inquiryCategory,
      };

      const response = await axios.post(
        "http://localhost:8080/inquiry/createInquiry",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Inquiry submitted successfully:", response.data);

      setInquiryCategory("");
      setInquiryTitle("");
      setInquiryContent("");
      setError("");
      handleNewInquiryButtonClick();
      alert("제출이 완료되었습니다!");
      closeModal();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setError("문의를 제출하는 중에 오류가 발생했습니다.");
    }
  };
  return (
    <ModalBackground show={showInquiry}>
      <ModalContainer>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <InputLabel>카테고리</InputLabel>
              <SelectField
                value={inquiryCategory}
                onChange={handleCategoryChange}
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="상품 문의">상품 문의</option>
                <option value="배송 문의">배송 문의</option>
                <option value="반품/교환 문의">반품/교환 문의</option>
                <option value="결제 문제">결제 문제</option>
                <option value="서비스 문의">서비스 문의</option>
                <option value="기타 문의">기타 문의</option>
              </SelectField>
            </InputContainer>
            <InputContainer>
              <InputLabel>문의 제목</InputLabel>
              <InputField
                type="text"
                name="title"
                value={inquiryTitle}
                onChange={handleTitleChange}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>문의</InputLabel>
              <TextAreaField
                name="content"
                value={inquiryContent}
                onChange={handleContentChange}
              />
            </InputContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Buttons>
              <SubmitButton type="submit">문의하기</SubmitButton>
              <CloseButton onClick={closeModal}>닫기</CloseButton>
            </Buttons>
          </form>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 50%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SelectField = styled.select`
  padding: 0.625rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = styled.input`
  padding: 0.625rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const TextAreaField = styled.textarea`
  padding: 0.625rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  overflow: auto;
  height: 5rem;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

const ErrorMessage = styled.p`
  margin-bottom: 10px;
  color: red;
`;

const SubmitButton = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 1.2rem;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333333;
  }

  &:focus {
    outline: none;
  }
`;

const CloseButton = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 1.2rem;
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #808080;
  }

  &:focus {
    outline: none;
  }
`;
const Buttons = styled.div`
  align-items: center;
  display: grid;
`;
export default NewInquiry;
