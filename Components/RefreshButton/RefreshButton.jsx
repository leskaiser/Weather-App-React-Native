import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, Animated, StyleSheet, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const BUTTON_SIZE = 30;

const RefreshButton = ({onRefresh, isRefreshing}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const spinnerOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRefreshing) {
      Animated.parallel([
        Animated.timing(spinnerOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        )
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(spinnerOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        })
      ]).start();
      spinValue.setValue(0);
    }
  }, [isRefreshing]);

  const handlePress = () => {
    if (!isDisabled && !isRefreshing) {
      setIsDisabled(true);
      onRefresh();
      setTimeout(() => setIsDisabled(false), 2000);
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled || isRefreshing}
      style={styles.buttonContainer}
    >
      <Animated.View style={[styles.button, {opacity: buttonOpacity}]}>
        <MaterialCommunityIcons
          name="refresh-circle"
          size={BUTTON_SIZE * 0.8}
          color="#007AFF"
        />
      </Animated.View>
      <Animated.View style={[styles.spinner, {opacity: spinnerOpacity}]}>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <MaterialCommunityIcons
            name="loading"
            size={BUTTON_SIZE * 0.8}
            color="#007AFF"
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 0
  },
  button: {
    position: 'absolute',
  },
  spinner: {
    position: 'absolute',
  },
});

export default RefreshButton;