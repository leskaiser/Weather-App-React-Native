import {Txt} from "../Txt/Txt";
import {nowHours} from "../../services/date-service";
import {s} from "./Clock.style"
import {useEffect, useState} from "react";

export const Clock = () => {
  const [time, setTime] = useState(nowHours())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(nowHours())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Txt style={s.time}>{time}</Txt>
    </>
  )
}
