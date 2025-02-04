import { Button, Text, View } from "react-native";
import { useAuth } from "../../../hooksCustom/useAuth";
import { useRouter } from "expo-router";
import Loader from "../../../components/Loader/Loader";

export default function AuthTestPage() {
  const { isAuth, login, logout } = useAuth();
  const router = useRouter();

  const redirectToMainPage = () => {
    router.push("/");
  };

  return (
    <View style={{ gap: 5 }}>
      {isAuth === null ? (
        <Text style={{ color: "white" }}>
          <Loader></Loader>
        </Text>
      ) : (
        <>
          <Button title="Login" onPress={login} />
          <Button title="Logout" onPress={logout} />
          <Button title="Exit test page" onPress={redirectToMainPage} />
          <Text style={{ color: "white", fontSize: 25, alignSelf: "center" }}>
            Authorized value: {`${isAuth}`}
          </Text>
        </>
      )}
    </View>
  );
}
