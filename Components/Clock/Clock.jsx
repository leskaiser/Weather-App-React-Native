import {Txt} from "../Txt/Txt";
import {s} from "./Clock.style"

export const Clock = ({lastUpdate}) => {
  // const [time, setTime] = useState(nowHours())
  //
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(nowHours())
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  console.log(lastUpdate.date);
  return (
    <>
      <Txt style={s.time}>Last Update: {lastUpdate.date} at {lastUpdate.hours}</Txt>
    </>
  )
}
