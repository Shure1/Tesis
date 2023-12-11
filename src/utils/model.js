import * as tf from "@tensorflow/tfjs";
import { fetch, decode, bundleResourceIO } from "@tensorflow/tfjs-react-native";

const loadModel = async () => {
  const modelurl = require("../ModeloRaiz/model.json");

  const modelpeso1 = require("./group1-shard1of2.bin");
  const modelpeso2 = require("./group1-shard2of2.bin");
  try {
    await tf.ready();
    const modelWeights = new Uint8Array([...modelpeso1, ...modelpeso2]);

    const model = await tf.loadLayersModel(
      bundleResourceIO(modelurl, modelWeights)
    );
    console.log("modelo cargado");
    console.log(model.summary());
    return model;
  } catch (error) {
    console.log("error en cargar el modelo");
    throw error;
  }
};

export default loadModel;
