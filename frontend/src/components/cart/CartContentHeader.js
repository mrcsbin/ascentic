import styled from "styled-components";

export const CartContentHeader = () => {
  return (
    <ContentHeaderWrap className="contentHeader-wrap">
      <ContentHeader className="contentHeader">
        <SelectLabel>
          <SelectCheck type="checkbox"></SelectCheck>
          <SelectSpan>전체선택&nbsp;&nbsp;&nbsp;&nbsp;</SelectSpan>
        </SelectLabel>
        <DeleteButton className="header-delete-button" type="button">
          선택삭제
        </DeleteButton>
      </ContentHeader>
    </ContentHeaderWrap>
  );
};

const ContentHeaderWrap = styled.div`
  box-sizing:border-box;
  display:flex;
  font-weight:500;
  align-items:center;
  justify-content-space-between;
  margin: 0;
  padding: 20px 10px;
`;

const ContentHeader = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const SelectLabel = styled.label`
  align-items: center;
  vertical-align: top;
  position: relative;
  display: inline-flex;
  font-size: 14px;
  line-height: 26px;
  padding: 0px;
  color: rgb(51, 51, 51);
  box-sizing: border-box;
  margin: 0;
`;

const SelectCheck = styled.input`

`;

const SelectSpan = styled.span``;

const DeleteButton = styled.button`
  overflow: visible;
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: #333;
`;
