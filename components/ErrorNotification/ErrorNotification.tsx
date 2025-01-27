import { useEffect, useState, useCallback, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import {
  Colors,
  FontSize,
  Margins,
  Paddings,
  width,
} from "../../constants/tokens";

interface ErrorNotificationProps {
  error: string | undefined;
  onHide?: () => void;
}

export function ErrorNotification({ error, onHide }: ErrorNotificationProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  const animatedValue = useRef(new Animated.Value(-100)).current;

  const onEnter = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  useEffect(() => {
    if (!error) {
      return;
    }
    setIsShown(true);

    const timerId = setTimeout(() => {
      setIsShown(false);

      if (onHide) {
        onHide();
      }
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error, onHide]);

  if (!isShown) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.error, { transform: [{ translateY: animatedValue }] }]}
      onLayout={onEnter}
    >
      <Text style={styles.errorText}>{error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  error: {
    position: "absolute",
    top: Margins.m0,
    width: width,
    backgroundColor: Colors.red,
    padding: Paddings.p15,
  },
  errorText: {
    fontSize: FontSize.f16,
    color: Colors.white,
    textAlign: "center",
  },
});
