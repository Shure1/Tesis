import React from "react";
import { Text, View, Image } from "react-native";
import { globalStyles } from "../styles/global";

const PlantInfoComponent = ({ infoPlant, plantImageMap, prediction }) => {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 30 }}>
      <Text style={globalStyles.title}>Info de la planta {prediction}</Text>
      {/* Sección de información de la planta */}
      <Text style={globalStyles.subtitle}>Nombre: {infoPlant.nombre}</Text>
      <Text style={globalStyles.subtitle}>
        Nombre Científico: {infoPlant.nombre_cientifico}
      </Text>

      <Image
        source={plantImageMap[infoPlant.nombre]}
        style={{
          height: 200,
          width: 200,
          alignSelf: "center",
        }}
      />

      <Text style={globalStyles.text}>
        Descripción de la planta: {infoPlant.descripcion}
      </Text>
      <Text style={globalStyles.text}>
        Recomendaciones: {infoPlant.recomendaciones}
      </Text>

      {/* Sección de información de la enfermedad */}
      <Text style={globalStyles.sectionTitle}>
        Enfermedad: {infoPlant.enfermedad_nombre}
      </Text>
      <Text style={globalStyles.text}>
        Descripción: {infoPlant.enfermedad_descripcion}
      </Text>
      <Text style={globalStyles.text}>
        Síntomas: {infoPlant.enfermedad_sintomas}
      </Text>
      <Text style={globalStyles.text}>
        Causas: {infoPlant.enfermedad_causas}
      </Text>

      {/* Sección de tratamiento */}
      <Text style={globalStyles.sectionTitle}>
        Tratamiento: {infoPlant.tratamiento_nombre}
      </Text>
      <Text style={globalStyles.text}>
        Descripción del tratamiento: {infoPlant.tratamiento_descripcion}
      </Text>
      <Text style={globalStyles.text}>Protocolos: {infoPlant.protocolos}</Text>
      <Text style={globalStyles.text}>
        Precauciones: {infoPlant.precauciones}
      </Text>
    </View>
  );
};

export default PlantInfoComponent;
