import { useEffect } from "react";
import { getProductSalesPerYear } from "../../api/AdminAnalysisApi";

export const ProductSalesPerYearData = async () => {
  const data = await getProductSalesPerYear();

  const transformedData = data.reduce((acc, item) => {
    const { year, salesAmount, productCategory } = item;
    if (!acc[year]) {
      acc[year] = {
        년: year,
        향수: 0,
        향수Color: "hsl(47, 70%, 50%)",
        디퓨저: 0,
        디퓨저Color: "hsl(14, 70%, 50%)",
        향초: 0,
        향초Color: "hsl(359, 70%, 50%)",
        핸드크림: 0,
        핸드크림Color: "hsl(167, 70%, 50%)",
        샴푸: 0,
        샴푸Color: "hsl(76, 70%, 50%)",
        바디워시: 0,
        바디워시Color: "hsl(241, 70%, 50%)",
        섬유향수: 0,
        섬유향수Color: "hsl(313, 70%, 50%)",
      };
    }
    acc[year][productCategory] += salesAmount;
    return acc;
  }, {});

  const responseData = Object.values(transformedData);
  return responseData;
};

export const ProductSalesPerMonthData = () => {
  useEffect(() => {
    const fetchData = async () => {
      const salesPerYearData = await getProductSalesPerYear();
      console.log(salesPerYearData);
    };

    fetchData();
  }, []);
};

export const ProductSalesPerDayData = () => {
  useEffect(() => {
    const fetchData = async () => {
      const salesPerYearData = await getProductSalesPerYear();
      console.log(salesPerYearData);
    };

    fetchData();
  }, []);
};
