import React, { useState } from "react";
import SbProductManagement from "../components/SubscribeManagement/AdminSbProductManagement";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function AdminSubscribeManagement() {
  const [spActionMode, setSpActionMode] = useState(1);
  const params = useParams();
  return (
    <Wrapper>
      {params.category === "member" && <></>}
      {params.category === "product" && <SbProductManagement />}
      {/* <ActionBtnbox>
        <button
          className={spActionMode === 1 ? "activeBtn" : "Btn"}
          onClick={() => setSpActionMode(1)}
        >
          구독 주문 관리
        </button>
        <button
          className={spActionMode === 2 ? "activeBtn" : "Btn"}
          onClick={() => setSpActionMode(2)}
        >
          구독 상품 관리
        </button>
      </ActionBtnbox>
      <div>
        {spActionMode === 1 && <div />}
        {spActionMode === 2 && <SbProductManagement />}
      </div> */}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 85%;
  float: right;
`;
const ActionBtnbox = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid black;

  button {
    width: 20%;
    height: 50px;
    text-align: center;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeBtn,
  button:hover {
    color: white;
    background-color: black;
  }
`;

export default AdminSubscribeManagement;
