import {TouchableOpacity, View} from "react-native";
import {Txt} from "../Txt/Txt";
import {s} from "./MeteoBasic.style"
import {Clock} from "../Clock/Clock";
import RefreshButton from "../RefreshButton/RefreshButton";

export const MeteoBasic = ({onPress, temp, city, interpretation, handleRefresh, isRefreshing, lastUpdate}) => {
  const IconComponent = interpretation.image;

  return (
    <>
      <View style={s.clock}>
        <Clock lastUpdate={lastUpdate}/>
      </View>

      <TouchableOpacity onPress={onPress}><Txt style={s.city}>{city}</Txt></TouchableOpacity>

      <Txt style={s.weatherLabel}>{interpretation.label}</Txt>

      <View style={s.tempBox}>
        <Txt style={s.temp}>{Math.round(temp)}°</Txt>
        <View style={s.refresh}><RefreshButton onRefresh={handleRefresh} isRefreshing={isRefreshing}/></View>
        <IconComponent style={s.image} width={140} height={140}/>
      </View>
    </>
  );
}
