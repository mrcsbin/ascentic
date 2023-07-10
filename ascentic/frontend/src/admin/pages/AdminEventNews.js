import React, { useState, useEffect } from "react";
import "../styles/AdminEventNews.css";
import EventList from "../components/EventNews/EventList";
import NewsList from "../components/EventNews/NewsList";
import WritePost from "../components/EventNews/WritePost";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function AdminEventNews() {
  const params = useParams();
  const [postEdit, setpostEdit] = useState(null);

  const handleEdit = (postEdit) => {
    params.category = "post"; // Update params.category to "post"
    setpostEdit(postEdit);
  };

  useEffect(() => {
    console.log("postEdit:", postEdit);
  }, [postEdit]);

  return (
    <Wrap>
      {params.category === "event" && <EventList handleEdit={handleEdit} />}
      {params.category === "news" && <NewsList handleEdit={handleEdit} />}
      {params.category === "post" && <WritePost postEdit={postEdit} />}
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
