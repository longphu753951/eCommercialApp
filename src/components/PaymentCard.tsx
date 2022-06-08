import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View, 
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ImageSourcePropType,
} from "react-native";
import { cardStyle, cardType } from "config/mockData";
import { isIphoneX } from "react-native-iphone-x-helper";
import _ from "lodash";
import { Card } from "config/types";

interface Props {
  card: Card;
  isPressable: boolean;
}

const PaymentCard = (props: Props) => {
  const { card, isPressable } = props;

  const setCardNumber = (number: string): string => {
    return "**** **** " + number;
  };

  const getImageTypeCard = (brand: string): ImageSourcePropType => {
    return cardType[brand];
  };

  const getCardStyle = (brand: string): StyleSheet => {
    return cardStyle[brand];
  };

  const getSize = (): number => {
    return Platform.OS === "android" ? 24 : isIphoneX() ? 23 : 28.5;
  };

  const getCardExp = (item: Card): string => {
    return item.exp_month + "/" + item.exp_year;
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        height: (Dimensions.get("window").height * getSize()) / 100,
      }}
      source={require("assets/images/creditCard.png")}
    >
      <View style={styles.header}>
        <View>
          <Image
            resizeMode="contain"
            source={getImageTypeCard(card.brand)}
            style={getCardStyle(card.brand)}
          />
          <Text style={styles.number}>{setCardNumber(card.number)}</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.nameText}>Card Holder Name</Text>
            <Text style={styles.contentText}>{card.fullName}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>Expiry Date</Text>
            <Text style={styles.contentText}>{getCardExp(card)}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contentText: {
    marginTop: (Dimensions.get("window").height * 0.54) / 100,
    color: "white",
    fontFamily: "NunitoSans-SemiBold",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
  },
  nameText: {
    color: "white",
    fontSize: (Dimensions.get("window").height * 1.477) / 100,
    fontFamily: "NunitoSans-SemiBold",
  },
  header: {
    marginLeft: (Dimensions.get("window").height * 5.66) / 100,
    marginTop: (Dimensions.get("window").height * 2.46) / 100,
    marginRight: (Dimensions.get("window").height * 4.92) / 100,
  },
  number: {
    color: "white",
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.5) / 100,
    lineHeight: 27,
    letterSpacing: 3,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (Dimensions.get("window").height * 3.44) / 100,
  },
});

export default PaymentCard;