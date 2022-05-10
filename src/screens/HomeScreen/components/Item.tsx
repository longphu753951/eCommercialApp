import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

interface Props {
  item: any;
  onSelectItem?(): void;
}

const Item: React.FC<Props> = (props: Props) => {
  const { item, onSelectItem } = props;

  return (
    <TouchableOpacity
      key={item.id}
      style={styles.itemButtonContainer}
      onPress={onSelectItem}
    >
      <View>
        <Image
          source={{ uri: item.productAttribute.productImage[0].image }}
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.shoppingIconContainer}>
          <Fontisto
            name="shopping-bag"
            size={(Dimensions.get("window").height * 1.97) / 100}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemContentContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>$ {item.productAttribute.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

Item.defaultProps = {
  item: undefined,
  onSelectItem: () => {},
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    marginTop: (Dimensions.get("window").height * 2.46) / 100,
  },
  nameText: {
    fontFamily: "NunitoSans-Light",
    fontSize: (Dimensions.get("window").height * 1.724) / 100,
    marginTop: (Dimensions.get("window").width * 2.66) / 100,
  },
  shoppingIconContainer: {
    width: (Dimensions.get("window").height * 3.69) / 100,
    height: (Dimensions.get("window").height * 3.69) / 100,
    backgroundColor: "rgba(96, 96, 96, 0.4)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: (Dimensions.get("window").height * 19.7) / 100,
    left: (Dimensions.get("window").width * 31.2) / 100,
    borderRadius: 8,
  },
  itemImage: {
    width: "100%",
    height: (Dimensions.get("window").height * 24.63) / 100,
    borderRadius: 10,
  },
  itemButtonContainer: {
    width: (Dimensions.get("window").width * 42) / 100,
    height: (Dimensions.get("window").height * 31) / 100,
    marginBottom: 15,
  },
  itemContentContainer: {
    flexDirection: "column",
  },
  priceText: {
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 1.724) / 100,
    marginTop: (Dimensions.get("window").width * 1.13) / 100,
  },
});

export default Item;