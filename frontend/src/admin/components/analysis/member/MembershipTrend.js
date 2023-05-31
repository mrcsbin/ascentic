import { useState, useEffect } from "react";
import { GetMembershipTrend } from "../data";
import { ResponsiveLine } from "@nivo/line";
import styled from "styled-components";

export const MembershipTrend = ({dateType}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [dateType, setDateType] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMembershipTrend(dateType);
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateType]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div style={{ width: "70%", height: "400px", margin: "100px auto" }}>
      <Header>{dateType}일 동안의 가입자 수 추이</Header>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: -60,
          legend: "",
          legendOffset: 15,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "가입자수",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

const Header = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;