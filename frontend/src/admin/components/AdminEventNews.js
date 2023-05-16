import React, { useState, useEffect } from "react";
import "./AdminEventNews.css";
import EventList from "./EventNews/EventList";
import NewsList from "./EventNews/NewsList";
import WritePost from "./EventNews/WritePost";

function AdminEventNews() {
  const [mode, setMode] = useState(1);
  const [postEdit, setpostEdit] = useState(null);

  const handleEdit = (postEdit) => {
    setMode(3);
    setpostEdit(postEdit);
  };

  useEffect(() => {
    console.log("mode:", mode);
    console.log("postEdit:", postEdit);
  }, [mode, postEdit]);

  return (
    <div className="admin-event-news">
      <nav className="navbar">
        <ul className="menu">
          <li
            onClick={() => setMode(1)}
            className={`menu-item ${mode === 1 ? "active" : ""}`}
          >
            이벤트
          </li>
          <li
            onClick={() => setMode(2)}
            className={`menu-item ${mode === 2 ? "active" : ""}`}
          >
            뉴스
          </li>
          <li
            onClick={() => setMode(3)}
            className={`menu-item ${mode === 3 ? "active" : ""}`}
          >
            글쓰기
          </li>
        </ul>
      </nav>
      <div className="admin-event-news-content">
        {mode === 1 && <EventList handleEdit={handleEdit} />}
        {mode === 2 && <NewsList handleEdit={handleEdit} />}
        {mode === 3 && <WritePost postEdit={postEdit} />}
      </div>
    </div>
  );
}

export default AdminEventNews;
