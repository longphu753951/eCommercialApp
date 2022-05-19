import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import size from "config/size";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { FCKeyBoardAvoidingView, TextField } from "components";
import { loginRoutine } from "reducers/auth";
import { getCurrentUser } from "reducers/user";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      telephone: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log;
  };

  return (
    <FCKeyBoardAvoidingView loading={loading} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            resizeMode="contain"
            style={{ height: height*30.66/100 }}
            source={require("assets/images/image1.png")}
          />
        </View>
      </View>
    </FCKeyBoardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: (width * 5.33) / 100,
  },
});
