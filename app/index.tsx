import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Feedback from "./Feedback";

export default function index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Feedback />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
