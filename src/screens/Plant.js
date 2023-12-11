import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { PlantContext } from "../context/Context";
import { globalStyles } from "../styles/global";
import { db } from "../utils/bdd";
import PlantInfoComponent from "../components/PlantInfoComponent";
import { plantImageMap } from "../utils/setImage";
import { useContext } from "react";

const Plant = () => {
  const { predictionPlant, setPredictionPlant, image, setImage } =
    useContext(PlantContext);
  const [infoPlant, setInfoPlant] = useState(null);

  const [predictionEnfermedad, setpredictionEnfermedad] = useState("scab");

  useEffect(() => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT Planta.*, 
              Enfermedades.nombre as enfermedad_nombre,
              Enfermedades.descripcion as enfermedad_descripcion,
              Enfermedades.sintomas as enfermedad_sintomas,
              Enfermedades.causas as enfermedad_causas,
              Derivados.nombre as tratamiento_nombre,
              Derivados.descripcion as tratamiento_descripcion,
              Derivados.protocolos,
              Derivados.precauciones
          FROM Planta
          LEFT JOIN Derivados ON Planta.id = Derivados.id_planta
          LEFT JOIN Enfermedades ON Derivados.id_enfermedad = Enfermedades.id
          WHERE Planta.nombre = ? AND Enfermedades.nombre = ?
          GROUP BY Planta.id`,
          ["Tomato", "Leaf Mold"],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              setInfoPlant(_array[0]);
              console.log("Información de la planta (nombre):", _array[0]);
            } else {
              console.log(
                "No se encontró información para la planta:",
                prediction
              );
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [prediction, predictionEnfermedad]);

  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainerPlant}>
      {infoPlant && (
        <PlantInfoComponent
          infoPlant={infoPlant}
          plantImageMap={plantImageMap}
          prediction={prediction}
        />
      )}
    </ScrollView>
  );
};

export default Plant;
