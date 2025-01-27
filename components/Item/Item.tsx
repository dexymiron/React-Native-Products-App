import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import {
  BorderRadius,
  Colors,
  Fonts,
  FontSize,
  Height,
  LineHeight,
  Margins,
  Paddings,
} from "../../constants/tokens";

type ItemProps = {
  title: string;
  image: string;
  id: string;
  price: string;
};

export const screenWidth = Dimensions.get("window").width;

function Item({ title, image, id, price }: ItemProps) {
  return (
    <View style={styles.container}>
      <Link href={`/product/${id}`}>
        <Image style={styles.img} source={{ uri: image }} resizeMode="cover" />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.card,
    paddingBottom: Paddings.p16,
    alignItems: "center",
    margin: Margins.m10,
    borderRadius: BorderRadius.br8,
    overflow: "hidden",
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.f12,
    fontFamily: Fonts.AlataRegular,
    lineHeight: LineHeight.f19,
    padding: Paddings.p4,
  },
  price: {
    color: Colors.white,
    fontSize: FontSize.f12,
    fontFamily: Fonts.GabaritoBold,
    lineHeight: LineHeight.f14,
    paddingHorizontal: Paddings.p4,
  },
  img: {
    width: screenWidth / 2 - 30,
    height: Height.h220,
  },
});

export default Item;
