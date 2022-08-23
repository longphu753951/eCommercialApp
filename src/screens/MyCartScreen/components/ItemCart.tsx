import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantityRoutine, deleteToCartRoutine } from "reducers/cart";
import { CartItem, IncrementButton } from "components";
import { View, Text } from "react-native";
import { width, height, styles } from "./styles";

interface Props {
  item: any;
}

const ItemCart = (props: Props): JSX.Element => {
  const { item } = props;
  const [quantity, setQuantity] = useState(item.item.quantity);
  const dispatch = useDispatch();

  const onSendChangeQuantity = useCallback((value) => {
    dispatch({
      type: updateQuantityRoutine.TRIGGER,
      data: { id: item.item.id, quantity: value },
    });
  }, [quantity]);
  const onChangeQuantity = async (value) => {
    setQuantity(value);
    onSendChangeQuantity(value);
  };

  return (
    <CartItem
      onRemoving={async () => {
        await dispatch({
          type: deleteToCartRoutine.TRIGGER,
          data: { id: item.item.id },
        });
      }}
      image={{ uri: item.item.product_attribute.productImage[0].image }}
      content={
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.nameText}>
            {item.item.product_attribute.name}
          </Text>
        </View>
      }
      bottomContent={
        <View style={styles.bottomCotainer}>
          <IncrementButton
            defaultCount={item.item.quantity}
            onChangeValue={(value) => onChangeQuantity(value)}
          />
          <Text style={styles.totalPriceItemText}>
            $ {Number(item.item.final_price).toFixed(2)}
          </Text>
        </View>
      }
    />
  );
};

export default ItemCart;