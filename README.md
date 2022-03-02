# Face Emotions Recognition
The project target is to create a ML Model that can classify a facial emotion on a subject. The client of the application is a mobile phone.
We used the FER2013 dataset (https://www.kaggle.com/msambare/fer2013) to train and test the model that is exported in a format compatible with TensorflowLite on Mobile phones.<br/><br/>
In real-time the application recognises the emotion and prints the result in a label on the screen. There are 7 target results : Angry - Disgust - Fear - Happy - Sad - Surprise - Neutral.<br/><br/>
The accuracy of the model is not really high, that depends on the difficulty of the classification, faces have different shapes and points of interest, it’s not very easy to predict an emotion.
## Info
This project uses react-native and expo. For info:
- https://reactnative.dev/
- https://expo.dev/

## Setup
```
    npm install
    npm run start
```

## Model export
We recommend to use Google Colab to execute the .ipynb file
```
!pip install tensorflowjs
import tensorflowjs as tfjs

## This will save model and weights on the folder called /models
tfjs.converters.save_keras_model(model, 'models')
```

## Run on mobile device
Download the *Expo GO* application from AppStore/Google Play Store and then start the progect with the command below. Once the project is started you can open the camera of your phone and point to the QR Code.

## Full model documentation
[Link to document](https://github.com/Leaaaf/fer/blob/main/assets/FER%20-%20Sistemi%20Digitali%20M.pdf)
