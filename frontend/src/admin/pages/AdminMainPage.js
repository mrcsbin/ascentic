import styled from "styled-components";
import { AdminNavToggle } from "../components/AdminNavToggle";

function AdminMainPage() {
  return (
    <Wrap className="asdsa">
      <AdminNavToggle></AdminNavToggle>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: block;
  float: right;
  margin: 0;
  width: 85%;
`;

const Content = styled.div`
  padding-left: 15%;
`;

export default AdminMainPage;
