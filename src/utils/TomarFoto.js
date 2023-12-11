import * as Imagepicker from "expo-image-picker";
import * as tf from "@tensorflow/tfjs";

export const pickImage = async (setImage) => {
  let result = await Imagepicker.launchImageLibraryAsync({
    mediaTypes: Imagepicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  });

  if (!result.canceled) {
    /* dejamos la imagen en la app para que se renderice */
    const selectedImage = result.assets[0];
    setImage(selectedImage.uri);
    /* const neuralNetworkResult = 'ciruela'
            setRedNeuralResultado(neuralNetworkResult)
            onResult(neuralNetworkResult) */
  }
};

export const tomarFoto = async (setImage) => {
  let result = await Imagepicker.launchCameraAsync({
    mediaTypes: Imagepicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    const selectedImage = result.assets[0];
    setImage(selectedImage.uri);
  }
};
