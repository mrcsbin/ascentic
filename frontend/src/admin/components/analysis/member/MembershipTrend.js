import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
import { GetMembershipTrend } from "../data";
import { ResponsiveLine } from "@nivo/line";

export const MembershipTrend = ({ dateType }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);

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
      {/* <ResponsiveBar
        data={data}
        keys={["year"]}
        indexBy={
          (dateType === "year" && "년") ||
          (dateType === "month" && "월") ||
          (dateType === "day" && "일")
        }
        margin={{ top: 50, right: 130, bottom: 50, left: 130 }}
        padding={0.5}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        valueFormat=" >-,"
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend:
            (dateType === "year" && "년") ||
            (dateType === "month" && "월") ||
            (dateType === "day" && "일"),
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "매출액",
          legendPosition: "middle",
          legendOffset: -70,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id +
          ": " +
          e.formattedValue +
          ` in ${
            (dateType === "year" && "년") ||
            (dateType === "month" && "월") ||
            (dateType === "day" && "일")
          }: ` +
          e.indexValue
        }
      /> */}
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "날짜",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "매출액",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};
