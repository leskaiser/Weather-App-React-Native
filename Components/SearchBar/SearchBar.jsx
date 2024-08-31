import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {s} from './SearchBar.style';
import {Txt} from '../Txt/Txt';
import {WeatherAPI} from '../../services/api/meteo';
import uuid from 'react-native-uuid';

export const SearchBar = ({setCords}) => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchCities = async () => {
      if (cityName.trim().length > 0) {
        setIsLoading(true);
        try {
          const citiesTabs = await WeatherAPI.fetchCoordsFromCity(cityName);
          setCities(citiesTabs || []);
        } catch (e) {
          console.error('Search city Error:', e);
          Alert.alert('Woops!', e.toString());
          setCities([]);
        }
        finally {
          setIsLoading(false);
        }
      } else {
        setCities([]);
      }
    };

    const timeoutId = setTimeout(fetchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [cityName]);

  const setLocation = (location) => {
    setCords(location);
    setCities([]);
    if (inputRef.current) inputRef.current.setNativeProps({text: ''});
    setCityName('');
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={setCityName}
        style={s.input}
        placeholder="Search a town... Ex: Yaounde"
        value={cityName}
        clearButtonMode="always"
      />
      {isLoading ? (
        <Txt style={s.msg}>Searching...</Txt>
      ) : cityName.trim().length > 0 && cities.length === 0 ? (
        <Txt style={s.msg}>No City Found For: {cityName}</Txt>
      ) : (
        <ScrollView style={s.ScrollView}>
          {cities.map(city => (
            <CityItem
              key={uuid.v4()}
              city={city}
              setLocation={setLocation}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const CityItem = ({city, setLocation}) => {
  return (
    <TouchableOpacity
      style={s.cityItem}
      onPress={() => setLocation({lat: city.latitude, lng: city.longitude})}
    >
      <Txt style={s.cityItemTxt}>{city.name}, {city.admin1}, {city.country}</Txt>
    </TouchableOpacity>
  );
};