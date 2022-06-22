import React from "react";
import { Controller } from "react-hook-form";
import {
  Animated,
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { height } from "screens/SignUpScreen/SignUpStyles";

interface Props {
  style: any;
}

const DropdownCustom: React.FC<Props> = (props: Props) => {
  const { style } = props;
  return (
    <Controller
      control={control}
      render={({ field: { onChange } }) => (
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, style]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={provinces}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!listIsFocus[0] ? "Select City" : "..."}
            searchPlaceholder="Search..."
            value={provinceCode}
            onFocus={() => setFocus(0)}
            onBlur={() => setFocus(0)}
            onChange={(item) => {
              setProvinceCode(item.value);
              setFocus(0);
            }}
          />
        </View>
      )}
      name={name}
      rules={rules}
    />
  );
};

DropdownCustom.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
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
export default DropdownCustom;
