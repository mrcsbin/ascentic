import { useEffect } from "react";
import { getSalesPerYearData } from "./data";

export const ProductCategoryAnalysis = () => {
  useEffect(() => {
    const fetchAndProcessData = async () => {
      const salesPerYearData = await getSalesPerYearData();
    };

    fetchAndProcessData();
  }, []);
};
