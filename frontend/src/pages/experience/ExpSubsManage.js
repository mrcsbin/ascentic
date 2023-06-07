import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../components/common/Loading';
import ExpSubsManageView from '../../components/experience/ExpSubMangeView';
import { getCookie } from '../../utils/Cookies';
import { useNavigate, useLocation } from 'react-router-dom';
import { requestTasteRes } from '../../api/SubsMemberApi';
const ExpSubsManage = () => {
  const accessToken = getCookie('accessToken');
  const [loading, setLoading] = useState(false);
  const [TasteRes, setTasteRes] = useState([]);
  const [sbMember, setSbmember] = useState({ initial: 'setting' });
  const [subscribe, setSubscribe] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const success = searchParams.get('success');
    if (success == null) return;
    alert(success);
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await requestTasteRes(accessToken); // api 함수 호출
      console.log(result);
      setTasteRes(result); // 결과를 state에 저장
      setLoading(false);
    };

    fetchData();
  }, []);

  const token = {
    headers: {
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
  };

  useEffect(() => {
    getCookie('accessToken') === undefined
      ? navigate('/login')
      : axios
          .all([
            axios.get('/lastSbMember', token),
            axios.get('/getSubscribe', token),
          ])
          .then(
            axios.spread((res1, res2) => {
              setSbmember(res1.data);
              setSubscribe(res2.data);
            })
          )
          .catch((e) => {
            console.log('ExpSubsManage에서 문제생김', e);
            alert('구독서비스 이용내역이 존재하지 않습니다.');
            navigate('/exp/subs');
          });
  }, []);

  // const axiosEnd = performance.now();

  if (sbMember.initial === 'setting') {
    return <Loading />;
  } else {
    // const endTime = performance.now();
    // console.log(
    //   `리턴문 안에 들어온 시간 : ${endTime - startTime}ms. \naxios 끝난시간 ${
    //     axiosEnd - startTime
    //   }ms `
    // );
    // console.log('설정제대로 됐나?', subscribe);
    if (loading) {
      return <Loading />;
    }
    return (
      <ExpSubsManageView
        sbMember={sbMember}
        subscribe={subscribe}
        TasteRes={TasteRes}
      />
    );
  }
};

export default ExpSubsManage;
