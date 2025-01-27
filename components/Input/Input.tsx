import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  BorderRadius,
  Colors,
  Fonts,
  FontSize,
  Height,
  Margins,
  Paddings,
  Weight,
} from "../../constants/tokens";
import { useState } from "react";
import ShowIconPass from "../../assets/icons/ShowIconPass";
import HideIconPass from "../../assets/icons/HideIconPass";

export function Input(props: TextInputProps & { isPassword?: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={25}
        style={styles.input}
        secureTextEntry={props.isPassword && !isPasswordVisible}
        placeholderTextColor={Colors.halfWhite}
        {...props}
      />
      {props.isPassword && (
        <Pressable
          style={styles.showPassIcon}
          onPress={() => setIsPasswordVisible((state) => !state)}
        >
          {isPasswordVisible ? <ShowIconPass /> : <HideIconPass />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    height: Height.h56,
    width: "100%",
    borderRadius: BorderRadius.br4,
    backgroundColor: Colors.placeholder,
    fontFamily: Fonts.AlataRegular,
    fontSize: FontSize.f16,
    marginBottom: Paddings.p16,
    paddingLeft: Paddings.p12,
    paddingVertical: Paddings.p10,
    color: Colors.white,
    letterSpacing: -0.5,
  },
  showPassIcon: {
    position: "absolute",
    width: Weight.w24,
    height: Height.h24,
    zIndex: 1,
    top: Margins.m15,
    right: Margins.m30,
  },
});
