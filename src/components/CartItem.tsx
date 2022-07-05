import * as React from "react";
import { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  image?: any;
  content?: React.ReactNode;
  size: number;
  bottomContent?: React.ReactNode;
  isRemoving?: boolean;
  disableButton?: boolean
  cartStyle?: any;
  onRemoving?(): void;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const imageSize = (height * 12.31) / 100;
const seperate = (width * 5.33) / 100;
const contentWidth = (width * 57.33) / 100;

const CartItem: React.FC<Props> = (props: Props) => {
  const { content, image, bottomContent, isRemoving, cartStyle, onRemoving, disableButton, size } = props;
  return (
    <View style={[styles.itemContainer, cartStyle]}>
      <Image style={[styles.itemImage, size ? {width: size, height: size}: {}]} source={image} />
      <View style={styles.contentItemContainer}>
        <View style={styles.itemTextContainer}>
          {content}
          {isRemoving && (
            <TouchableOpacity
              disabled={disableButton}
              style={{
                width: (height * 3.69) / 100,
                alignItems: "center",
              }}
              onPress= {onRemoving}
            >
              <FontAwesomeIcon
                size={(height * 2.401) / 100}
                icon={faCircleXmark}
                color={"#BDBDBD"}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomCotainer}>{bottomContent}</View>
      </View>
    </View>
  );
};

CartItem.defaultProps = {
  image: require(""),
  onRemoving: () => {},
  content: undefined,
  bottomContent: undefined,
  isRemoving: true,
  disableButton: false,
  cartStyle: {},
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: (height * 1.47) / 100,
    paddingBottom: (height * 1.47) / 100,
    flexDirection: "row",
    width: "100%",
  },
  itemImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
  },
  itemTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentItemContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    marginLeft: seperate,
    width: contentWidth,
  },
  bottomCotainer: {
    alignContent: "flex-end",
  },
});

export default CartItem;
