import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addFoodToDatabase } from '../Services/FirestoreService';
import Icon from 'react-native-vector-icons/AntDesign';

const ProductDetailsScreen = ({ route }) => {
  const { foodData, barcode } = route.params; // Destructure barcode from route.params
  const [weight, setWeight] = useState('');
  const [nutrients, setNutrients] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  });
  const navigation = useNavigation();

  const calculateNutrients = (weight) => {
    const factor = weight / 100;
    return {
      calories: Math.round(foodData.nutriments['energy-kcal_100g'] * factor),
      carbs: Math.round(foodData.nutriments.carbohydrates_100g * factor),
      protein: Math.round(foodData.nutriments.proteins_100g * factor),
      fat: Math.round(foodData.nutriments.fat_100g * factor)
    };
  };

  const handleWeightInput = (input) => {
    setWeight(input);
    if (input) {
      const calculatedNutrients = calculateNutrients(parseFloat(input));
      setNutrients(calculatedNutrients);
    } else {
      setNutrients({ calories: 0, carbs: 0, protein: 0, fat: 0 });
    }
  };

  const handleAddFood = () => {
    const scaledNutrients = {
      ...foodData,
      nutriments: {
        'energy-kcal_100g': nutrients.calories,
        carbohydrates_100g: nutrients.carbs,
        proteins_100g: nutrients.protein,
        fat_100g: nutrients.fat
      }
    };

    addFoodToDatabase(scaledNutrients, barcode, weight)
      .then(() => {
        alert('Product Added');
        navigation.goBack();
      })
      .catch(error => alert('Failed to add product: ' + error.message));
  };

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <Icon name="arrowleft" color={'black'} size={64} onPress={goBack} />
      </View>
      <Text style={styles.nutrientText}>Product: {foodData.product_name}</Text>
      <Text>Enter the weight of the food ingested in grams:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={weight}
        onChangeText={handleWeightInput}
      />
      {weight ? (
        <View>
          <Text style={styles.nutrientText}>Calories: {nutrients.calories} kcal</Text>
          <Text style={styles.nutrientText}>Carbohydrates: {nutrients.carbs} g</Text>
          <Text style={styles.nutrientText}>Protein: {nutrients.protein} g</Text>
          <Text style={styles.nutrientText}>Fat: {nutrients.fat} g</Text>
        </View>
      ) : null}
      <Button title="Add Food" onPress={handleAddFood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    padding: 10,
    marginVertical: 20,
  },
  nutrientText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ProductDetailsScreen;
