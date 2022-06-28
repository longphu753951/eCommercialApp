import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import _ from "lodash";
import {
  FCKeyBoardAvoidingView,
  TextField,
  Header,
  DropdownCustom,
} from "components/";
import { useForm } from "react-hook-form";
import { nameRule, rules, telephoneRule } from "services/inputRuleService";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addNewAddress } from "reducers/user";
import Checkbox from "expo-checkbox";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const AddShippingContactScreen = () => {
  const dispatch = useDispatch();
  const {
    setValue,
    handleSubmit,
    control,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      telephone: "",
      ward: "",
      province: "",
      district: "",
    },
  });
  const [listIsFocus, setListIsFocus] = useState([false, false, false]);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    onShowProvince();
  }, []);

  const onShowProvince = () => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => {
        const provinceList: Array<any> = response.data.map((province) => {
          return {
            label: province.name,
            value: province.code,
          };
        });
        setProvinces(provinceList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSearchDistrict = (value: string) => {
    setWards([]);
    axios
      .get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
      .then((response) => {
        const districtList: Array<any> = response.data.districts.map(
          (district) => {
            return {
              label: district.name,
              value: district.code,
            };
          }
        );
        setDistricts(districtList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSearchWard = (value: string) => {
    axios
      .get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
      .then((response) => {
        const wardList: Array<any> = response.data.wards.map((ward) => {
          return {
            label: ward.name,
            value: ward.code,
          };
        });
        setWards(wardList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setFocus = (position: number) => {
    const newListSetFocus = _.cloneDeep(listIsFocus);
    newListSetFocus[position] = !newListSetFocus[position];
    setListIsFocus(newListSetFocus);
  };

  const onSubmit = async (data) => {
    await dispatch({
      type: addNewAddress.TRIGGER,
      data: { shippingContact: data, default: defaultAddress },
    });
  };

  return (
    <FCKeyBoardAvoidingView loading={true} style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"ADD SHIPPING CONTACT"} />
        <View
          style={{
            marginTop: 26,
            flexDirection: "column",
            flex: 1,
            paddingHorizontal: (width * 5.33) / 100,
          }}
        >
          <TextField
            textInputStyle={{
              width: "100%",
              backgroundColor: "white",
              marginTop: (height * 0.5) / 100,
            }}
            control={control}
            label={"Full name"}
            name={"name"}
            rules={nameRule}
            error={errors.name}
          />
          <TextField
            textInputStyle={{
              width: "100%",
              backgroundColor: "white",
              marginTop: (height * 0.5) / 100,
            }}
            control={control}
            label={"Telephone"}
            name={"telephone"}
            keyboardType={"phone-pad"}
            rules={telephoneRule}
            error={errors.telephone}
          />
          <TextField
            textInputStyle={{
              width: "100%",
              backgroundColor: "white",
              marginTop: (height * 0.5) / 100,
            }}
            control={control}
            label={"Address"}
            name={"address"}
            rules={rules}
            error={errors.address}
          />
          <DropdownCustom
            control={control}
            label={"Province"}
            name={"province"}
            placeholder={!listIsFocus[0] ? "Select Province" : "..."}
            onFocus={() => setFocus(0)}
            data={provinces}
            onChangeValue={(item) => {
              resetField('ward');
              resetField('district');
              onSearchDistrict(item);
            }}
            rules={nameRule}
            error={errors.province}
          />
          <DropdownCustom
            control={control}
            label={"District"}
            name={"district"}
            placeholder={!listIsFocus[1] ? "Select District" : "..."}
            onFocus={() => setFocus(1)}
            data={districts}
            onChangeValue={(item) => {
              resetField('ward');
              onSearchWard(item);
            }}
            rules={nameRule}
            error={errors.district}
          />
          <DropdownCustom
            control={control}
            label={"Ward"}
            name={"ward"}
            placeholder={!listIsFocus[2] ? "Select ward" : "..."}
            onFocus={() => setFocus(2)}
            data={wards}
            rules={nameRule}
            error={errors.ward}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: (Dimensions.get("window").height * 1.85) / 100,
            }}
          >
            <Checkbox
              style={styles.checkbox}
              color={defaultAddress ? "#303030" : "#808080"}
              value={defaultAddress}
              onValueChange={() => setDefaultAddress(!defaultAddress)}
            />
            <Text style={styles.useAsAddText}>Use as the shipping address</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Add new card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FCKeyBoardAvoidingView>
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
  nameInput: { width: (width * 42.4) / 100, backgroundColor: "white" },
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    height: (height * 5.54) / 100,
    borderRadius: 4,
  },
  signInButton: {
    backgroundColor: "#212121",
    width: "100%",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  selectedDropdown: { borderColor: "#212121", borderWidth: 1.6 },
  dropdownContainer: {
    marginTop: (height * 0.5) / 100,
    marginBottom: (0.5 * height) / 100,
    height: (height * 8.86) / 100,
  },
  checkbox: {
    height: (Dimensions.get("window").height * 2.46) / 100,
    width: (Dimensions.get("window").height * 2.46) / 100,
    borderRadius: 4,
  },
  useAsAddText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    marginLeft: (Dimensions.get("window").height * 1.23) / 100,
    color: "#808080",
  },
});
