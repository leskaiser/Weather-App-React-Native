import {Home} from "./Components/page/Home/Home";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground} from "react-native";
import background from "./assets/background.png";
import {s} from "./Components/css/App.style";

export default function App() {
  return (
    <ImageBackground source={background} style={s.imgBackground} imageStyle={s.imgStle}>
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          <Home/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
