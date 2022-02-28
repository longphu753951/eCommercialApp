import React, { Children, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Props {
  isButton?: boolean;
  cardStyle?: any;
  onPress(): void;
  children?: React.ReactNode;
}
const Card: React.FC<Props> = (props: Props) => {
  const { isButton, cardStyle, children, onPress } = props;
  console.log(cardStyle);
  const style = cardStyle !== {} ? cardStyle: styles.cardContainer ;
  if (isButton) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={style}>{children}</View>;
};

Card.defaultProps = {
  isButton: false,
  cardStyle: {},
  onPress: () => {},
  children: <></>,
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: (Dimensions.get("window").height * 2.21) / 100,
    shadowColor: "#8A959E",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.21,
    shadowRadius: 10,
    elevation: 2,
    borderRadius: 8,
    paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
    backgroundColor: "white",
    marginTop: (Dimensions.get("window").height * 1.85) / 100,
  },
});

export default Card;
