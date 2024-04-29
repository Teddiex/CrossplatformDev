import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getProductInfoFromApi, parseProductInfoFromApi } from '../API/OFF';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { addFoodToDatabase } from '../Services/FirestoreService';

const ProductScreen = ({route}) => {
  const [foodData, setFoodData] = useState(null);
  const {barcode} = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch product information based on the barcode
    getProductInfoFromApi(barcode)
      .then((json) => {
        const foodData = parseProductInfoFromApi(json, barcode);
        setFoodData(foodData);

      })
      .catch((error) => {
        console.error('Error fetching product information:', error);
      });
  }, [barcode]);

 
  

  if (!foodData || foodData.length === 0) {
    return (
      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        <Text style = {{fontSize: 20}}>No product information could be found for the scanned barcode.</Text>
      </View>
    );
  }

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
        <TouchableOpacity onPress={goBack} styles= {{margin: 100}}>
          <Icon name="arrowleft" color={'black'} size={64}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Add Food</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.foodName}>{foodData.product_name}</Text>
        <Text style={styles.nutrientLabel}>Calories: <Text style={styles.nutrientValue}>{parseFloat(foodData.nutriments['energy-kcal_100g']).toFixed(1)} kcal</Text></Text>
        <Text style={styles.nutrientLabel}>Carbohydrates: <Text style={styles.nutrientValue}>{parseFloat(foodData.nutriments.carbohydrates_100g).toFixed(1)} g</Text></Text>
        <Text style={styles.nutrientLabel}>Protein: <Text style={styles.nutrientValue}>{parseFloat(foodData.nutriments.proteins_100g).toFixed(1)} g</Text></Text>
        <Text style={styles.nutrientLabel}>Fat: <Text style={styles.nutrientValue}>{parseFloat(foodData.nutriments.fat_100g).toFixed(1)} g</Text></Text>
        <Image source = {{uri: `https://static.openfoodfacts.org/images/misc/nutriscore-${foodData.nutrition_grades}.png`}} style = {styles.imageNutri}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={goBack}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => addFoodToDatabase(foodData, barcode).then(alert('Product Added'))}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    backgroundColor: '#FFFFFF',
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  nutrientLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 0.4,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 0.4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageNutri: {
    height: 80,
    marginTop: 5,
    marginBottom: 10,
    resizeMode: "contain",
},
});

export default ProductScreen;
