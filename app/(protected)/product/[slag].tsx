import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  BorderRadius,
  Colors,
  Fonts,
  FontSize,
  Gaps,
  Height,
  LineHeight,
  Margins,
  Paddings,
  Weight,
} from "../../../constants/tokens";
import { useEffect, useState } from "react";
import { screenWidth } from "../../../components/Item/Item";

type Rating = {
  rate: number;
  count: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: Rating;
};

export default function ProductDetails() {
  const { slag } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${slag}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [slag]);

  if (!product) {
    return <ActivityIndicator size="large" />;
  }

  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={goBack}>
        <Image
          source={require("../../../assets/icons/arrowleft2.png")}
          style={styles.arrowLeft}
        ></Image>
      </Pressable>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.returnsContainer}>
          <Text style={styles.returns}>Shipping & Returns</Text>
          <Text style={styles.description}>
            Free standard shipping and free 60-day returns
          </Text>
        </View>

        <View style={styles.reviewsContainer}>
          <Text style={styles.returns}>Rewiews</Text>
          <Text style={styles.rate}>{product.rating.rate} Ratings</Text>
          <Text style={styles.description}>{product.rating.count} Rewiews</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Paddings.p10,
    //backgroundColor: Colors.brown,
  },
  button: {
    position: "relative",
    borderRadius: BorderRadius.br100,
    backgroundColor: Colors.card,
    width: Weight.w40,
    height: Height.h40,
    marginTop: Margins.m21,
  },
  arrowLeft: {
    position: "absolute",
    top: Margins.m12,
    left: Margins.m12,
    width: Weight.w16,
    height: Height.h16,
  },
  image: {
    width: screenWidth / 2,
    borderRadius: BorderRadius.br8,
    height: Height.h300,
    marginBottom: Margins.m20,
    alignSelf: "center",
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.f16,
    fontFamily: Fonts.AlataRegular,
    lineHeight: LineHeight.f22,
    marginBottom: Margins.m10,
  },
  price: {
    color: Colors.yellow,
    fontFamily: Fonts.GabaritoBold,
    lineHeight: LineHeight.f19,
    fontSize: FontSize.f16,
    marginBottom: Margins.m20,
  },
  infoContainer: {
    gap: Gaps.g10,
  },
  description: {
    color: Colors.halfWhite,
    fontSize: FontSize.f12,
    fontFamily: Fonts.AlataRegular,
    lineHeight: LineHeight.f19,
  },
  returns: {
    color: Colors.white,
    fontSize: FontSize.f16,
    fontFamily: Fonts.AlataRegular,
    lineHeight: LineHeight.f22,
  },
  returnsContainer: {
    marginVertical: Margins.m20,
  },
  reviewsContainer: {
    gap: Gaps.g10,
  },
  rate: {
    color: Colors.white,
    fontFamily: Fonts.AlataRegular,
    lineHeight: LineHeight.f33,
    fontSize: FontSize.f24,
  },
});
