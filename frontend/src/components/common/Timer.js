import React, { useState, useEffect } from "react";

const Timer = ({ timerActive, onCheckTime }) => {
  //필요시 조절가능하게
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    let timer;
    //clearInterval(timer);
    if (timerActive) {
      timer = setInterval(() => {
        if (Number(sec) > 0) {
          setSec(Number(sec) - 1);
        }
        if (Number(sec) === 0) {
          if (Number(min) === 0) {
            clearInterval(timer);
            onCheckTime();
          } else {
            setMin(Number(min) - 1);
            setSec(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [min, sec, timerActive, onCheckTime]);

  return (
    <p className="Timer">
      ⏱{min}:{sec < 10 ? `0${sec}` : sec}
    </p>
  );
};
export default Timer;
