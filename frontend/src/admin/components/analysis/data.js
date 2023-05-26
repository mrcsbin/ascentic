import {
  getAllProductSalesData,
  getProductTypeSalesData,
} from "../../api/AdminAnalysisApi";

export const GetProductTypeSalesData = async (type, dateType) => {
  return await getProductTypeSalesData(type, dateType);
};

export const GetAllProductSalesData = async (dateType) => {
  return await getAllProductSalesData(dateType);
};
