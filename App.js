import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MyStack from "./src/navigation/MyStack";
import Home from "./src/screens/Home";
import PlantProvider from "./src/context/Context";

export default function App() {
  return (
    <PlantProvider>
      <MyStack />
    </PlantProvider>
  );
}
