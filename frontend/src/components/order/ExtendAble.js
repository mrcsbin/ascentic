import styled from "styled-components";

const ExtendAble = ({ title, isOpen, onClick, children }) => {
  return (
    <>
      <SubTitle>
        {title}
        <button onClick={onClick}>{isOpen ? "-" : "+"}</button>
      </SubTitle>
      {isOpen && children}
    </>
  );
};

export default ExtendAble;

const SubTitle = styled.div`
  width: 719px;
  height: 27px;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  padding-top: 28px;
  border-top: 1px solid #d9d9d9;
  padding-bottom: 30px;

  > button {
    border: none;
    font-size: 30px;
    background-color: transparent;
    cursor: pointer;
  }
`;
