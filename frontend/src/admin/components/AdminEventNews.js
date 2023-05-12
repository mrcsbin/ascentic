import React from "react";
import "./AdminEventNews.css";
import Navbar from "./EventNews/Navbar";
import EventList from "./EventNews/EventList";
import NewsList from "./EventNews/NewsList";
import WritePost from "./EventNews/WritePost";

function AdminEventNew() {
  const [mode, setMode] = React.useState(1);

  const handleNewEventSubmit = (data) => {
    console.log("새 이벤트 데이터:", data);
    // 새 이벤트 데이터 처리 로직 구현
  };

  return (
    <div className="admin-event-news">
      <Navbar mode={mode} setMode={setMode} />
      {mode === 1 && <EventList />}
      {mode === 2 && <NewsList />}
      {mode === 3 && <WritePost onSubmit={handleNewEventSubmit} />}
    </div>
  );
}

export default AdminEventNew;
