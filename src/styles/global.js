import { StyleSheet } from "react-native";
import Colors from "./colors";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.ligth,
  },
  screenContainerPlant: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.ligth,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.secundario,
  },
  button: {
    width: "90%",
    height: 45,
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.ligth,
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginVertical: 20, // Espacio vertical alrededor de la imagen
    justifyContent: "center",
  },
  predictionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "justify",
  },
  image: {
    width: 150,
    height: 200,
    marginVertical: 10,
  },
});
