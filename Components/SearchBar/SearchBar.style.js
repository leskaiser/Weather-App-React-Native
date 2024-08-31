import {StyleSheet} from "react-native";

const s = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    height: 40,
    paddingLeft: 20,
    borderRadius: 20,
    fontFamily: "Alata-Regular",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  cityItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: "#eeeeee",
    width: "100%",
    marginVertical: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  ScrollView: {
    padding: 15,
    paddingTop: 5,
    height: "80%"
  },
  cityItemTxt: {
    textAlign: "center",
    fontSize: 18,
    color: "#0F0F0F"
  },
  msg: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10
  }
})

export {s};