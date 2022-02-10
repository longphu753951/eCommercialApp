import React from 'react';
import { 
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

export const HomeScreen = () => {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: "center"}}>
            <Text>Home</Text>
        </SafeAreaView>
    )
}