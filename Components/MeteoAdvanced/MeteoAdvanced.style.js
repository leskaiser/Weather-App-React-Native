import {StyleSheet, View} from "react-native";
import {Txt} from "../Txt/Txt";


const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1.5,
    borderColor: "#ffffff",
  }
});

export const StyledView = ({children}) => {
  return (
    <View style={{alignItems: "center"}}>{children}</View>
  )
}

export const StyledData = ({children, style}) => {
  return (
    <Txt style={[{fontSize: 30}, style]}>{children}</Txt>
  )
}

export const StyledTitle = ({children}) => {
  return (
    <Txt style={[{fontSize: 16}]}>{children}</Txt>
  )
}


export {s};