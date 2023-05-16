import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsList(props) {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

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

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`/admin/post/${postId}`);
      console.log(response.data); // 성공적으로 삭제된 경우 메시지 출력
      // 삭제 후 필요한 동작 수행
    } catch (error) {
      console.error(error);
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
      return posts;
    } else {
      return posts.filter((post) => post.postStatus === Number(postStatus));
    }
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
  return (
    <div className="news-list">
      <h2>뉴스 목록</h2>
      <div>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="all">모두 보기</option>
          <option value="0">저장 상태</option>
          <option value="1">임시 저장 상태</option>
          <option value="2">삭제 상태</option>
        </select>
      </div>
      <div className="post-grid">
        {filterPostsByStatus(selectedStatus).map((post) => (
          <div className="post" key={post.postId}>
            <h3 className="post-title">{post.postTitle}</h3>
            <p>
              {post.eventStartDate} ~ {post.eventEndDate}
            </p>
            <p>{getEventStatus(post.eventStartDate, post.eventEndDate)}</p>
            <p>상태: {getStatusText(post.postStatus)}</p>
            <button onClick={() => props.handleEdit(post.postId)}>수정</button>
            <button onClick={() => handleDelete(post.postId)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
