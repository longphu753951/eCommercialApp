import React from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { Card } from "components";
import { styles } from "./styles";



interface Props {
  data: Array<any>;
  type: String;
}

const TabScreen: React.FC<Props> = (props: Props) => {
  const { data, type } = props;
  const colorType = {
    "Ordered": "#AEA127",
    "Delivering": "#27AE60",
    "Received": "#27AE60",
  };

  
  const orderCard = (item: any) => {
    const orderSummany = item.item
    const getDate = (): String => {
      const date = new Date(orderSummany.ordered_date);
      const day =  date.getDate();
      const month = date.getMonth()+1;
      const year = date.getFullYear()
      return day+ "/"+ month + "/" +year;
    }
    return (
      <Card
        cardStyle={{
          marginTop: 25,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
            paddingTop: (Dimensions.get("window").height * 1.85) / 100,
            paddingBottom: (Dimensions.get("window").height * 1.23) / 100,
            borderBottomWidth: 2,
            borderBottomColor: "#F0F0F0",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>Order no.{orderSummany.id}</Text>
          <Text>{getDate()}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
            paddingTop: (Dimensions.get("window").height * 1.23) / 100,
            paddingBottom: (Dimensions.get("window").height * 1.85) / 100,

            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { color: "#909090" }]}>Quantity: </Text>
            <Text style={styles.text}>03</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { color: "#909090" }]}>
              Total Price:{" "}
            </Text>
            <Text style={styles.text}>{orderSummany.payment.amount.toFixed(2)}$</Text>
          </View>
        </View>
        <View
          style={{
            paddingRight: (Dimensions.get("window").height * 2.46) / 100,
            paddingTop: (Dimensions.get("window").height * 1.23) / 100,
            paddingBottom: (Dimensions.get("window").height * 1.85) / 100,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#303030",
              paddingVertical: 7,
              paddingHorizontal: 29,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            <Text style={[{ color: "white" }, styles.text]}>Detail</Text>
          </TouchableOpacity>
          <Text style={[styles.text, { color: colorType[type] }]}>{type}</Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.index}
        renderItem={(item) => orderCard(item)}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default TabScreen;
