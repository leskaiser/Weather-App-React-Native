import {StyleSheet} from "react-native";

const s = StyleSheet.create({
  clock: {
    alignItems: "flex-end",
  },
  weatherLabel: {
    alignSelf: "flex-end",
    transform: [{rotate: "-90deg"}],
    fontSize: 20,
    // marginBottom: 10
  },
  image: {
    // display: "flex",
    // backgroundColor: "#ffffff",
  },
  tempBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "#203f5b"
  },
  temp: {
    fontSize: 160,
    // backgroundColor: "red",
    letterSpacing: -7
  },
  city: {
    fontSize: 40,
    marginBottom: 0
  },
  refresh: {
    // alignSelf: "auto",
    marginTop: 80,
    marginLeft: -30
  }

});

export {s};