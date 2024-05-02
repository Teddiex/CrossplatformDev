import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { subscribeToMostRecentFood, subscribeToTodaysFoodData } from '../Services/FirestoreService';
import { useState, useEffect } from 'react';
import CaloriePieChart from '../components/PieChart';


const HomeScreen = ({navigation, route}) => {
  // Assuming you have state hooks to track these values

  
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 100,
    carbs: 300,
    fat: 70
  });
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


  useEffect(() => {
    if (route.params?.goals) {
      setGoals(route.params.goals);
    }
  }, [route.params?.goals]);



  const onEditGoalPress = () => {
    // Pass current goal as a parameter to EditGoalScreen
    navigation.navigate('Edit Goal Screen', { goals });
  };

  const onShowMorePress = () => {
    navigation.navigate('Show More Screen');
  }



  
  return (
    <ScrollView 
    contentContainerStyle ={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Calories</Text>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <View style={styles.row}>
              <MaterialCommunityIcons name='flag' style={{ margin: 5 }} />
              <Text>Goal: {goals.calories}</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons name='food' style={{ margin: 5 }} />
              <Text>Intake: {caloriesIntake}</Text>
            </View>
          </View>
          <CaloriePieChart caloriesGoal={goals.calories} caloriesIntake={caloriesIntake} />
        </View>
        <TouchableOpacity style={styles.editButton} onPress={onEditGoalPress}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      

      <View style={styles.section}>
        <Text style={styles.title}>Macros</Text>
        <View style={styles.row}>
          <View >
          <Text>Protein: {Math.round(macros.protein)}g</Text>
          <Text>Goal: {goals.protein}g</Text>
          </View>
          <View>
          <Text>Carbs: {Math.round(macros.carbs)}g</Text>
          <Text>Goal: {goals.carbs}g</Text>
          </View>
          <View>
          <Text>Fat: {Math.round(macros.fat)}g</Text>
          <Text>Goal: {goals.fat}g</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>Recent Food</Text>
          <TouchableOpacity style={styles.showMoreButton} onPress={onShowMorePress}>
            <Text>Show More</Text>
          </TouchableOpacity>
        </View>
          <Text>{recentFoodName}</Text>
          <Text>Calories: {recentFoodCalories}</Text>
      </View>
    </ScrollView>
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
    borderColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  textContainer: {
    flex: 1,
    paddingRight: 10, // Add padding to separate text from chart
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'lightgrey'
  },
  showMoreButton: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'lightgrey'
  },
});

export default HomeScreen;
