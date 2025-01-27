import { StyleSheet, Text, TextInput, TextProps } from "react-native";
import { Colors, Fonts, FontSize, Margins } from "../../constants/tokens";

export function SignInText(props: TextProps) {
  return <Text style={styles.text}>Sign In</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.f32,
    marginBottom: Margins.m21,
    color: Colors.white,
    fontFamily: Fonts.AlataRegular,
    alignSelf: "flex-start",
    letterSpacing: -0.5,
  },
});
