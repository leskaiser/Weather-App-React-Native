import {View} from "react-native";
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

export const Home = () => {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();
  const nav = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getUserCoords();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherAndCity();
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
            />
          </View>
          <View style={s.searchBar}></View>
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