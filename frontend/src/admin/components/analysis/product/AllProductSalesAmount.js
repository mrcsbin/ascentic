import { useEffect, useState } from "react";
import { GetAllProductSalesData } from "../data";
import { ResponsiveBar } from "@nivo/bar";

export const AllProductSalesAmount = ({ dateType }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllProductSalesData(dateType);
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateType]);

  if (isLoading) {
    return <div>..........</div>;
  }

  return (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <ResponsiveBar
        data={data}
        keys={["판매액"]}
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
      />
    </div>
  );
};
