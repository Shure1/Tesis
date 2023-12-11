import { useState, createContext, useEffect } from "react";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import { initBDD, resetBDD } from "../utils/bdd";
import PlantDiseaseClassifier from "../controllers/prediction";

export const PlantContext = createContext();
export const PlantProvider = ({ children }) => {
  const [prediction, setPrediction] = useState("");
  const [predictionEnfermedad, setPredictionEnfermedad] = useState("");
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const [classifier, setClassifier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initBDD();
    const classifierModel = new PlantDiseaseClassifier();
    classifierModel.loadPlantModel();
    setClassifier(classifierModel);
    /* resetBDD(); */
  }, []);

  return (
    <PlantContext.Provider
      value={{ image, setImage, prediction, setPrediction, model, classifier }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export default PlantProvider;
