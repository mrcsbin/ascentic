import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const params = useParams();
  const postId = params.postId;

  //   useEffect(() => {
  //     const fetchOption = async () => {
  //       try {
  //         const res = await axios
  //           .get(`http://localhost:8080/admin/post/${postId}`)
  //           .then(function (res) {
  //           });
  //       } catch (e) {
  //         console.log(e);
  //       }

  //     };
  //     fetchOption();
  //   }, []);

  return (
    <EventDetailWrap>postId : {postId}</EventDetailWrap>
    // <ProdDetailView productData={productData} productOption={productOption} />
  );
};
const EventDetailWrap = styled.div`
  padding-top: 180px;
  width: 60vw;
  margin-bottom: 120px;
  margin: 0 auto;
`;
export default EventDetail;
