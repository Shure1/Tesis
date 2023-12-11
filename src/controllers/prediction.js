import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import * as ImageManipulator from "expo-image-manipulator";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import { ModelsEnfermedades } from "../utils/routesModels";
import * as FileSystem from "expo-file-system";

class PlantDiseaseClassifier {
  constructor() {
    this.plantModel = null;
    this.modelEnfermedad = null;
    this.classNames = [
      "Apple",
      "Cherry",
      "Corn",
      "Grape",
      "Peach",
      "Pepper",
      "Potato",
      "Strawberry",
      "Tomato",
    ];
    this.enfermedades = [
      {
        Apple: ["scab", "blackrot", "cedar apple rust"],
        Cherry: ["Powdery Mildew"],
        Corn: [
          "Cercospora Leaf Spot Gray Leaf Spot",
          "Common Rust",
          "Northern Leaf Blight",
        ],
        Grape: ["Black Rot", "Black Measles", "Isariopsis Leaf Spot"],
        Peach: ["Bacterial spot"],
        Pepper: ["Bacterial spot"],
        Potato: ["Early Blight", "Late Blight"],
        Strawberry: ["leaf scorch"],
        Tomato: [
          "Bacterial spot",
          "Early blight",
          "Late blight",
          "Leaf Mold",
          "Septoria leaf spot",
          "Two-spotted spider mite",
          "Target Spot",
          "Mosaic virus",
          "Yellow Leaf Curl Virus",
        ],
      },
    ];
  }

  async loadPlantModel() {
    const modelJson = require("../context/model_ia/model_bueno.json");
    const modelWeights = require("../context/model_ia/archivo_bueno.bin");
    /* const modelJson = require("../context/model_ia/Modelos_Enfermedades/PROBANDO.json");
    const modelWeights = require("../context/model_ia/Modelos_Enfermedades/Apple.bin"); */

    try {
      await tf.ready();
      this.plantModel = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
      );
      console.log("Modelo de plantas cargado");
    } catch (error) {
      console.error("Error en cargar el modelo de plantas", error);
    }
  }

  async loadDiseaseModel(predictedClass) {
    console.log("Predicted Class:", predictedClass);

    const diseaseModelJson = ModelsEnfermedades[predictedClass].json;
    const diseaseModelWeights = ModelsEnfermedades[predictedClass].bin;

    try {
      if (!diseaseModelJson || !diseaseModelWeights) {
        throw new Error(`Model files not found for ${predictedClass}`);
      }

      await tf.ready();
      this.modelEnfermedad = await tf.loadGraphModel(
        bundleResourceIO(diseaseModelJson, diseaseModelWeights)
      );

      console.log(`modelo de enfermedades de  ${predictedClass} cargado`);
    } catch (error) {
      console.error(
        `error en cargar el modelo de enfermedades de ${predictedClass}`,
        error
      );
    }
  }

  async resizePhoto(uri, size) {
    const actions = [{ resize: { width: size[0], height: size[1] } }];
    const saveOptions = {
      base64: true,
      format: ImageManipulator.SaveFormat.JPEG,
    };
    const result = await ImageManipulator.manipulateAsync(
      uri,
      actions,
      saveOptions
    );
    return result.uri;
  }

  async processImage(image, setPrediction) {
    try {
      if (!this.plantModel) {
        console.error("Model not loaded desde processImage");
        return;
      }

      const resizedUri = await this.resizePhoto(image, [128, 128]);

      const imgB64 = await FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const raw = new Uint8Array(imgBuffer);
      const imgTensor = decodeJpeg(raw);
      /* const imgTensor = tf.tensor3d(raw, [128, 128, 3], "float32").div(255.0); */
      const normalizedTensor = imgTensor.toFloat().div(tf.scalar(255));

      const processedTensor = tf.image.resizeBilinear(
        normalizedTensor,
        [128, 128]
      );
      const expandedTensor = tf.expandDims(processedTensor, 0);
      console.log(expandedTensor);
      const prediction = await this.plantModel.predict(expandedTensor);
      const resultArray = await prediction.array();

      const predictedClassIndex = tf.argMax(resultArray[0]).dataSync()[0];
      const predictedClass = this.classNames[predictedClassIndex];
      /* const predictedClass = this.enfermedades[0].Apple[predictedClassIndex]; */
      const confidence = resultArray[0][predictedClassIndex];
      setPrediction(predictedClass);

      console.log(
        `la clase predicha es ${predictedClass}, con una confianza de ${confidence}`
      );

      // Carga y predicción del modelo de enfermedad correspondiente

      await this.loadDiseaseModel(predictedClass);
      console.log(expandedTensor);

      // Predicción de la enfermedad
      const diseasePrediction = await this.modelEnfermedad.predict(
        expandedTensor
      );
      console.log(diseasePrediction);
      const diseaseResultArray = await diseasePrediction.array();
      console.log(diseaseResultArray);

      tf.dispose([
        imgTensor,
        normalizedTensor,
        processedTensor,
        expandedTensor,
        prediction,
      ]);

      /* setTimeout(() => {
        navigation.navigate("Plant");
      }, 3000); */
    } catch (error) {
      console.error("Error en la prediccion:", error);
    }
  }
}

export default PlantDiseaseClassifier;
