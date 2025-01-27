import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { BorderRadius, Colors, Margins, Paddings } from "../constants/tokens";
import { router } from "expo-router";

export default () => {
  const goback = () => {
    router.back();
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/404image.png")}
        resizeMode="contain"
        borderRadius={BorderRadius.br15}
      />
      <Pressable style={styles.button} onPress={goback}>
        <Text style={styles.text}>GO BACK</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.yellow,
    padding: Paddings.p10,
    marginTop: Margins.m16,
    borderRadius: BorderRadius.br4,
  },
  text: {
    color: Colors.placeholder,
  },
});
