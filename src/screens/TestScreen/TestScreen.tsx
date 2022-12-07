import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const TestScreen = () => {
  return (
    <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
      <Text>TestScreen</Text>
      <Button title="aaaa" onPress={() => auth().signOut()} />
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
