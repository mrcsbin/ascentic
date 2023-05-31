import { useEffect, useState } from "react";
import styled from "styled-components";
import { GetSubscribeProductScore } from "../data";
import { ResponsiveLine } from "@nivo/line";

export const SubscribeProductScore = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetSubscribeProductScore();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div style={{ width: "70%", height: "400px", margin: "100px auto" }}>
      <Header>구독 상품 평균 평점</Header>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "5",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: -0,
          legend: "",
          legendOffset: 15,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "평점",
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
