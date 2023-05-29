import React from "react";
import "../styles/AdminEventNews.css";
import EventList from "../components/EventNews/EventList";
import NewsList from "../components/EventNews/NewsList";
import WritePost from "../components/EventNews/WritePost";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function AdminEventNews() {
  const params = useParams();

  return (
    <Wrap>
      {params.category === "event" && <EventList />}
      {params.category === "news" && <NewsList />}
      {params.category === "post" && <WritePost />}
    </Wrap>
  );
}

export default AdminEventNews;

const Wrap = styled.div`
  display: block;
  float: right;
  margin: 0;
  width: 85%;
`;
