import { Slot, SplashScreen, useRouter } from "expo-router";
import { Button, Pressable, StyleSheet, Switch, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { getTokenFromStorage } from "../asyncstorage/authStorage";
import { store } from "../redux/store";
import { setIsLoading, setToken } from "../redux/authSlice";
import { BorderRadius, Colors, Height, Margins } from "../constants/tokens";
import AuthProvider from "../ContextAPI/AuthContext/AuthProvider";
import { useTheme } from "../hooksCustom/useTheme";
import ThemeProvider from "../ContextAPI/ThemeContext/ThemeProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <RootLayoutContent />
        </ThemeProvider>
      </AuthProvider>
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
  const { isEnabled, theme, toggleTheme } = useTheme();
  const router = useRouter();

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
        <Button title="testPage =>" onPress={() => router.push("/test")} />
        <Pressable
          onPress={toggleTheme}
          style={[
            styles.button,
            {
              backgroundColor:
                theme === "light" ? Colors.halfyellow : Colors.brown,
            },
          ]}
        >
          <Text
            style={[
              styles.btnText,
              { color: theme === "light" ? Colors.white : Colors.halfWhite },
            ]}
          >
            Change Theme
          </Text>
        </Pressable>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isEnabled}
        />

        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    bottom: Margins.m0,
    marginVertical: Margins.m10,
    alignSelf: "center",
    width: "95%",
    height: Height.h49,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: Colors.halfyellow,
    borderRadius: BorderRadius.br4,
  },
  btnText: {
    fontSize: 16,
  },
});
