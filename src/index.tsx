// src/App.tsx

import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "react-lynx"; // Or from 'expo-status-bar'

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}
