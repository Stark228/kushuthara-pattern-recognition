import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator, Pressable, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { Base64Binary } from '../utills/utils';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const BITMAP_DIMENSION = 224;

const modelJson = require('../model/model.json');
const modelWeights = require('../model/group1-shard1of1.bin');

const RESULT_MAPPING = ['Dorji', 'Karma', 'Phyemali', 'Shinglo', 'Yunrung'];
const CONFIDENCE_THRESHOLDS = {
  Dorji: 1,
  Karma: 1,
  Phyemali: 1,
  Shinglo: 1,
  Yunrung: 1,
};
const Classify = () => {
  const cameraRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const getModel = async () => {
    try {
      await tf.ready();
      return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    } catch (error) {
      throw Error('Could not load model: ' + error);
    }
  };

  const convertBase64ToTensor = async (base64) => {
    try {
      const uIntArray = Base64Binary.decode(base64);
      const decodedImage = decodeJpeg(uIntArray);

      const resizedImage = tf.image.resizeBilinear(decodedImage, [
        BITMAP_DIMENSION,
        BITMAP_DIMENSION,
      ]);
      const reshapedImage = tf.expandDims(resizedImage, 0);

      return reshapedImage;
    } catch (error) {
      throw new Error('Could not convert base64 string to tensor: ' + error);
    }
  };

  const startPrediction = async (model, tensors) => {
    try {
      const output = await model.predict(tensors);
      return output.dataSync();
    } catch (error) {
      throw new Error('Error predicting from tensor image: ' + error);
    }
  };

  const handleImageCapture = async () => {
    if (cameraRef.current) {
      setIsProcessing(true);
      try {
        const imageData = await cameraRef.current.takePictureAsync({
          base64: true,
        });
        setIsLoading(true);
        processImagePrediction(imageData);
      } catch (error) {
        console.error('Error taking a picture:', error);
        setIsProcessing(false);
      }
    }
  };


  const processImagePrediction = async (base64Image) => {
    const model = await getModel();
    try {
      const tensor = await convertBase64ToTensor(base64Image.base64);
  
      if (!model || !tensor) {
        setIsProcessing(false);
        setIsLoading(false); // Set loading to false
        return;
      }
  
      const prediction = await startPrediction(model, tensor);
  
      console.log('Prediction:', prediction);
  
      if (prediction && prediction.length > 0) {
        const highestPredictionIndex = tf.argMax(prediction).dataSync()[0];
  
        console.log('Highest Prediction Index:', highestPredictionIndex);
  
        // Check if the highest prediction corresponds to a specific index
        if (highestPredictionIndex === 4) {
          // Display an alert for the specific condition
          Alert.alert('Invalid Image', 'The uploaded image does not belong to any given pattern.');
        } else {
          // Find the class with the highest confidence
          const highestPredictionClass = RESULT_MAPPING[highestPredictionIndex];
  
          // Check if the confidence meets the threshold
          const confidence = prediction[highestPredictionIndex];
          if (confidence >= CONFIDENCE_THRESHOLDS[highestPredictionClass]) {
            // Valid prediction
            setIsProcessing(false);
            navigation.navigate('ImageDisplay', { result: highestPredictionClass, imageUri: base64Image.uri });
            console.log('Prediction success due to confidence:', prediction);
          } else {
            // Confidence below threshold, consider it as an invalid prediction
            setIsProcessing(false);
            // console.log('Prediction rejected due to low confidence:', prediction);
            // alert('Prediction rejected due to low confidence.', prediction);
            Alert.alert(
              'Empty Image',
              'Please provide an image with a distinct pattern for classification.',
              [{ text: 'OK' }]
            );
            
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  // const processImagePrediction = async (base64Image) => {
  //   const model = await getModel();
  //   try {
  //     const tensor = await convertBase64ToTensor(base64Image.base64);
  
  //     if (!model || !tensor) {
  //       setIsProcessing(false);
  //       setIsLoading(false); // Set loading to false
  //       return;
  //     }
  
  //     const prediction = await startPrediction(model, tensor);
  
  //     if (prediction && prediction.length > 0) {
  //       // Find the class with the highest confidence
  //       const highestPredictionIndex = tf.argMax(prediction).dataSync()[0];
  //       const highestPredictionClass = RESULT_MAPPING[highestPredictionIndex];
  
  //       // Check if the confidence meets the threshold
  //       const confidence = prediction[highestPredictionIndex];
  //       if (confidence >= CONFIDENCE_THRESHOLDS[highestPredictionClass]) {
  //         // Valid prediction
  //         setIsProcessing(false);
  //         navigation.navigate('ImageDisplay', { result: highestPredictionClass, imageUri: base64Image.uri });
  //         console.log('Prediction success due to confidence:', prediction);
          
  //       } else {
  //         // Confidence below threshold, consider it as an invalid prediction
  //         setIsProcessing(false);
  //         console.log('Prediction rejected due to low confidence:', prediction);
  //         alert('Prediction rejected due to low confidence:', prediction)
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const processImagePrediction = async (base64Image) => {
  //   const model = await getModel();
  //   try {
  //     const tensor = await convertBase64ToTensor(base64Image.base64);
  
  //     if (!model || !tensor) {
  //       setIsProcessing(false);
  //       setIsLoading(false); // Set loading to false
  //       return;
  //     }
  
  //     const prediction = await startPrediction(model, tensor);
  
  //     console.log('Prediction:', prediction);
  
  //     if (prediction && prediction.length > 0) {
  //       const highestPredictionIndex = tf.argMax(prediction).dataSync()[0];
  
  //       console.log('Highest Prediction Index:', highestPredictionIndex);
  
  //       // Check if the highest prediction corresponds to a specific index
  //       if (highestPredictionIndex === 4) {
  //         // Display an alert for the specific condition
  //         Alert.alert('Invalid Image', 'The uploaded image does not belong any given pattern.');
  //       } else {
  //         // Display the result for other cases
  //         const highestPredictionClass = RESULT_MAPPING[highestPredictionIndex];
  //         setIsProcessing(false);
  //         navigation.navigate('ImageDisplay', { result: highestPredictionClass, imageUri: base64Image.uri });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const captureImageOrPick = async () => {
    if (cameraRef.current) {
      handleImageCapture();
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
    });

    console.log('ImagePicker result:', result);

    if (!result.canceled) {
      setCapturedImage(result.uri);
      setIsLoading(true);
      processImagePrediction(result);
    }
  };

  const pickHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission === null ? (
        <Text>Requesting camera permission...</Text>
      ) : hasCameraPermission === false ? (
        <Text>No access to the camera.</Text>
      ) : (
        <>
          {capturedImage ? (
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          ) : (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={Camera.Constants.Type.back}
              autoFocus={Camera.Constants.AutoFocus.on}
              whiteBalance={Camera.Constants.WhiteBalance.auto}
            />
          )}
          <Pressable onPress={captureImageOrPick} style={styles.captureButton}>
            <View style={styles.iconContainer}>
              <FontAwesome name="camera" size={32} color="white" />
            </View>
          </Pressable>
          <TouchableOpacity style={styles.captureButton1} onPress={pickImage}>
            <View style={styles.iconContainer}>
              <FontAwesome name="image" style={{ color: '#fff', fontSize: 30 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton2} onPress={pickHome}>
            <View style={styles.iconContainer}>
              <FontAwesome name="home" style={{ color: '#fff', fontSize: 30 }} />
            </View>
          </TouchableOpacity>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="white" />
              <Text style={{ color: 'white' }}>Loading...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0ECED',
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  capturedImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  captureButton: {
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 50,
    bottom: 40,
    width: 100,
    zIndex: 100,
    height: 100,
    backgroundColor: 'rgba(1, 0, 0, 0.5)',
    borderRadius: 50,
  },
  captureButton1: {
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 160,
    bottom: 60,
    width: 50,
    zIndex: 100,
    height: 50,
    backgroundColor: 'rgba(1, 0, 0, 0.5)',
    borderRadius: 50,
  },
  captureButton2: {
    position: 'absolute',
    right: Dimensions.get('screen').width / 2 - 160,
    bottom: 60,
    width: 50,
    zIndex: 100,
    height: 50,
    backgroundColor: 'rgba(1, 0, 0, 0.5)',
    borderRadius: 50,
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Classify;
