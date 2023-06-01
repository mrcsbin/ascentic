import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/EventList.css";
import styled from "styled-components";

function EventList(props) {
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

  const handleDelete = async (postId) => {
    try {
      if (window.confirm("삭제하시겠습니까?")) {
        const res = await axios.delete(`/admin/post/${postId}`);
        console.log(res);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "저장";
      case 1:
        return "임시 저장";
      case 2:
        return "삭제";
      default:
        return "";
    }
  };

  const filterPostsByStatus = (postStatus) => {
    if (postStatus === "all") {
      return posts;
    } else {
      return posts.filter((post) => post.postStatus === Number(postStatus));
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

  return (
    <div className="event-list-wrapper">
      <div className="event-list">
        <HeaderWrap>
          <HeaderLeft>이벤트 관리</HeaderLeft>
          <HeaderRight></HeaderRight>
        </HeaderWrap>
        <div className="selected-status">
          <p>상태 보기 &nbsp;</p>
          {/* <OrderCategoryBox>
          <button
            className={category === "all" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("all")}
          >
            전체보기
          </button>
          <button
            className={category === "결제완료" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("결제완료")}
          >
            결제완료
          </button>
          <button
            className={category === "배송준비중" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("배송준비중")}
          >
            배송준비중
          </button>
          <button
            className={category === "배송중" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("배송중")}
          >
            배송중
          </button>
          <button
            className={category === "배송완료" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("배송완료")}
          >
            배송완료
          </button>
        </OrderCategoryBox>
        <SortOptionBox>
          <button
            className={sortOption === "early" ? "active" : ""}
            onClick={() => setSortOption("early")}
          >
            최근순
          </button>
        </SortOptionBox> */}
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="all">모두 보기</option>
            <option value="0">저장 상태</option>
            <option value="1">임시 저장 상태</option>
            <option value="2">삭제 상태</option>
          </select>
        </div>
        <div className="post-grid">
          {groupPosts(currentProducts).map((postGroup, index) => (
            <table key={index}>
              <tbody>
                <tr>
                  {postGroup.map((post) => (
                    <td key={post.postId}>
                      <div className="post">
                        <div className="post-img">
                          {post.postImage && (
                            <img
                              src={`http://localhost:8080/admin/download?img=${post.postImage}`}
                              alt="대표 이미지"
                              className="post-image"
                            />
                          )}
                          <p className="post-status">
                            상태: {getStatusText(post.postStatus)}
                          </p>
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
                          <div className="post-right">
                            <button
                              onClick={() => props.handleEdit(post.postId)}
                            >
                              수정
                            </button>
                            <button onClick={() => handleDelete(post.postId)}>
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
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

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 600;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`;
// const OrderCategoryBox = styled.div`
//   padding: 0 auto;
//   margin-top: 10px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   button {
//     margin: 10px;
//     padding: 10px;
//     font-size: 1.3rem;
//     background-color: white;
//     border: 0;
//     cursor: pointer;
//   }
//   .activeCateBtn,
//   .cateBtn:hover {
//     font-weight: 600;
//     border-bottom: 2px solid black;
//   }
// `;
// const SortOptionBox = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
//   button {
//     background-color: white;
//     border: 0;
//     font-size: 1rem;
//     font-weight: 500;
//     margin: 10px 10px 20px 10px;
//   }
//   .active {
//     color: red;
//   }
// `;
export default EventList;
