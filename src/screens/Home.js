// Home.js
import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Image, Text } from "react-native";
import { globalStyles } from "../styles/global.js";
import { Camera } from "expo-camera";
import { cameraWithTensors, decodeJpeg } from "@tensorflow/tfjs-react-native";

import * as Imagepicker from "expo-image-picker";

import MyButton from "../components/Mybutton.js";

import { PlantContext } from "../context/Context.js";
import { pickImage, tomarFoto } from "../utils/TomarFoto.js";
import { useNavigation } from "@react-navigation/native";

// Wrap Expo.Camera with cameraWithTensors
const TensorCamera = cameraWithTensors(Camera);

const Home = () => {
  const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [topPredictions, setTopPredictions] = useState([]);

  const {
    prediction,
    setPrediction,
    image,
    setImage,
    model,
    classifier,
    predictionEnfermedad,
    setPredictionEnfermedad,
  } = useContext(PlantContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await Imagepicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await Imagepicker.requestCameraPermissionsAsync();
      sethasGalleryPermission(galleryStatus.status === "granted");
      sethasCameraPermission(cameraStatus === "granted");
    })();
  }, []);

  const Procesar = async () => {
    await classifier.processImage(
      image,
      setPrediction,
      setPredictionEnfermedad,
      setTopPredictions,
      navigation
    );
  };

  return (
    <View style={globalStyles.screenContainer}>
      <MyButton onPress={() => tomarFoto(setImage)} title="Tomar foto" />
      <MyButton onPress={() => pickImage(setImage)} title="Seleccionar foto" />

      {image && <Image style={globalStyles.image} source={{ uri: image }} />}
      {prediction !== "" && (
        <Text style={globalStyles.predictionText}>
          La planta es: {prediction}
          {predictionEnfermedad === "sana"
            ? ` y la planta esta  ${predictionEnfermedad}`
            : ""}
        </Text>
      )}
      {topPredictions.map((pred, index) => (
        <Text key={index} style={globalStyles.predictionText}>
          {index + 1}. {pred.className} - {pred.percentage}%
        </Text>
      ))}
      {image && (
        <>
          <MyButton
            title="Detectar"
            onPress={() => {
              Procesar();
            }}
          />
        </>
      )}
    </View>
  );
};

export default Home;
