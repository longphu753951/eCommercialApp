import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { productByCategoryRoutime } from "reducers/item";


export function useRefreshing() {
  const dispatch = useDispatch();
  const refreshing = useSelector((state) => state.item.loading);

  const onRefresh = (id: any) => {
    dispatch({ type: productByCategoryRoutime.TRIGGER, id: id });
  };

  return { refreshing, onRefresh };
}
