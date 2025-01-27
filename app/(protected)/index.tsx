import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import {
  Colors,
  Fonts,
  FontSize,
  LineHeight,
  Margins,
} from "../../constants/tokens";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import Item from "../../components/Item/Item";
import LogOutButton from "../../components/Button/LogOutButton";
import { setIsLoading } from "../../redux/authSlice";
import { fetchProducts } from "../../api/productsAPI";

export default function Products() {
  const token = useSelector((state: RootState) => state.auth.token);
  const loading = useSelector((state: RootState) => state.products.isLoading);
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch();

  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    if (token) {
      fetchProducts(token, dispatch);
    }
  }, [token]);

  useEffect(() => {
    if (token && loading) {
      fetchProducts(token, dispatch);
    }
  }, [loading]);

  const handleRefresh = () => {
    if (token) {
      dispatch(setIsLoading(true));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Products</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        data={products}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            image={item.image}
            id={item.id}
            price={item.price}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        style={styles.flatlist}
      />
      <LogOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: Colors.white,
    marginTop: Margins.m33,
    fontFamily: Fonts.AlataRegular,
    fontSize: FontSize.f16,
    lineHeight: LineHeight.f22,
  },
  flatlist: {
    marginTop: Margins.m43,
  },
});
