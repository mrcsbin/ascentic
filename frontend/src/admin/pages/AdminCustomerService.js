import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AllInquiryList } from "../components/customerservice/AllInquiryList";
import { NewInquiryList } from "../components/customerservice/NewInquiryList";

function AdminCustomerService() {
  const params = useParams();

  return (
    <Wrap>
      {params.category === "all" && <AllInquiryList />}
      {params.category === "new" && <NewInquiryList />}
    </Wrap>
  );
}

export default AdminCustomerService;

const Wrap = styled.div`
  display: block;
  float: right;
  margin: 0;
  width: 85%;
`;
