import styled, { keyframes, css, createGlobalStyle } from "styled-components";
import SEARCH_ICON from "../../assets/iconSearch.svg";
import { useEffect, useRef, useState } from "react";
import { SearchResult } from "./SearchResult";

export const Search = ({ handleHideSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [sendSearchData, setSendSearchData] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchClick = () => {
    setIsSearchClicked(true);
    setSendSearchData(searchData);
  };

  const handleDeleteClick = () => {
    setSearchData("");
    searchInputRef.current.focus(); // 입력창으로 포커스 이동
  };

  return (
    <>
      <GlobalStyle />
      <SearchWrap>
        <SearchContainer>
          <SearchLeft></SearchLeft>
          <SearchInputBox isFocused={isFocused}>
            <SearchInput
              type="text"
              name="search"
              placeholder="검색"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={searchInputRef}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSearchClick();
              }}
            ></SearchInput>
            <DeleteButtonBox>
              {searchData && (
                <DeleteButton onClick={handleDeleteClick}>지우기</DeleteButton>
              )}
            </DeleteButtonBox>
            <SearchButtonBox>
              <SearchButtonIcon
                src={SEARCH_ICON}
                alt="검색아이콘"
                onClick={handleSearchClick}
                clickable={searchData.length >= 2}
              />
            </SearchButtonBox>
          </SearchInputBox>
          <SearchRight>
            <CloseButtonBox>
              <CloseButton onClick={() => handleHideSearch()}>닫기</CloseButton>
            </CloseButtonBox>
          </SearchRight>
        </SearchContainer>
        <ResultContainer>
          {isSearchClicked && (
            <SearchResult
              searchData={sendSearchData}
              handleHideSearch={handleHideSearch}
            />
          )}
        </ResultContainer>
      </SearchWrap>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SearchWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  z-index: 1;
  position: absolute;
  top: 0;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

const SearchContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  padding: 4rem 5%;
  box-sizing: border-box;
`;

const SearchLeft = styled.div`
  width: 20%;
`;

const SearchRight = styled.div`
  width: 20%;
`;

const SearchInputBox = styled.div`
  display: flex;
  width: 60%;
  border-bottom: ${(props) =>
    props.isFocused ? "4px solid black" : "2px solid lightgrey"};
  transition: border-bottom-color 0.5s ease;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 10px 0 10px 15%;
  box-sizing: border-box;
  text-align: center;
  font-size: 2rem;
  outline: none;
  font-weight: bold;
  color: black;
  &::placeholder {
    color: grey;
  }
`;

const DeleteButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 15%;
`;

const DeleteButton = styled.span`
  width: 50px;
  vertical-align: middle;
  font-size: 0.9rem;
  color: grey;
  opacity: 0.7;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  position: absolute;
`;

const SearchButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;

const SearchButtonIcon = styled.img`
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  width: 20px;
  height: 20px;
  ${(props) =>
    !props.clickable &&
    css`
      pointer-events: none;
    `}
`;

const CloseButtonBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const CloseButton = styled.span`
  cursor: pointer;
  font-weight: 400;
  color: grey;
`;

const ResultContainer = styled.div`
  padding: 1.5rem 5%;
`;
