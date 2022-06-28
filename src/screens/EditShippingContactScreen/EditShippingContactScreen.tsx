import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  FCKeyBoardAvoidingView,
  TextField,
  Header,
  DropdownCustom,
} from "components/";
import { useForm } from "react-hook-form";
import { nameRule, rules, telephoneRule } from "services/inputRuleService";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addNewAddress } from "reducers/user";
import _ from "lodash";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const EditShippingContactScreen = ({ route, navigation }) => {
  const shippingContact = route.params.shippingContact;
  const dispatch = useDispatch();
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: shippingContact.id,
      name: shippingContact.name,
      address: shippingContact.address,
      telephone: shippingContact.telephone,
      ward: shippingContact.ward,
      province: shippingContact.province,
      district: shippingContact.district,
    },
  });
  const [listIsFocus, setListIsFocus] = useState([false, false, false]);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [defaultProvince, setDefaultProvince] = useState("");
  const [defaultWard, setDefaultWard] = useState("");
  const [defaultDistrict, setDefaultDistrict] = useState("");
  const previousDefaultDistrict = useRef(defaultDistrict);
  const previousDefaultProvince = useRef(defaultProvince);

  useEffect(() => {
    onShowProvince();
  }, []);

  useEffect(() => {
    if (provinces.length !== 0) {
      let defaultProvinceCode: string = "";
      provinces
        .filter((x) => shippingContact.province === x.label)
        .map((province) => {
          defaultProvinceCode = province.value;
        });
      setDefaultProvince(defaultProvinceCode);
      onSearchDistrict(defaultProvinceCode);
      previousDefaultProvince.current = defaultProvince;
    }
  }, [provinces]);

  useEffect(() => {
    if (defaultProvince != previousDefaultProvince.current) {
      previousDefaultProvince.current = defaultProvince;
      let defaultDistrictCode: string = "";
      districts
        .filter((x) => shippingContact.district === x.label)
        .map((district) => {
          defaultDistrictCode = district.value;
        });
      onSearchWard(defaultDistrictCode);
      setDefaultDistrict(defaultDistrictCode);
      previousDefaultDistrict.current = defaultDistrict;
    }
  }, [districts]);

  useEffect(() => {
    if (defaultDistrict != previousDefaultDistrict.current) {
      previousDefaultDistrict.current = defaultDistrict;
      let defaultWardCode: string = "";
      wards
        .filter((x) => shippingContact.ward === x.label)
        .map((ward) => {
          defaultWardCode = ward.value;
        });
      setDefaultWard(defaultWardCode);
    }
  }, [wards]);

  const onShowProvince = () => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => {
        const provinceList: Array<any> = response.data.map(
          (province: { name: any; code: any }) => {
            return {
              label: province.name,
              value: province.code,
            };
          }
        );
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
          (district: { name: any; code: any }) => {
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
        const wardList: Array<any> = response.data.wards.map(
          (ward: { name: any; code: any }) => {
            return {
              label: ward.name,
              value: ward.code,
            };
          }
        );
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

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  if (defaultDistrict && defaultProvince && defaultWard) {
    return (
      <FCKeyBoardAvoidingView loading={true} style={styles.container}>
        <Header title={"EDIT SHIPPING CONTACT"} />

        <View style={styles.contentContainer}>
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
              defaultValue={defaultProvince}
              placeholder={!listIsFocus[0] ? "Select Province" : "..."}
              onFocus={() => setFocus(0)}
              data={provinces}
              onChangeValue={(item: string) => {
                reset({ ward: "", district: "" });
                onSearchDistrict(item);
              }}
              rules={nameRule}
              error={errors.province}
            />
            <DropdownCustom
              control={control}
              label={"District"}
              name={"district"}
              defaultValue={defaultDistrict}
              placeholder={!listIsFocus[1] ? "Select District" : "..."}
              onFocus={() => setFocus(1)}
              data={districts}
              onChangeValue={(item: string) => {
                reset({ ward: "" });
                onSearchWard(item);
              }}
              rules={nameRule}
              error={errors.district}
            />
            <DropdownCustom
              control={control}
              label={"Ward"}
              name={"ward"}
              defaultValue={defaultWard}
              placeholder={!listIsFocus[2] ? "Select ward" : "..."}
              onFocus={() => setFocus(2)}
              data={wards}
              rules={nameRule}
              error={errors.ward}
            />

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
                <Text style={styles.buttonText}>Edit Address</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => console.log("asdas")}
              >
                <Text style={styles.buttonText}>Delete Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </FCKeyBoardAvoidingView>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          { alignContent: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#8A959E" />
      </View>
    );
  }
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
  deleteButton: {
    marginTop: (height * 1.35) / 100,
    backgroundColor: "#d44c64",
    width: "100%",
  },
});
