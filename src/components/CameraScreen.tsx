import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Linking,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import * as Haptics from "expo-haptics";
import { height, width } from "screens/SignUpScreen/SignUpStyles";
import ImageZoom from "react-native-image-pan-zoom";
import * as FileSystem from "expo-file-system";

export const CameraScreen = (props: any) => {
  const {navigation, route} = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [tokenCamera, setTokenCamera] = useState("");

  const _openAppSettings = async () => {
    if (Platform.OS === "ios") {
      const supported = await Linking.canOpenURL("app-settings:");
      if (supported) {
        Linking.openURL("app-settings:");
      }
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACCESSIBILITY_SETTINGS
      );
    }
  };

  const _takePhoto = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const photo = await cameraRef.current.takePictureAsync();
    setTokenCamera(photo);
  };


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <TouchableOpacity onPress={_openAppSettings}>
          <Text>No access to camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {!tokenCamera ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign
                  name="close"
                  size={(height * 3) / 100}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  size={(height * 3) / 100}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomButtonConter}>
              <TouchableOpacity style={styles.button} onPress={_takePhoto}>
                <Image
                  style={{
                    width: (height * 8) / 100,
                    height: (height * 8) / 100,
                  }}
                  resizeMode="contain"
                  source={require("assets/images/takePictureIcon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          
            <Image
              source={{ uri: tokenCamera.uri }}
              resizeMode="contain"
              style={{ flex: 1, width: "100%" }}
            />
          <View
            style={{
              alignSelf: "flex-end",
              width: "100%",
              backgroundColor: "black",
              paddingVertical: (height * 0.6) / 100,
              paddingHorizontal: (width * 5.33) / 100,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                setTokenCamera("");
              }}
            >
              <Text
                style={{
                  fontSize: (height * 2.5) / 100,
                  margin: 10,
                  color: "white",
                }}
              >
                Retake
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                
                route.params.getImageFromCamera(tokenCamera)
                navigation.goBack();
              }}
            >
              <Text
                style={{
                  fontSize: (height * 2.5) / 100,
                  margin: 10,
                  color: "white",
                }}
              >
                Choose
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 20,
  },
  bottomButtonConter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  nextButton: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
});
