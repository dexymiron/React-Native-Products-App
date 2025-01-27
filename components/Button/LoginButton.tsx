import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";
import { BorderRadius, Colors, Fonts, Height } from "../../constants/tokens";

export function LoginButton({
  text,
  loading,
  ...props
}: PressableProps & { text: string; loading?: boolean }) {
  const animatedValue = new Animated.Value(0);
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.yellow, Colors.halfWhite],
  });

  const FadeIn = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
    }).start();
    props.onPressIn && props.onPressIn(e);
  };

  const FadeOut = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    props.onPressOut && props.onPressOut(e);
  };

  return (
    <Pressable {...props} onPressIn={FadeIn} onPressOut={FadeOut}>
      <Animated.View style={{ ...styles.button, backgroundColor: color }}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: Height.h49,
    borderRadius: BorderRadius.br100,
    width: "100%",
  },
  text: {
    color: Colors.brown,
    fontFamily: Fonts.AlataRegular,
    letterSpacing: -0.5,
  },
});
