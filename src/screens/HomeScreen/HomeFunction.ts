import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function useRefreshing() {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return { refreshing, onRefresh };
}
