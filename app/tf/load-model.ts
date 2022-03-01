const modelJson = require('./model.json');
const modelWeights1 = require('./group1-shard1of2.bin');
const modelWeights2 = require('./group1-shard2of2.bin');
import * as tf from '@tensorflow/tfjs';
import { LayersModel } from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const loadModel = async (): Promise<LayersModel> => {
    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, [modelWeights1, modelWeights2]));
    return model;
};

export default loadModel;
