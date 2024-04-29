import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const BarcodeScanner = ({ onBarcodeScanned }) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [key, setKey] = useState(0); // State to force re-render of Camera component

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to handle barcode scanned event
  const handleBarcodeScanned = ({ data }) => {
    // Navigate to ProductScreen and pass the barcode data as a parameter
    navigation.navigate('Product Screen', { barcode: data });
  };

  // Use useFocusEffect to update the key when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1);
      return () => {};
    }, [])
  );

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
        key={key} // Force re-render of Camera component
        type={Camera.Constants.Type.back}
        ratio='16:9'
        // Set onBarCodeScanned to the handleBarcodeScanned function
        onBarCodeScanned={handleBarcodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarcodeScanner;
