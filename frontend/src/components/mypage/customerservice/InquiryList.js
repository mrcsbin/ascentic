import styled from "styled-components";
import { InquiryItem } from "./InquiryItem";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";
import axios from "axios";

export const InquiryList = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, []);
  return (
    <Wrap>
      <ContentHeader>1:1 문의내역</ContentHeader>
      <Section>
        <InquiryNumberBox>
          <TabName>문의번호</TabName>
        </InquiryNumberBox>
        <InquiryCategoryBox>
          <TabName>카테고리</TabName>
        </InquiryCategoryBox>
        <InquiryTitleBox>
          <TabName style={{ textAlign: "left" }}>제목</TabName>
        </InquiryTitleBox>
        <InquiryStateBox>
          <TabName>상태</TabName>
        </InquiryStateBox>
      </Section>
      {inquiryList.map((item, index) => (
        <InquiryItem item={item} key={index} />
      ))}
    </Wrap>
  );
};

const Wrap = styled.div``;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const Section = styled.div`
  padding: 20px 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid black;
`;

const InquiryNumberBox = styled.div`
  width: 10%;
`;

const InquiryCategoryBox = styled.div`
  width: 25%;
`;

const InquiryTitleBox = styled.div`
  width: 50%;
`;

const InquiryStateBox = styled.div`
  width: 15%;
`;

const TabName = styled.div`
  text-align: center;
`;
