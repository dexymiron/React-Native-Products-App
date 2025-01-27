import { Slot, SplashScreen } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { getTokenFromStorage } from "../asyncstorage/authStorage";
import { store } from "../redux/store";
import { setIsLoading, setToken } from "../redux/authSlice";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}

function RootLayoutContent() {
  const [initDone, setInitDone] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    AlataRegular: require("../assets/fonts/Alata-Regular.ttf"),
    GabaritoBold: require("../assets/fonts/Gabarito-Bold.ttf"),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (fontsError) {
      console.error("Font loading error:", fontsError);
    }
  }, [fontsError]);

  useEffect(() => {
    if (!fontsLoaded) return;

    (async () => {
      try {
        const savedToken = await getTokenFromStorage();
        if (savedToken) {
          dispatch(setToken(savedToken));
        }
      } catch (err) {
        console.error("Error reading token:", err);
      } finally {
        dispatch(setIsLoading(false));
        setInitDone(true);
        SplashScreen.hideAsync();
      }
    })();
  }, [fontsLoaded]);

  if (!fontsLoaded || !initDone) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
