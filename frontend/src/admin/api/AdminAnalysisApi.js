import axios from "axios";

const ADMIN_ANALYSIS_API_URL = "http://localhost:8080/admin/analysis";

export const getProductSalesPerYear = async () => {
  const response = await axios.get(`${ADMIN_ANALYSIS_API_URL}/sales/year`, {
  });
  return response.data;
};