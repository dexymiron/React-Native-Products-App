import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/Input/Input";
import { Margins, Paddings } from "../../constants/tokens";
import { LoginButton } from "../../components/Button/LoginButton";
import { setIsLoading, setToken } from "../../redux/authSlice";
import { saveTokenToStorage } from "../../asyncstorage/authStorage";
import { SignInText } from "../../components/Text/SignInText";
import { ErrorNotification } from "../../components/ErrorNotification/ErrorNotification";
import { RootState } from "../../redux/store";

export default function PasswordScreen() {
  const [error, setError] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.isLoading);

  const alert = (text: string) => {
    setError(text);
  };

  const handleLogin = async () => {
    if (!password) {
      alert("Field can`t be empty");
      return;
    }

    dispatch(setIsLoading(true));

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data?.token) {
        dispatch(setToken(data.token));
        await saveTokenToStorage(data.token);
        router.replace("/(protected)");
      } else {
        alert("Login or password isn`t correct!");
      }
    } catch (err) {
      alert("Auth Error. Login or password isn`t correct!");
    }
    dispatch(setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <ErrorNotification error={error} onHide={() => setError(undefined)} />
      <View style={styles.loginContainer}>
        <SignInText />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />
        <LoginButton
          text="Continue"
          onPress={handleLogin}
          disabled={loading}
          loading={loading}
        ></LoginButton>
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
