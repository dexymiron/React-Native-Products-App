import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ErrorNotification } from "../../components/ErrorNotification/ErrorNotification";
import { Input } from "../../components/Input/Input";
import { LoginButton } from "../../components/Button/LoginButton";
import { SignInText } from "../../components/Text/SignInText";
import { Margins, Paddings } from "../../constants/tokens";

export default function LoginScreen() {
  const [error, setError] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const alert = (text: string) => {
    setError(text);
  };

  const handleNext = () => {
    if (!username) {
      alert("Field can't be empty");
      return;
    }
    router.push({
      pathname: "/login/password",
      params: { username },
    });
  };

  return (
    <View style={styles.container}>
      <ErrorNotification error={error} onHide={() => setError(undefined)} />
      <View style={styles.loginContainer}>
        <SignInText />
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <LoginButton text="Continue" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: Paddings.p20,
  },
  loginContainer: {
    marginTop: Margins.m123,
  },
});
