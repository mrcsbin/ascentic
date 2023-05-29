import axios from "axios";

const ADMIN_CUSTOMER_SERVICE_API_URL = "http://localhost:8080";

export const getAllInquiryList = async () => {
  const response = await axios.get(
    `${ADMIN_CUSTOMER_SERVICE_API_URL}/inquiry/getAdminInquiry`
  );
  return response.data;
};

export const getNewInquiryList = async () => {
  const response = await axios.get(
    `${ADMIN_CUSTOMER_SERVICE_API_URL}/inquiry/new`
  );
  return response.data;
};

export const postInquiry = async (inquiryNum, inquiryComment) => {
  await axios.post(`${ADMIN_CUSTOMER_SERVICE_API_URL}/inquiry/commentInquiry`, {
    inquiryNum,
    inquiryComment,
  });
  window.location.reload();
};
