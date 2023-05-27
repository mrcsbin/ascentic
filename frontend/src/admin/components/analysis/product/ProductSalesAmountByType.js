import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { GetProductTypeSalesData } from "../data";
import { useEffect, useState } from "react";

export const ProductSalesAmountByType = ({ productType, dateType }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const [dateType, setDateType] = useState("year");
  const [groupMode, setGroupMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetProductTypeSalesData(productType, dateType);
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productType, dateType, groupMode]);

  if (isLoading) {
    return <div>..........</div>;
  }

  return (
    <div style={{ width: "70%", height: "400px", margin: "100px auto" }}>
      <ResponsiveBar
        data={data}
        keys={
          (productType === "category" && [
            "향수",
            "디퓨저",
            "향초",
            "핸드크림",
            "샴푸",
            "바디워시",
            "섬유향수",
          ]) ||
          (productType === "scent" && [
            "Animal",
            "Citrus",
            "Floral",
            "Fruity",
            "Herbal&Green",
            "Mossy",
            "Special",
            "Watery&Powdery",
            "Woody",
          ])
        }
        indexBy={
          (dateType === "year" && "년") || (dateType === "month" && "월")
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
            (dateType === "year" && "년") || (dateType === "month" && "월"),
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
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id +
          ": " +
          e.formattedValue +
          ` in ${
            (dateType === "year" && "년") || (dateType === "month" && "월")
          }: ` +
          e.indexValue
        }
        groupMode={groupMode ? "grouped" : ""}
      />
      {/* <TempButtonBox>
        <button
          onClick={() => {
            setDateType("year");
          }}
        >
          Year!!
        </button>
        <button
          onClick={() => {
            setDateType("month");
          }}
        >
          Month!!
        </button>
      </TempButtonBox>
      <TempButtonBox>
        <button
          onClick={() => {
            setGroupMode(false);
          }}
        >
          TotalMode!!!
        </button>
        <button
          onClick={() => {
            setGroupMode(true);
          }}
        >
          GroupMode!!!
        </button>
      </TempButtonBox> */}
    </div>
  );
};

const Wrap = styled.div``;

const TempButtonBox = styled.div`
  margin: 0 auto;
  text-align: center;
`;
