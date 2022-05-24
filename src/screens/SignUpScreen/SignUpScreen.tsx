import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FCKeyBoardAvoidingView, TextField } from "components";
import { styles, width, height } from "./SignUpStyles";
import TypeInformationForm from "./components/TypeInformationForm";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
      firstName: "",
      lastName: "",
      telephone: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    //<FCKeyBoardAvoidingView loading={loading} style={styles.container}>
    // <ScrollView
    //   horizontal={true}
    //   bounces={true}
    //   pagingEnabled={false}
    //   showsHorizontalScrollIndicator={false}
    //   contentContainerStyle={styles.contentContainerStyle}
    //   style={styles.contentContainer}>
    //     <TypeInformationForm/>

    //     <TypeInformationForm/>
    // </ScrollView>
    // </FCKeyBoardAvoidingView>
    <FCKeyBoardAvoidingView loading={loading} style={styles.container}>
      <ScrollView
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <TypeInformationForm />
        <TypeInformationForm />
      </ScrollView>
    </FCKeyBoardAvoidingView>
  );
};
