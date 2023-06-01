import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const params = useParams();
  const postId = params.postId;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchOption = async () => {
      try {
        const res = await axios
          .get(`http://localhost:8080/admin/post/${postId}`)
          .then(function (res) {
            setData(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchOption();
  }, []);

  return (
    <EventDetailWrap>
      postId : {postId}
      <div dangerouslySetInnerHTML={{ __html: data.postContent }} />
      {/* dangerouslySetInnerHtml로 html에 직접 주입해야 이벤트 및 뉴스 글쓰기 에디터에서 적용한 서식들 적용됨 */}
    </EventDetailWrap>
  );
};
const EventDetailWrap = styled.div`
  padding-top: 180px;
  width: 60vw;
  margin-bottom: 120px;
  margin: 0 auto;
`;
export default EventDetail;
