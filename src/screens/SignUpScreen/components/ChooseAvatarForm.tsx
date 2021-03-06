import React, { useState, useCallback, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ActionSheet } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { styles, width, height } from "../SignUpStyles";
import * as ImagePicker from "expo-image-picker";

interface Props {
  onSubmitAva: (photo: any) => {};
}

const ChooseAvatarForm = (props: Props) => {
  const { onSubmitAva } = props;
  const [photo, setPhoto] = useState("");
  const [showActionSheet, setShowActionSheet] = useState(false);
  const navigation = useNavigation();

  // const showActionSheet = () => {
  //   showActionSheetWithOptions(
  //     {
  //       options,
  //       cancelButtonIndex,
  //       destructiveButtonIndex,
  //     },
  //     (buttonIndex) => {
  //       if (buttonIndex === 1) {
  //         navigation.navigate("CameraScreen", {
  //           getImageFromCamera: getImageFromCamera,
  //         });
  //       } else if (buttonIndex === 0) {
  //         pickImage();
  //       }
  //     }
  //   );
  // };

  const setImage = (): any => {
    return photo ? { uri: photo.uri } : require("assets/images/avatar.png");
  };

  const getImageFromCamera = async (data: any) => {
    const seperatedUri = data.uri.split("/");
    const imageName = seperatedUri[seperatedUri.length - 1];
    const photo = {
      uri: data.uri,
      type: "image/jpg",
      name: imageName,
    };
    console.log(photo);
    setPhoto(photo);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const seperatedUri = result.uri.split("/");
    const imageName = seperatedUri[seperatedUri.length - 1];
    const photo = {
      uri: result.uri,
      type: "image/jpg",
      name: imageName,
    };
    setPhoto(photo);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        marginTop: (height * 9.85) / 100,
        paddingHorizontal: (width * 5.33) / 100,
        width: width,
      }}
    >
      <ActionSheet
        cancelButtonIndex={2}
        useNativeIOS={true}
        options={[
          {
            label: "Take a picture",
            onPress: () => {
              navigation.navigate("CameraScreen", {
                getImageFromCamera: getImageFromCamera,
              });
            },
          },
          { label: "Choose from gallery", onPress: () => pickImage() },
          {
            label: "cancel",
            onPress: () => setShowActionSheet(!showActionSheet),
          },
        ]}
        visible={showActionSheet}
        onDismiss={() => setShowActionSheet(false)}
      />
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text
          style={{
            fontFamily: "Gelasio-SemiBold",
            fontSize: 43,
            color: "#303030",
            letterSpacing: 2,
            marginBottom: (height * 4.92) / 100,
          }}
        >
          Step 3
        </Text>
        <TouchableOpacity
          style={{ borderWidth: 2, borderRadius: 200 }}
          onPress={() => {
            setShowActionSheet(!showActionSheet);
          }}
        >
          <Image
            resizeMode="cover"
            style={{
              height: (height * 26.1) / 100,
              width: (height * 26.1) / 100,
              borderRadius: 200,
            }}
            source={setImage()}
          />
          <View
            style={{
              borderWidth: 2,
              borderRadius: 200,
              aspectRatio: 1,
              padding: 5,
              position: "absolute",
              backgroundColor: "white",
              top: (height * 26.1) / 100 - (height * 2) / 100,
              left: (height * 26.1) / 100 - (height * 14.6) / 100,
            }}
          >
            <Image
              style={{
                height: (height * 2.46) / 100,
                width: (height * 2.46) / 100,
              }}
              resizeMode={"contain"}
              source={require("assets/images/cameraIcon.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "NunitoSans-Regular",
            fontSize: 18,
            marginVertical: (6.4 * height) / 100,
            width: (75.46 * width) / 100,
            textAlign: "center",
            letterSpacing: 1,
            color: "#606060",
          }}
        >
          Pick an image from your gallery or take a picture to be an avatar
        </Text>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={() => {
              onSubmitAva(photo);
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              onSubmitAva(null);
            }}
          >
            <Text style={[styles.buttonText, { color: "#303030" }]}>
              I'll do it later
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseAvatarForm;
