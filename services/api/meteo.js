import axios from "axios";
import {data} from "./test-data.js"

export class WeatherAPI {
  static async fetchWeatherFormCoords(coords) {
    // return JSON.parse(data);
    return (await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`)).data;
  }

  static async fetchCityFormCoords(coords) {
    // return "Douala V";
    const {
      address: {
        city,
        municipality
      }
    } = (await (axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`))).data;
    // console.log(city, municipality)
    return city || municipality;
  }
}