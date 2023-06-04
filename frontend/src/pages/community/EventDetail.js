import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

  // postId: 3,
  //     postCategory: 'event',
  //     postTitle: '이거 행사함~',
  //     postCoreMessage: '이거 이제 단돈 25,000원임!!!!. 함 사서 써보시고 맘에 안들면 환불신청하세요 하지만 환불은 안해줄거임~.',
  // postContent: '<p>23년 2월 2일, 목요일) 전통주 및 증류식 소주로 국내 시장에서 이례적인 성공을 …만큼 우리 술이 가진 매력을 널리 알리기 위해 최선을 다할 예정”이라고 덧붙였다.</p>', …}
  // eventEndDate "2023-06-30"
  // eventStartDate "2023-05-31"
  // postCategory "event"
  // postContent  "<p>23년 2월 2일, 목요일) 전통주 및 증류식 소주로 국내 시장에서 이례적인 성공을 거두며 2022년 흥행 아이콘으
  // postCoreMessage  "이거 이제 단돈 25,000원임!!!!. 함 사서 써보시고 맘에 안들면 환불신청하세요 하지만 환불은 안해줄거임~."
  // postId 3
  // postImage "b028a7ab-2903-4732-8a5a-7a7e1d4307cc_470ml.jpeg"
  // postStatus 0
  // postTitle "이거 행사함~"

  return (
    <EventDetailWrap>
      <div className="postCategory">{data.postCategory}</div>
      <div className="postTitle">{data.postTitle}</div>
      <div>
        이벤트 기간 : {data.eventStartDate}~{data.eventEndDate}
      </div>
      <div className="mainImage">
        <img
          src={`http://localhost:8080/admin/download?img=${data.postImage}`}
          alt="대표  이미지"
          style={{ maxWidth: '300px' }}
        />
      </div>
      <div className="postCoreMessage">{data.postCoreMessage}</div>
      <div className="postContent">
        <div dangerouslySetInnerHTML={{ __html: data.postContent }} />
        {/* dangerouslySetInnerHtml로 html에 직접 주입해야 이벤트 및 뉴스 글쓰기 에디터에서 적용한 서식들 적용됨 */}
      </div>
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
