import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import ExpSubsManageView from "../../components/experience/ExpSubMangeView";
import { getCookie } from "../../utils/Cookies";
import { useLocation } from "react-router-dom";
const ExpSubsManage = () => {
  const [sbMember, setSbmember] = useState({ initial: "setting" });
  const [subscribe, setSubscribe] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const startTime = performance.now();
  // console.log(`startTime = ${startTime}`);

  const success = searchParams.get("success");

  const token = {
    headers: {
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  };

  useEffect(() => {
    axios
      .all([
        axios.get("/lastSbMember", token),
        axios.get("/getSubscribe", token),
      ])
      .then(
        axios.spread((res1, res2) => {
          setSbmember(res1.data);
          setSubscribe(res2.data);
        })
      )
      .catch((e) => {
        console.log("ExpSubsManage에서 문제생김", e);
      });
  }, []);

  // const axiosEnd = performance.now();

  if (sbMember.initial === "setting") {
    return <Loading />;
  } else {
    // const endTime = performance.now();
    // console.log(
    //   `리턴문 안에 들어온 시간 : ${endTime - startTime}ms. \naxios 끝난시간 ${
    //     axiosEnd - startTime
    //   }ms `
    // );
    // console.log('설정제대로 됐나?', subscribe);

    return (
      <ExpSubsManageView
        sbMember={sbMember}
        subscribe={subscribe}
        success={success}
      />
    );
  }
};

export default ExpSubsManage;
