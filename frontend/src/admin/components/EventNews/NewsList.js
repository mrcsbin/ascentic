import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/NewsList.css";
import styled from "styled-components";

function NewsList(props) {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/posts?category=news"
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

  return (
    <div className="news-list-wrapper">
      <div className="news-list">
        <HeaderWrap>
          <HeaderLeft>뉴스 관리</HeaderLeft>
        </HeaderWrap>
        <InputContainer>
          <CategoriesBox>
            <button
              className={selectedStatus === "all" ? "activeCateBtn" : "cateBtn"}
              value="all"
              onClick={(e) => handleStatusChange(e)}
            >
              전체보기
            </button>
            <button
              className={selectedStatus === "0" ? "activeCateBtn" : "cateBtn"}
              value="0"
              onClick={(e) => handleStatusChange(e)}
            >
              저장상태
            </button>
            <button
              className={selectedStatus === "1" ? "activeCateBtn" : "cateBtn"}
              value="1"
              onClick={(e) => handleStatusChange(e)}
            >
              임시저장상태
            </button>
            <button
              className={selectedStatus === "2" ? "activeCateBtn" : "cateBtn"}
              value="2"
              onClick={(e) => handleStatusChange(e)}
            >
              삭제상태
            </button>
          </CategoriesBox>
          <table>
            <tr>
              <th>제목</th>
              <th>기간</th>
              <th>진행상황</th>
              <th>게시글 상태</th>
              <th>관리</th>
            </tr>
            {currentProducts.map((post) => (
              <tr className="post" key={post.postId}>
                <td>
                  <h3 className="post-title">{post.postTitle}</h3>
                </td>
                <td>
                  <p>
                    {post.eventStartDate} ~ {post.eventEndDate}
                  </p>
                </td>
                <td>
                  <p>
                    {getEventStatus(post.eventStartDate, post.eventEndDate)}
                  </p>
                </td>
                <td>
                  <p>상태: {getStatusText(post.postStatus)}</p>
                </td>
                <td className="handle-post">
                  <button onClick={() => props.handleEdit(post.postId)}>
                    수정
                  </button>
                  <button onClick={() => handleDelete(post.postId)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </InputContainer>
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
                진행중인 뉴스가 없습니다.
              </center>
              <div style={{ height: "100px" }}></div>
            </div>
          ) : (
            " "
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
const InputContainer = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;
const CategoriesBox = styled.div`
  padding: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 10px;
    padding: 10px;
    font-size: 1.2rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeCateBtn,
  .cateBtn:hover {
    font-weight: 600;
    border-bottom: 2px solid black;
  }
`;

export default NewsList;
