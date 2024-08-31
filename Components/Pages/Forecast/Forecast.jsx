import {Txt} from "../../Txt/Txt";
import {Container} from "../../Container/Container";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Image, Pressable, Touchable, TouchableOpacity, View} from "react-native";
import {s} from "./Forecast.style"
import {ForecastListItem} from "../../ForecastListItem/ForecastListItem";
import uuid from "react-native-uuid";
import {getWeatherInterpretation} from "../../../services/weather-service";
import {DAYS, formatDate} from "../../../services/date-service";

export const Forecast = () => {
  const {params} = useRoute();
  const nav = useNavigation();


  console.log(params);
  return (
    <Container>
      <Header city={params.city} nav={nav}/>
      <ForecastList data={params.daily} units={params.daily_units}/>
    </Container>
  )
}


const BackButton = ({nav}) => {
  return (
    <TouchableOpacity style={[s.backButton]} onPress={() => nav.goBack()}>
      <Image style={{height: 25, width: 25}} source={require("../../../assets/icons/go-back.png")}/>
    </TouchableOpacity>
  );
}

const Header = ({city, nav}) => {
  return (
    <View style={s.header}>
      <BackButton nav={nav}/>
      <View style={s.headerText}>
        <Txt>{city}</Txt>
        <Txt style={s.subTitle}>07 Day Forecast</Txt>
      </View>
    </View>
  )
}

const ForecastList = ({data, units}) => {
  return (
    <View style={{marginTop: 50}}>
      {/*<ForecastListItem temp={"28.6°C"} date={"2024-08-15"} day={"FRI"} image={SnowGrainsIcon}/>*/}
      {data.time.map((time, index) => {
        const image = getWeatherInterpretation(data.weathercode[index]).image;
        const temp = `${data.temperature_2m_max[index]} ${units.temperature_2m_max}`;
        const date = new Date(time);
        const day = DAYS[date.getDay()];
        const d = formatDate(date)

        return <ForecastListItem key={uuid.v4()}
                                 temp={temp}
                                 date={d}
                                 day={day}
                                 image={image}/>
      })}
    </View>
  )
}

