import React from "react";
import { Dimensions, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

interface Props {
  category: any;
  onSelectCategory?(): void;
  isChoosen: boolean;
}

const Category: React.FC<Props> = (props: Props) => {
  const { category, onSelectCategory, isChoosen } = props;
  return (
    <TouchableOpacity
      key={category?.id}
      onPress={onSelectCategory}
      style={styles.categoryButtonContainer}
    >
      <View style={[styles.iconContainer, {backgroundColor: isChoosen ? "#303030" : "#F0F0F0"}]}>
        <Image
          resizeMode="contain"
          style={[
            styles.icon,
            {
              tintColor: isChoosen ? "white" : "#909090",
            },
          ]}
          source={
            isChoosen
              ? { uri: category?.image_solid }
              : { uri: category?.image_outline }
          }
        />
      </View>
      <Text style={styles.titleText}>{category?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleText: {
    marginTop: (Dimensions.get("window").height * 0.61) / 100,
    textAlign: "center",
    color: "#808080",
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.724) / 100,
  },

  categoryButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: (Dimensions.get("window").width * 6.66) / 100,
  },
  icon: {
    height: (Dimensions.get("window").height * 3.44) / 100,
    width: (Dimensions.get("window").height * 3.44) / 100,
  },
  iconContainer: {
    width: (Dimensions.get("window").height * 5.42) / 100,
    height: (Dimensions.get("window").height * 5.42) / 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

Category.defaultProps = {
    category: undefined,
    onSelectCategory: () => {},
    isChoosen: false,
}

export default Category;
