import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { FCKeyBoardAvoidingView } from "components";
import { styles, width, height } from "./SignUpStyles";
import { TypeInformationForm, TypeOTPForm, TypePasswordForm } from "./components";

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [screenIndex, setScreenIndex] = useState(0);
  const loading = useSelector((state) => state.auth.loading);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const onChangeScreen = (number: number) => {
    const index = screenIndex + number;
    scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    setScreenIndex(index);
  };

  return (
    <FCKeyBoardAvoidingView loading={loading} style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        bounces={false}
        scrollEnabled={false}
        pagingEnabled={true}
        style={{flex:1}}
        showsHorizontalScrollIndicator={false}
      >
        <TypeInformationForm submit={() => onChangeScreen(1)} />
        <TypePasswordForm
          submit={() => onChangeScreen(1)}
          goBack={() => onChangeScreen(-1)}
        />
        <TypeOTPForm
          submit={() => onChangeScreen(1)}
          goBack={() => onChangeScreen(-1)}
        />
      </ScrollView>
    </FCKeyBoardAvoidingView>
  );
};
