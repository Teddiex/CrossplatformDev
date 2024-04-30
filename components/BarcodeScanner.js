import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BarcodeScanner = ({ onBarcodeScanned }) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [key, setKey] = useState(0);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    if (flash !== Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.off);
    }
    navigation.navigate('Product Screen', { barcode: data });
  };

  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1);
      return () => {};
    }, [])
  );

  const toggleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.torch
        ? Camera.Constants.FlashMode.off
        : Camera.Constants.FlashMode.torch
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        key={key}
        type={Camera.Constants.Type.back}
        ratio='16:9'
        onBarCodeScanned={handleBarcodeScanned}
        style={StyleSheet.absoluteFillObject}
        flashMode={flash}
      >
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <Ionicons name={flash === Camera.Constants.FlashMode.torch ? 'flash' : 'flash-off'} size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <View style={styles.overlayBackground} />
          <View style={styles.focusedArea} />
          <View style={styles.overlayBackground} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  flashButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  focusedArea: {
    width: 300,
    height: 150,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
});

export default BarcodeScanner;
