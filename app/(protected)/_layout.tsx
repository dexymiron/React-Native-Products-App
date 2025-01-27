import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "expo-router";
import { Colors, Paddings } from "../../constants/tokens";

export default function ProtectedLayout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login/login");
    }
  }, [token]);

  if (!token) {
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
  container: {
    flex: 1,
    paddingHorizontal: Paddings.p10,
    backgroundColor: Colors.brown,
  },
});
