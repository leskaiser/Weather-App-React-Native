import {Image, View} from "react-native";
import {s, StyledData, StyledView} from "./MeteoAdvanced.style";

export const MeteoAdvanced = ({data}) => {
  return (
    <View style={s.container}>
      <StyledView>
        <StyledData>{data.dawn}</StyledData>
        <Image style={{height: 40, width: 40}} source={require("../../assets/icons/sunset.png")}/>
      </StyledView>
      <StyledView>
        <StyledData>{data.dusk}</StyledData>
        <Image style={{height: 40, width: 40}} source={require("../../assets/icons/sunrise.png")}/>
      </StyledView>
      <StyledView>
        <StyledData style={{marginBottom: 10}}>{data.wind.speed} {data.wind.unit}</StyledData>
        <Image style={{height: 30, width: 30}} source={require("../../assets/icons/wind.png")}/>
      </StyledView>
    </View>
  )
}
