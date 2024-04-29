import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import GoalModalScreen from './GoalModalScreen'; // Import the goal modal screen
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const EditGoalScreen = () => {
  const navigation = useNavigation();
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [goals, setGoals] = useState({
    calories: '2000',
    carbs: '250',
    protein: '100',
    fat: '80',
  });

  const goBack = () => {
    navigation.goBack();
  };

  // Handler to be called when an item is pressed
  const onItemPress = (nutrient) => {
    setSelectedNutrient(nutrient);
  };

  // Handler to close the modal
  const closeModal = () => {
    setSelectedNutrient(null);
  };

  // Handler to update goal
  const updateGoal = (nutrient, newGoal) => {
    setGoals(prevGoals => ({
      ...prevGoals,
      [nutrient]: newGoal
    }));
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'space-between', margin: 5 }}>
        <Icon name="arrowleft" color={'black'} size={64} onPress={goBack} />
      </View>
      <Text style={styles.headerText}>Edit Goals</Text>
      <TouchableOpacity onPress={() => onItemPress('calories')} style={styles.item}>
        <Text style={styles.label}>Calories</Text>
        <Text style={styles.value}>{goals.calories}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onItemPress('carbs')} style={styles.item}>
        <Text style={styles.label}>Carbohydrates</Text>
        <Text style={styles.value}>{goals.carbs}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onItemPress('protein')} style={styles.item}>
        <Text style={styles.label}>Protein</Text>
        <Text style={styles.value}>{goals.protein}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onItemPress('fat')} style={styles.item}>
        <Text style={styles.label}>Fat</Text>
        <Text style={styles.value}>{goals.fat}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Finish Editing</Text>
      </TouchableOpacity>

      {/* Modal to edit goal */}
      <Modal
        visible={selectedNutrient !== null}
        transparent={true}
        animationType="slide"
      >
        <GoalModalScreen
          nutrient={selectedNutrient}
          currentGoal={goals[selectedNutrient]}
          onSave={(newGoal) => updateGoal(selectedNutrient, newGoal)}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditGoalScreen;
