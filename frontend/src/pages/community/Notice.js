import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding-top: 5%;
  width: 90%;
  overflow: auto; // 스크롤 생성
`;

const LeftSection = styled.div`
  width: 24%;
  padding-top: 7%;
`;

const RightSection = styled.div`
  width: 75%;
  background-color: #ffffff;
  padding-top: 4.5%;
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  color: ${({ selected }) => (selected ? '#333333' : '#777777')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  cursor: pointer;
`;

const PostHeader = styled.div`
  padding: 3.5% 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 2.4%;
  border-bottom: 1.5px solid #dddddd;
  padding-left: 7%;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const PostCoreMessage = styled.div`
  padding: 1.4%;
  margin-top: 3%;
  padding-top: 3%;
  margin-left: 3%;
  border-top: 2px solid #888888;
`;

const PostContent = styled.div`
  padding: 1.4%;
  margin-top: 3%;
  margin-left: 3%;
`;

const Notice = () => {
  const [selectedCategory, setSelectedCategory] = useState('notice');
  const [selectedPost, setSelectedPost] = useState(null);
  const { pathname } = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(selectedCategory);
  }, [pathname]);

  const fetchData = async (category) => {
    try {
      const response = await axios.get(`/admin/posts?category=${category}`);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (category) => {
    setSelectedCategory(category);
    setSelectedPost(null);
    fetchData(category);
  };

  const handlePostClick = (post) => {
    if (selectedPost && selectedPost.postId === post.postId) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <Container>
      <LeftSection>
        <ToggleButton
          selected={selectedCategory === 'notice'}
          onClick={() => handleToggle('notice')}
        >
          공지사항
        </ToggleButton>
        <ToggleButton
          selected={selectedCategory === 'news'}
          onClick={() => handleToggle('news')}
        >
          뉴스
        </ToggleButton>
      </LeftSection>
      <RightSection>
        <PostList>
          <PostHeader>{selectedCategory.toUpperCase()}</PostHeader>
          {posts.length === 0 ? (
            <PostContent>게시물이 없습니다.</PostContent>
          ) : (
            posts.map((post) => (
              <PostItem key={post.postId} onClick={() => handlePostClick(post)}>
                <h3>{post.postTitle}</h3>
                {selectedPost && selectedPost.postId === post.postId && (
                  <>
                    <PostCoreMessage
                      dangerouslySetInnerHTML={{ __html: post.postCoreMessage }}
                    />
                    <PostContent
                      dangerouslySetInnerHTML={{ __html: post.postContent }}
                    />
                  </>
                )}
              </PostItem>
            ))
          )}
        </PostList>
      </RightSection>
    </Container>
  );
};

export default Notice;
