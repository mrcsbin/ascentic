import { useState } from "react";
import styled from "styled-components";

export const AdminTab = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Wrap>
      <div>
        <div>
          <button onClick={() => handleTabClick("매출")}>매출</button>
          {activeTab === "매출" && <div>월별 상품 매출</div>}
        </div>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div``;
