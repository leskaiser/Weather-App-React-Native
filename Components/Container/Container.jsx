import background from "../../assets/background.png";
import {s} from "./Container.style";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground} from "react-native";

export const Container = ({children}) => {
  return (
    <ImageBackground source={background} style={s.imgBackground} imageStyle={s.imgStyle}>
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          {children}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  )
}
