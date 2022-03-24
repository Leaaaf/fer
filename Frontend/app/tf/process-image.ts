import * as tf from '@tensorflow/tfjs';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import { Tensor } from '@tensorflow/tfjs';

const imageToTensor = (rawImageData: any) => {
    // const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(48 * 48 * 1);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];

        offset += 4;
    }

    return tf.tensor3d(buffer, [48, 48, 1]);
};

const processImage = (imageTensor: Tensor): Tensor => {
    imageTensor = imageTensor.slice([0, 0, 0], [48, 48, 1]);
    imageTensor = imageTensor.expandDims(0);
    return imageTensor;
};

export default processImage;
