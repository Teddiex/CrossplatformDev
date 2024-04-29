import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { subscribeToMostRecentFood, subscribeToTodaysFoodData } from '../Services/FirestoreService';
import { useState, useEffect } from 'react';
import CaloriePieChart from '../components/CaloriesChart';
import MacroPieChart from '../components/MacroChart';


const HomeScreen = () => {
  // Assuming you have state hooks to track these values

  const navigation = useNavigation();

  const [caloriesGoal, setCaloriesGoal] = useState(2000);
  const [caloriesIntake, setCaloriesIntake] = useState(0);
  const [macros, setMacros] = useState({ protein: '0', carbs: '0', fat: '0' });
  const [recentFoodName, setRecentFood] = useState('');
  const [recentFoodCalories, setRecentFoodCalories] = useState(0);

  useEffect(() => {
    const unsubscribeRecent = subscribeToMostRecentFood(setRecentFood, setRecentFoodCalories);
    const unsubscribeToday = subscribeToTodaysFoodData(data => {
      setCaloriesIntake(data.totalCalories);
      setMacros({
        protein: `${data.totalProtein}`,
        carbs: `${data.totalCarbs}`,
        fat: `${data.totalFat}`
      });
    });

    return () => {
      unsubscribeRecent();
      unsubscribeToday();
    };
  }, []);



  const onEditGoalPress = () => {
    // Navigate to the Edit Goal screen
    navigation.navigate('Edit Goal Screen');
  }

  const onShowMorePress = () => {
    navigation.navigate('Show More Screen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Calories</Text>
        <View style={styles.row}>
        <View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons name = 'flag' style={{margin:5}}/>
          <Text>Goal: {caloriesGoal}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons name = 'food' style={{margin:5}}/>
          <Text>Intake: {caloriesIntake}</Text>
          </View>
        </View>
      </View>
        
        <TouchableOpacity style={styles.editButton} onPress={onEditGoalPress}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Macros</Text>
        {/* Insert progress circle components for macros here */}
        <View style={styles.row}>
          <Text>Protein {Math.round(macros.protein)}g</Text>
          <Text>Carbs {Math.round(macros.carbs)}g</Text>
          <Text>Fat {Math.round(macros.fat)}g</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.title}>Recent Food</Text>
        <TouchableOpacity style = {styles.showMoreButton} onPress={onShowMorePress}>
          <Text>Show More</Text>
        </TouchableOpacity>
        </View>
        <View styles={styles.row}>
        <Text>{recentFoodName}</Text>
        <Text>Calories: {recentFoodCalories}</Text>
        </View>
        
        {/* Insert pagination indicators here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  section: {
    flex: 1,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignContent: 'center',
    borderColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  showMoreButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default HomeScreen;
