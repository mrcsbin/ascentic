import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Event.css";
import styled from "styled-components";
import flowervideo from "../../assets/flowers.webm";
import { NavLink } from "react-router-dom";
function Event() {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/posts?category=event"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filterPostsByStatus = (postStatus) => {
    if (postStatus === "all") {
      return posts.filter((post) => post.postStatus === 0);
    } else {
      return posts.filter(
        (post) =>
          post.postStatus === Number(postStatus) && post.postStatus === 0
      );
    }
  };
  // 페이지 수 계산
  const totalPages = Math.ceil(posts.length / productsPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterPostsByStatus(selectedStatus).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 포스트 데이터를 3개씩 묶어서 배열로 반환
  const groupPosts = (posts) => {
    const groups = [];
    const totalPosts = posts.length;
    let index = 0;

    while (index < totalPosts) {
      groups.push(posts.slice(index, index + 3));
      index += 3;
    }

    return groups;
  };
  const infotext1 = "지금 Ascentic에서 특별한 이벤트가 펼쳐집니다.";
  const infotext2 =
    "향기의 매력에 빠져들고 싶은 분들을 위해 준비한 이번 이벤트는 특별한 경험과 놀라운 혜택을 제공합니다.";
  const infotext3 =
    " 여러분은 우리와 함께하는 이 이벤트를 통해 향기의 세계를 더 깊이 탐험하고, 멋진 선물과 특별한 혜택을 누릴 수 있습니다.";
  return (
    <div className="event-list-wrapper">
      <div className="event-video">
        <video className="event-video-webm" loop autoPlay muted>
          <source src={flowervideo} type="video/webm" />
        </video>
      </div>
      <div className="event-list">
        <h1>이벤트</h1>
        <div className="infobox">
          <span>
            {infotext1}
            <br />
          </span>
          <span>
            {infotext2}
            <br />
          </span>
          <span>{infotext3}</span>
        </div>
        {/* <div className="selected-status">
          <p>상태 보기 &nbsp;</p>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="all">모두 보기</option>
            <option value="0">저장 상태</option>
            <option value="1">임시 저장 상태</option>
            <option value="2">삭제 상태</option>
          </select>
        </div> */}
        <div className="post-grid">
          {groupPosts(currentProducts).map((postGroup, index) => (
            <table key={index}>
              <tbody>
                <tr>
                  {postGroup.map((post) => (
                    <td key={post.postId}>
                      <NavLink
                        to={`/community/event/${post.postId}`}
                        className="postLink"
                      >
                        <div className="post">
                          <div className="post-img">
                            {post.postImage && (
                              <img
                                src={`http://localhost:8080/admin/download?img=${post.postImage}`}
                                alt="대표 이미지"
                                className="post-image"
                              />
                            )}
                          </div>
                          <div className="post-bottom">
                            <div className="post-left">
                              <p className="left-top">
                                {getEventStatus(
                                  post.eventStartDate,
                                  post.eventEndDate
                                )}
                              </p>
                              <p className="left-center">{post.postTitle}</p>
                              <p className="left-bottom">
                                {post.eventStartDate} ~ {post.eventEndDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        <div className="pagination">
          {currentPage - 3 <= 0 ? (
            ""
          ) : (
            <div
              className="btn"
              onClick={() => handlePageChange(currentPage - 3)}
            >
              이전
            </div>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNumber) =>
                pageNumber > currentPage - 3 && pageNumber < currentPage + 3
            )
            .map((pageNumber) => (
              <div
                className="numbtn"
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  pointerEvents: pageNumber == currentPage ? "none" : "auto",
                  borderColor: pageNumber == currentPage ? "black" : "white",
                }}
              >
                {pageNumber}
              </div>
            ))}
          {currentPage + 3 > totalPages ? (
            ""
          ) : (
            <div
              className="btn"
              onClick={() => handlePageChange(currentPage + 3)}
            >
              다음
            </div>
          )}
        </div>
        <div>
          {posts.length === 0 ? (
            <div style={{ margin: "100px auto" }}>
              <center style={{ fontSize: "20px", fontFamily: "Pretendard" }}>
                진행중인 이벤트가 없습니다.
              </center>
              <div style={{ height: "100px" }}></div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

// const Cardblock = styled(NavLink)`
//   display: block;
//   padding: 10px;
//   margin-bottom: 10px;
//   float: left;
//   width: 280px;
//   overflow: hidden;
//   text-decoration: none;
//   font-family: "Pretendard";
//   color: black;
// `;
export default Event;
