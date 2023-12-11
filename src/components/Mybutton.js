import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={globalStyles.button} onPress={onPress}>
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
