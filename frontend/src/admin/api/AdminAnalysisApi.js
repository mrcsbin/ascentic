import axios from "axios";

const ADMIN_ANALYSIS_API_URL = "http://localhost:8080/admin/analysis";

export const getAllProductSalesData = async (dateType) => {
  const response = await axios.get(
    `${ADMIN_ANALYSIS_API_URL}/sales/all?dateType=${dateType}`
  );
  return response.data;
};

export const getProductTypeSalesData = async (type, dateType) => {
  const response = await axios.get(
    `${ADMIN_ANALYSIS_API_URL}/sales/${type}?dateType=${dateType}`
  );
  return response.data;
};

export const getMembershipTrend = async (dateType) => {
  const response = await axios.get(
    `${ADMIN_ANALYSIS_API_URL}/member?dateType=${dateType}`
  );
  return response.data;
};

export const getSubscribeMemberPerMember = async () => {
  const response = await axios.get(`${ADMIN_ANALYSIS_API_URL}/subscribe`);
  return response.data;
};

export const getSubscribeProductScore = async () => {
  const response = await axios.get(`${ADMIN_ANALYSIS_API_URL}/subscribe/score`);
  return response.data;
}