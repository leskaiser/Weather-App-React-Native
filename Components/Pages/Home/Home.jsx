import {Alert, Keyboard, TouchableWithoutFeedback, View} from "react-native";
import {s} from "./Home.style";
import {getCurrentPositionAsync, requestForegroundPermissionsAsync} from "expo-location";
import {useEffect, useState} from "react";
import {WeatherAPI} from "../../../services/api/meteo";
import {MeteoBasic} from "../../MeteoBasic/MeteoBasic";
import {getWeatherInterpretation} from "../../../services/weather-service";
import {Txt} from "../../Txt/Txt";
import {MeteoAdvanced} from "../../MeteoAdvanced/MeteoAdvanced";
import {useNavigation} from "@react-navigation/native";
import {Container} from "../../Container/Container";
import {SearchBar} from "../../SearchBar/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = () => {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();
  const nav = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    getUserCoords();
  }, []);

  useEffect(() => {
    if (location) {
      setIsRefreshing(true);
      fetchWeatherAndCity().then(() => {
        setLastUpdate(getFormattedLastUpdate());
        setIsRefreshing(false);
      });
    }
  }, [location]);

  const getUserCoords = async () => {
    try {
      const {status} = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude.toString(),
          lng: location.coords.longitude.toString(),
        });
      }
    } catch (e) {
      console.log("Error getting user coordinates:", e);
      setLocation({lng: "9.786072", lat: "4.061536"});
    }
  };

  const fetchWeatherAndCity = async () => {
    try {
      const fetchedWeather = await getWeather(location);
      const fetchedCity = await getCity(location);
      setWeather({weather: fetchedWeather, city: fetchedCity});
    } catch (e) {
      console.error("Error fetching weather and city:", e);
    }
  };

  const getWeather = async (coords) => {
    try {
      return await WeatherAPI.fetchWeatherFormCoords(coords);
    } catch (e) {
      console.error('getWeather Error:', e);
      return {};
    }
  };

  const getCity = async (coords) => {
    try {
      return await WeatherAPI.fetchCityFormCoords(coords);
    } catch (e) {
      console.error('getCity Error:', e);
      return {};
    }
  };

  const switchToForecastPage = () => {
    nav.navigate("Forecast", {
      city: weather.city,
      daily: weather.weather.daily,
      daily_units: weather.weather.daily_units
    });
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchWeatherAndCity().then(() => setIsRefreshing(false));
  };

  const setCordsCity = (cords) => {
    try {
      setLocation(cords);
    } catch (e) {
      console.error('Set Cords Failed:', e);
    }
  };

  const getFormattedLastUpdate = () => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // l'heure '0' doit être '12'
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return {date: `${month}/${day}`, hours: `${hours}:${minutes}:${seconds} ${ampm}`};
  };

  const currentWeather = weather?.weather?.current_weather;

  return (
    <Container>
      {currentWeather ? (
        <>
          <View style={s.basic}>
            <MeteoBasic
              onPress={switchToForecastPage}
              temp={currentWeather.temperature}
              city={weather.city}
              interpretation={getWeatherInterpretation(currentWeather.weathercode)}
              handleRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              lastUpdate={lastUpdate}
            />
          </View>
          <DismissKeyboard>
            <View style={s.searchBar}>
              <SearchBar setCords={setCordsCity}/>
            </View>
          </DismissKeyboard>
          <View style={s.advanced}>
            <MeteoAdvanced data={{
              wind: {speed: currentWeather.windspeed, unit: weather.weather.current_weather_units.windspeed},
              dusk: weather.weather.daily.sunrise[0].split("T")[1],
              dawn: weather.weather.daily.sunset[0].split("T")[1]
            }}/>
          </View>
        </>
      ) : (
        <View style={s.loading}>
          <Txt>Loading...</Txt>
        </View>
      )}
    </Container>
  );
};

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
    {children}
  </TouchableWithoutFeedback>
);
