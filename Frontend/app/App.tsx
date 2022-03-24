import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import makePrediction from './tf/process-image';
import * as tf from '@tensorflow/tfjs';
import TensorCameraComponent from './components/tensor-camera.component';
import { useState } from 'react';
import { Camera } from 'expo-camera';
import labels from './tf/labels';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#efefef',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    cameraView: {
        height: '80%',
        width: '100%',
        margin: 10,
    },
    boxEmotion: {
        width: '90%',
        position: 'relative',
        top: -40,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
    },
    boxEmotionText: {
        padding: 20,
        color: 'black',
    },
});

export default function App() {
    const [emotion, setEmotion] = useState('No emotion detected');

    const updateEmotion = (val: number) => {
        console.log(`Predicted emotion: ${labels.emotions[val]}`);
        setEmotion(`${labels.emotions[val]}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return (
        <View style={styles.container}>
            <View style={styles.cameraView}>
                <TensorCameraComponent updateEmotion={updateEmotion}></TensorCameraComponent>
            </View>
            <View style={styles.boxEmotion}>
                <Text style={styles.boxEmotionText}>{emotion}</Text>
            </View>
        </View>
    );
}
