import {View} from "react-native";
import {s} from "./Home.style";
import {getCurrentPositionAsync, requestBackgroundPermissionsAsync} from "expo-location";
import {useEffect, useState} from "react";

export const Home = ({}) => {
  const [cord, setCord] = useState({lng: "9.786072", lat: "4.061536"});

  useEffect(() => {
    getUserCoords().then(() => console.log('finished'));
  }, []);

  const getUserCoords = async () => {
    try {
      const {status} = await requestBackgroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        const location = await getCurrentPositionAsync();
        setCord({
          lat: location.coords.latitude.toString(),
          lng: location.coords.longitude.toString(),
        });
      }
    } catch (e) {
      console.log(e);
    }

  }

  console.log(cord);
  return (
    <>
      <View style={s.basic}></View>
      <View style={s.searchBar}></View>
      <View style={s.advanced}></View>
    </>
  );
}
