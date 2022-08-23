import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { itemList } from "config/mockData";
import _ from "lodash";
import { CartItem, Header } from "components";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookmark, getBookmark } from "reducers/user";
import axios from "axios";
import { Card } from "components/";
import { faAngleRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { setShippingTypeRoutine } from "reducers/cart";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const ShippingUnitScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [choosenShippingType, setChoosenShippingType] = useState({});
  const [loading, setLoading] = useState(false);
  const [choosenShippingUnit, setChoosenShippingUnit] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [shippingUnitList, setShippingUnitList] = useState([]);
  const [shippingTypeList, setShippingTypeList] = useState([]);
  const onChangeScreen = (number: number) => {
    const index = screenIndex + number;
    scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    setScreenIndex(index);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.1.13:8000/shippingUnit/")
      .then((response) => {
        setShippingUnitList(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (choosenShippingUnit != 0) {
      axios
        .get(
          `http://192.168.1.13:8000/shippingType/getShippingType/${choosenShippingUnit}/`
        )
        .then((response) => {
          setShippingTypeList(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [choosenShippingUnit]);

  const shippingUnit = (item: any): JSX.Element => {
    const setShippingUnit = () => {
      setChoosenShippingUnit(shippingUnit.id);
      onChangeScreen(1);
    };
    const shippingUnit = item.item;
    return (
      <Card
        cardStyle={styles.card}
        isButton={true}
        onPress={() => setShippingUnit()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: (20 * width) / 100,
              height: (2.46 * height) / 100,
            }}
            resizeMode="contain"
            source={{ uri: shippingUnit.image }}
          />
          <Text
            style={{
              fontFamily: "NunitoSans-Bold",
              marginLeft: (width * 3) / 100,
            }}
          >
            {shippingUnit.name}
          </Text>
        </View>
        <FontAwesomeIcon
          size={(Dimensions.get("window").height * 2) / 100}
          icon={faAngleRight}
          color={"#909090"}
        />
      </Card>
    );
  };

  const ChooseShippingUnit = () => {
    return (
      <View style={{ width: width, alignSelf: "center" }}>
        <FlatList
          contentContainerStyle={{ width: width }}
          showsVerticalScrollIndicator={false}
          data={shippingUnitList}
          keyExtractor={(item) => item.id}
          renderItem={shippingUnit}
        />
      </View>
    );
  };

  const shippingType = (item: any): JSX.Element => {
    const shippingType = item.item;
    return (
      <Card
        cardStyle={styles.card}
        isButton={true}
        onPress={() => setChoosenShippingType(shippingType)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: (20 * width) / 100,
              height: (2.46 * height) / 100,
            }}
            resizeMode="contain"
            source={{ uri: shippingType.image }}
          />
          <Text
            style={{
              fontFamily: "NunitoSans-Bold",
              marginLeft: (width * 3) / 100,
            }}
          >
            {`${shippingType.type} (${shippingType.min_date} - ${shippingType.max_date} days)`}
          </Text>
        </View>
        <FontAwesomeIcon
          size={(Dimensions.get("window").height * 2) / 100}
          icon={
            choosenShippingType.id == shippingType.id ? faCircleCheck : faCircle
          }
          color={"#909090"}
        />
      </Card>
    );
  };

  const ChooseShippingType = () => {
    const setShippingType = async () => {
      await dispatch({
        type: setShippingTypeRoutine.TRIGGER,
        data: { shippingType: choosenShippingType },
      });
      navigation.goBack();
    };

    return (
      <View style={{ width: width }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shippingTypeList}
          keyExtractor={(item) => item.id}
          renderItem={shippingType}
        />
        <TouchableOpacity
          style={[styles.checkOutButton, styles.backToHomeButton]}
          onPress={() => onChangeScreen(-1)}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: "#212121",
              },
            ]}
          >
            Go back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.checkOutButton,
            { opacity: _.isEmpty(choosenShippingType) ? 0.5 : 1 },
          ]}
          onPress={() => setShippingType()}
        >
          <Text style={styles.addAllText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"SHIPPING UNIT"} isBackButton={true} />
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1,
              alignContent: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <ActivityIndicator size={"large"} color={"gray"} />
          </View>
        )}
        <View style={styles.bodyContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            bounces={false}
            scrollEnabled={false}
            pagingEnabled={true}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
          >
            <ChooseShippingUnit />
            <ChooseShippingType />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  card: {
    alignSelf: "flex-start",
    width: (width * 88) / 100,
    paddingVertical: (Dimensions.get("window").height * 2.21) / 100,
    paddingHorizontal: (Dimensions.get("window").height * 3) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: (Dimensions.get("window").height * 1.85) / 100,
  },
  checkOutButton: {
    width: (Dimensions.get("window").width * 89.06) / 100,
    height: (Dimensions.get("window").height * 5) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: (1.8 * height) / 100,
  },
  addAllText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    color: "white",
  },

  backToHomeButton: {
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#212121",
  },
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
});
