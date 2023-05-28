import { useEffect, useState } from "react";
import styled from "styled-components";
import PLUS from "../../../assets/admin/plus-square.png";
import MINUS from "../../../assets/admin/minus-square.png";
import {
  getNewInquiryList,
  postInquiry,
} from "../../api/AdminCustomerServiceApi";

const Modal = ({ item }) => {
  const [title, setTitle] = useState("");
  const [inquiryComment, setInquiryComment] = useState("");

  return (
    <>
      <ModalWrap>
        <ModalSection>
          <ModalTitle>
            <ModalTitleLabel>제목</ModalTitleLabel>
            <ModalTitleInputBox>
              <ModalTitleInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </ModalTitleInputBox>
          </ModalTitle>
          <ModalContent>
            <ModalContentLabel>내용</ModalContentLabel>
            <ModalContentInputBox>
              <ModalContentInput
                as="textarea"
                rows={3}
                value={inquiryComment}
                onChange={(e) => setInquiryComment(e.target.value)}
              />
            </ModalContentInputBox>
          </ModalContent>
        </ModalSection>
        <ModalButtonBox>
          <ModalSubmitButton
            onClick={() => postInquiry(item.inquiryNum, inquiryComment)}
          >
            완료
          </ModalSubmitButton>
        </ModalButtonBox>
      </ModalWrap>
    </>
  );
};

const Content = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(item);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <InquiryCard>
        <NumberBox>{item.inquiryNum}</NumberBox>
        <IdBox>{item.memberId}</IdBox>
        <CategoryBox>{item.inquiryCategory}</CategoryBox>
        <TitleBox>{item.inquiryTitle}</TitleBox>
        <DateBox>{item.inquiryDate}</DateBox>
        <LogoBox>
          <Logo src={isModalOpen ? MINUS : PLUS} onClick={handleToggleModal} />
        </LogoBox>
      </InquiryCard>
      {isModalOpen && <Modal item={item} />}
    </>
  );
};

export const NewInquiryList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNewInquiryList();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <HeaderWrap>
        <HeaderLeft>미답변 문의</HeaderLeft>
        <HeaderRight></HeaderRight>
      </HeaderWrap>
      <ListBox>
        <TitleList>
          <NumberBox>문의번호</NumberBox>
          <IdBox>아이디</IdBox>
          <CategoryBox>카테고리</CategoryBox>
          <TitleBox>제목</TitleBox>
          <DateBox>등록일</DateBox>
          <EmptyBox></EmptyBox>
        </TitleList>
        {data && data.map((item, index) => <Content item={item} key={index} />)}
      </ListBox>
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`;

const ListBox = styled.div`
  margin: 0 auto;
  width: 90%;
  background-color: white;
  border-bottom: 1px solid black;
`;
const TitleList = styled.div`
  height: 40px;
  font-size: 20px;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;
const NumberBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const IdBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;
`;

// Content
const InquiryCard = styled.div`
  box-sizing: border-box;
  padding: 25px 0;
  display: flex;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
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

// Modal
const ModalWrap = styled.div`
  height: 200px;
  display: flex;
`;

const ModalSection = styled.div`
  width: 95%;
`;

const ModalTitle = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
`;

const ModalTitleLabel = styled.div`
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const ModalTitleInputBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ModalTitleInput = styled.input`
  box-sizing: border-box;
  padding: 10px;
  width: 90%;
  height: 40%;
  font-size: 1.3rem;
  background-color: white;
  color: black;
  border: 1px solid grey;
  border-radius: 5px;
`;

const ModalContent = styled.div`
  height: 50%;
  display: flex;
  width: 100%;
`;

const ModalContentLabel = styled.div`
  font-size: 1.3rem;
  width: 20%;
  text-align: center;
`;

const ModalContentInputBox = styled.div`
  width: 80%;
`;

const ModalContentInput = styled.input`
  font-size: 1.3rem;
  width: 90%;
  border: 1px solid grey;
  border-radius: 5px;
  resize: none;
  overflow: auto;
  white-space: pre-line;
  background-color: white;
  color: black;
  box-sizing: border-box;
  padding: 0 10px;
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
