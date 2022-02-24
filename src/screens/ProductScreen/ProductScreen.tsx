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
            showPageIndicator ={true}
          >
            <View key="1">
              <Text>First page</Text>
            </View>
            <View key="2">
              <Text>Second page</Text>
            </View>
          </PagerView>
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
