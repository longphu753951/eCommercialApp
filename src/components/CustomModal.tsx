import React from "react";
import { Animated, Modal, TouchableOpacity, View, Text } from "react-native";

interface Props {
  onClose(): void;
  visible: boolean;
  children: JSX.Element|JSX.Element[];
}

const CustomModal: React.FC<Props> = (props: Props) => {
  const { onClose, visible, children } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => console.log('abc')}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.68)",
          flexDirection: "column-reverse",
        }}
      >
        <Animated.View
          style={{
            width: "100%",
            height: "50%",
            bottom: 0,
            backgroundColor: "white",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
              padding: 15,
              flexDirection: "row-reverse",
              borderBottomWidth: 0.2,
            }}
          >
            <TouchableOpacity onPress={() => onClose()}>
              <Text style={{ fontSize: 20 }}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

CustomModal.defaultProps = {
  onClose: () => {},
  visible: false,
  children: <></>,
};

export default CustomModal;