import { Pressable, StyleSheet, Text } from "react-native";
import { BorderRadius, Colors, Height, Margins } from "../../constants/tokens";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const LogOutButton = () => {
  const dispatch = useDispatch();

  return (
    <Pressable onPress={() => dispatch(logout())} style={styles.button}>
      <Text style={styles.btnText}>LogOut</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "relative",
    bottom: Margins.m0,
    marginVertical: Margins.m10,
    alignSelf: "center",
    width: "95%",
    height: Height.h49,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.halfyellow,
    borderRadius: BorderRadius.br4,
  },
  btnText: {
    color: Colors.white,
  },
});

export default LogOutButton;
