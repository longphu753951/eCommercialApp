import React, { useState, useCallback } from "react";
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
} from "react-native";
import { profileCategoryList } from "config/mockData";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";

export const ProductScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "flex-end" }}>
          <PagerView
            style={{
              width: (Dimensions.get("window").width * 86.13) / 100,
              height: (Dimensions.get("window").height * 56.03) / 100,
              backgroundColor: "red",
            }}
            initialPage={0}
            showPageIndicator={true}
          >
            <View key="1">
              <Text>First page</Text>
            </View>
            <View key="2">
              <Text>Second page</Text>
            </View>
          </PagerView>
          <View
            style={{
              backgroundColor: "green",
              position: "absolute",
              left: (Dimensions.get("window").width * 5.33) / 100,
              top: (Dimensions.get("window").height * 7.26) / 100,
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: (Dimensions.get("window").height * 6.157) / 100,
                height: (Dimensions.get("window").height * 6.157) / 100,
                backgroundColor: 'yellow'
              }}
            ></View>
            <View
              style={{
                backgroundColor: 'blue',
                marginTop: (Dimensions.get("window").height * 4.92) / 100,
                width: (Dimensions.get("window").height * 7.88) / 100,
                height: (Dimensions.get("window").height * 23.64) / 100,
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
});
