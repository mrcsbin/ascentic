import {
  getAllProductSalesData,
  getProductTypeSalesData,
  getMembershipTrend,
  getSubscribeMemberPerMember,
} from "../../api/AdminAnalysisApi";

export const GetProductTypeSalesData = async (type, dateType) => {
  return await getProductTypeSalesData(type, dateType);
};

export const GetAllProductSalesData = async (dateType) => {
  return await getAllProductSalesData(dateType);
};

export const GetMembershipTrend = async (dateType) => {
  const response = await getMembershipTrend(dateType);

  const data = [
    {
      id: "회원가입 수",
      color: "hsl(224, 70%, 50%)",
      data: response,
    },
  ];

  return data;
};

export const GetSubscribeMemberPerMember = async () => {
  return await getSubscribeMemberPerMember();
}