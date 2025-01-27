import { useRootNavigationState, Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function AppIndex() {
  const rootNavState = useRootNavigationState();
  const token = useSelector((state: RootState) => state.auth.token);

  if (!rootNavState?.key) {
    return null;
  }
  if (token) {
    return <Redirect href="/(protected)" />;
  } else {
    return <Redirect href="/login/login" />;
  }
}
