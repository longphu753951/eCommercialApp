import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Animated,
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { height, width } from "screens/SignUpScreen/SignUpStyles";

interface Props {
  data: any[];
  style: any;
  setFocus(): void;
  onChangeValue(value: string): void;
  placeholder: string;
  name: string;
  defaultValue: string;
  control?: Control<any>;
  error: FieldError;
  rules: any;
}

const DropdownCustom: React.FC<Props> = (props: Props) => {
  const { style, control, error, rules, name, data, placeholder, setFocus, defaultValue, onChangeValue } = props;
  const [code, setCode] = useState(defaultValue? defaultValue: '');
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
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={code}
            onFocus={() => setFocus()}
            onBlur={() => setFocus()}
            onChange={(item) => {
              setCode(item.value);
              onChange(item.label);
              onChangeValue(item.value);
              setFocus();
            }}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
      name={name}
      rules={rules}
    />
  );
};

DropdownCustom.defaultProps = {
  data: [],
  style: {},
  setFocus: () =>{},
  placeholder: '',
  onChangeValue: (value) => {},
  name: '',
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
  errorText: {
    marginTop: (height * 0.6) / 100,
    marginLeft: (width * 3) / 100,
    color: "rgba(0, 0, 0, 0.6)",
  },
});
export default DropdownCustom;
