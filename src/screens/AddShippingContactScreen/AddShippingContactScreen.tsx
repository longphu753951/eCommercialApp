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
} from "components/";
import { useForm } from "react-hook-form";
import { nameRule, rules, telephoneRule } from "services/inputRuleService";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch } from "react-redux";
import axios from "axios";

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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      telephone: "",
      ward: "",
      province: "",
      district: "",
    },
  });
  const [listIsFocus, setListIsFocus] = useState([false, false, false]);
  const [provinces, setProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState(-1);
  const [districtCode, setDistrictCode] = useState(-1);
  const [wardCode, setWardCode] = useState(-1);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
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
  }, [provinceCode]);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
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
  }, [districtCode]);

  const setFocus = (position: number) => {
    const newListSetFocus = _.cloneDeep(listIsFocus);
    newListSetFocus[position] = !newListSetFocus[position];
    setListIsFocus(newListSetFocus);
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
            name={"fullName"}
            rules={nameRule}
            error={errors.fullName}
          />
          <TextField
            textInputStyle={{ width: "100%" }}
            control={control}
            label={"Telephone"}
            name={"telephone"}
            keyboardType={"phone-pad"}
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
            rules={nameRule}
            error={errors.fullName}
          />
          
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={[
                styles.dropdown,
                listIsFocus[1] && styles.selectedDropdown,
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={districts}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!listIsFocus[1] ? "Select District" : "..."}
              searchPlaceholder="Search..."
              value={districtCode}
              onFocus={() => setFocus(1)}
              onBlur={() => setFocus(1)}
              onChange={(item) => {
                setDistrictCode(item.value);
                setFocus(1);
              }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={[
                styles.dropdown,
                listIsFocus[2] && styles.selectedDropdown,
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              dropdownPosition={'top'}
              iconStyle={styles.iconStyle}
              data={wards}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!listIsFocus[2] ? "Select Ward" : "..."}
              searchPlaceholder="Search..."
              value={wardCode}
              onFocus={() => setFocus(2)}
              onBlur={() => setFocus(2)}
              onChange={(item) => {
                setWardCode(item.value);
                setFocus(2);
              }}
            />
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
              onPress={() => console.log("abc")}
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
});
