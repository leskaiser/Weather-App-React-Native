import {StyleSheet} from "react-native";

const s = StyleSheet.create({
  clock: {
    alignItems: "flex-end",
  },
  weatherLabel: {
    alignSelf: "flex-end",
    transform: [{rotate: "-90deg"}],
    fontSize: 20
  },
  image: {
    // display: "flex",
    alignSelf: "stretch",
    height: 150,
    width: 150,
    // backgroundColor: "#ffffff",
    margin: 10,
    marginTop: 30
  },
  tempBox: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  temp: {
    fontSize: 160
  },
  city: {
    fontSize: 40
  }

});

export {s};