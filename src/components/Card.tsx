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
  onPress?(): void;
  children?: React.ReactNode;
}

const defaultProps = {
  isButton: false,
  cardStyle: {},
  onPress: () => {},
  children: undefined,
};

const Card: React.FC<Props> = (props: Props) => {
  const { isButton, cardStyle, children, onPress } = props;
  const style = [cardStyle, styles.cardContainer];
  if (isButton) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={style}>{children}</View>;
};

Card.defaultProps = defaultProps;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: "#8A959E",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.21,
    shadowRadius: 10,
    elevation: 2,
    borderRadius: 8,
    backgroundColor: "white",
  },
});

export default Card;
