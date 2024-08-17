import {View} from "react-native";
import {s} from "./ForecastListItem.style";
import {Txt} from "../Txt/Txt";

export const ForecastListItem = ({image, day, date, temp}) => {
  const IconComponent = image;
  return (
    <View style={s.container}>
      <IconComponent style={s.image} width={50} height={50}/>
      <Txt style={s.day}>{day}</Txt>
      <Txt style={s.date}>{date}</Txt>
      <Txt style={s.temp}>{temp}</Txt>
    </View>
  )
}
