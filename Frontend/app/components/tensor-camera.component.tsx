import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import React, { useState } from 'react';
import { Platform, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useEffect } from 'react';
import makePrediction from '../tf/process-image';
import * as tf from '@tensorflow/tfjs';
import loadModel from '../tf/load-model';
import { LayersModel, Tensor, Tensor3D } from '@tensorflow/tfjs';
import processImage from '../tf/process-image';
import { delay } from './utility-time';

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cameraTensor: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        borderWidth: 0,
        borderRadius: 0,
    },
});

const TensorCamera = cameraWithTensors(Camera);

const TensorCameraComponent = ({ updateEmotion }: any) => {
    const [isTFReady, setTFReady] = useState(false);
    const [model, setModel] = useState<LayersModel>();

    useEffect(() => {
        if (!isTFReady) {
            (async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                console.log(`permissions status: ${status}`);
                if (status === 'granted') {
                    console.log('TF ready, loading model...');
                    await tf.ready();
                    const model = await loadModel();
                    console.log('Model loaded');
                    setModel(model);
                    setTFReady(true);
                }
            })();
        }
    }, []);

    const handleCameraStream = (imageAsTensors: IterableIterator<Tensor>) => {
        // If the model is not setted up or TF is not ready, return
        if (!model) return;

        const loop = async () => {
            const nextImageTensor = await imageAsTensors.next().value;
            if (model) {
                const processedTensor = processImage(nextImageTensor);
                const prediction: Tensor | Tensor[] = await model.predict(processedTensor);
                let predictedValue;
                if (prediction instanceof Tensor) predictedValue = await prediction.argMax(1).data();
                else {
                    predictedValue = await prediction[0].argMax(1).data();
                }

                console.log(`Predicted result: ${predictedValue}`);
                updateEmotion(predictedValue);
            }
            await delay(500);
            requestAnimationFrame(loop);
        };
        loop();
    };

    const textureDims = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };
    const tensorDims = { width: 48, height: 48 };

    const renderCameraView = () => {
        if (isTFReady)
            return (
                <View style={styles.camera}>
                    <TensorCamera
                        style={styles.cameraTensor}
                        type={Camera.Constants.Type.front}
                        zoom={0}
                        useCustomShadersToResize={true}
                        autoFocus={true}
                        cameraTextureHeight={textureDims.height}
                        cameraTextureWidth={textureDims.width}
                        resizeHeight={tensorDims.height}
                        resizeWidth={tensorDims.width}
                        resizeDepth={3}
                        onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
                        autorender={true}
                    />
                </View>
            );
        else
            return (
                <View style={styles.camera}>
                    <Text>Loading Tensorflow...</Text>
                </View>
            );
    };

    return renderCameraView();
};

export default TensorCameraComponent;
