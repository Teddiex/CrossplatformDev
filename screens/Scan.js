import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera'; // Install this library
import { getProductInfoFromApi, parseProductInfoFromApi } from '../API/OFF.js';
import { NavigationContainer } from '@react-navigation/native'; // Import if needed

const Scan = ({ navigation }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleBarcodesScanned = ({ data }) => {
    setScanning(false);
    setScannedData(data);
  };

  useEffect(() => {
    if (scannedData) {
      getProductInfoFromApi(scannedData)
        .then((json) => parseProductInfoFromApi(json, scannedData))
        .then((productInfo) => navigation.navigate('ProductScreen', productInfo))
        .catch((error) => console.error(error));
    }
  }, [scannedData, navigation]);

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanning ? handleBarcodesScanned : null}
        style={StyleSheet.absoluteFillObject}
      />
      {scanning && <View style={styles.scanningOverlay} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Scan;