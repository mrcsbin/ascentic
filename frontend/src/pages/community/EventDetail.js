import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "../../styles/EventDetail.css";
import Loading from "../../components/common/Loading";
const EventDetail = () => {
  const params = useParams();
  const postId = params.postId;
  const [data, setData] = useState([]);
  let coreMessage1 = "";
  let coreMessage2 = "";
  let coreMessage3 = "";
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
  if (data.postCoreMessage) {
    const coreMessages = data.postCoreMessage.split(".");
    coreMessage1 = coreMessages[0] || "";
    coreMessage2 = coreMessages[1] || "";
    coreMessage3 = coreMessages[2] || "";
  }
  const getEventStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > today) {
      return "진행 예정";
    } else if (end < today) {
      return "진행 완료";
    } else {
      return "진행 중";
    }
  };

  return (
    <EventDetailWrap>
      <p className="postStatus">
        {getEventStatus(data.eventStartDate, data.eventEndDate)}
      </p>

      <div className="postTitle">{data.postTitle}</div>
      <div className="postingPeriod">
        이벤트 기간 : {data.eventStartDate}~{data.eventEndDate}
      </div>
      <div className="mainImage">
        <img
          src={`http://localhost:8080/admin/download?img=${data.postImage}`}
          alt="대표  이미지"
        />
      </div>
      <div className="postCoreMessage">
        <ul className="coreMessageList">
          {coreMessage1 && <li>{coreMessage1}</li>}
          {coreMessage2 && <li>{coreMessage2}</li>}
          {coreMessage3 && <li>{coreMessage3}</li>}
        </ul>
      </div>
      <div className="postContent">
        <div dangerouslySetInnerHTML={{ __html: data.postContent }} />
        {/* dangerouslySetInnerHtml로 html에 직접 주입해야 이벤트 및 뉴스 글쓰기 에디터에서 적용한 서식들 적용됨 */}
      </div>
    </EventDetailWrap>
  );
};

const EventDetailWrap = styled.div`
  padding-top: 180px;
  width: 70vw;
  height: auto;
  padding-bottom: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom:107px;
`;

export default EventDetail;
