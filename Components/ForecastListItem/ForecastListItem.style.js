import {StyleSheet} from "react-native";


const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: 2,
    marginHorizontal: 30,
  },
  image: {
    // backgroundColor: "red",
    // height: 50,
    // width: 50
  },
  day: {
    fontSize: 20,
    textAlign: "right",
  },
  date: {
    fontSize: 20,
    // width: 50,
    textAlign: "right",
  },
  temp: {
    minWidth: 50,
    textAlign: "right",
  }
});

export {s};