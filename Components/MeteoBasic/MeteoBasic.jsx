import {Pressable, View} from "react-native";
import {Txt} from "../Txt/Txt";
import {s} from "./MeteoBasic.style"
import {Clock} from "../Clock/Clock";

export const MeteoBasic = ({onPress, temp, city, interpretation}) => {
  const IconComponent = interpretation.image;

  return (
    <>
      <View style={s.clock}>
        <Clock/>
      </View>

      <Pressable onPress={onPress}><Txt style={s.city}>{city}</Txt></Pressable>

      <Txt style={s.weatherLabel}>{interpretation.label}</Txt>

      <View style={s.tempBox}>
        <Txt style={s.temp}>{Math.round(temp)}°</Txt>
        <View style={s.image}><IconComponent width={150} height={150}/></View>
      </View>
    </>
  );
}
