import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import user from "reducers/user";
import { styles, width, height } from "./styles";
import CardInfo from "./CardInfo";
import { checkOutInfo, deliveryBrand } from "config/mockData";
import PickShippingTypeModal from "./PickShippingTypeModal";
import axios from "axios";

const ShippingUnitCard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <PickShippingTypeModal
        isOpen={isOpenModal}
        onClose={(): void => {
          setIsOpenModal(!isOpenModal);
        }}
      />
      <CardInfo
        title="Shipping Unit"
        onChooseEdit={() => setIsOpenModal(true)}
        child={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: (1.847 * height) / 100,
            }}
          >
            <View style={styles.deliveryBrandImageContainer}>
              <Image
                resizeMode="contain"
                style={{
                  width: (20 * width) / 100,
                  height: (2.46 * height) / 100,
                }}
                source={deliveryBrand[checkOutInfo[2].name]}
              />
            </View>
            <Text
              style={{
                fontSize: (1.72 * height) / 100,
                fontFamily: "NunitoSans-Regular",
              }}
            >
              {checkOutInfo[2].type}
            </Text>
          </View>
        }
      />
    </>
  );
};

export default ShippingUnitCard;
