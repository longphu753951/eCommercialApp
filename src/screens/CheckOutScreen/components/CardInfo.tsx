import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ImageSourcePropType,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Card } from "components";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CardInfo = (props) => {
  const { child, title, screen, onChooseEdit } = props;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: (3.69 * height) / 100,
        }}
      >
        <Text
          style={{
            fontFamily: "NunitoSans-Regular",
            fontSize: (height * 2.21) / 100,
            color: "#909090",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={() => onChooseEdit()}>
          <Feather
            name="edit-3"
            size={(Dimensions.get("window").height * 2.95) / 100}
            color="#808080"
          />
        </TouchableOpacity>
      </View>
      <Card
        cardStyle={{
          marginTop: (1.23 * height) / 100,
        }}
      >
        {child}
      </Card>
    </View>
  );
};


export default CardInfo;
