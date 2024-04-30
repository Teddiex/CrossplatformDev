import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const EditGoalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialGoals = route.params.goals;

  const [goals, setGoals] = useState({
    calories: initialGoals.calories,
    protein: initialGoals.protein,
    carbs: initialGoals.carbs,
    fat: initialGoals.fat
  });

  const handleInputChange = (name, value) => {
    setGoals(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveGoals = () => {
    navigation.navigate('Home Screen', { goals });
  };

  const goBack = () => {
    navigation.goBack();
  }

  return (
      <ScrollView 
      contentContainerStyle = {styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="arrowleft" color={'black'} size={64} onPress={goBack} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Goal</Text>
        </View>
      <View style={styles.inputGroup}>
        {Object.entries(goals).map(([key, value]) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
            <TextInput
              style={styles.input}
              value={String(value)}
              onChangeText={(newValue) => handleInputChange(key, newValue)}
              keyboardType="numeric"
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveGoals}>
        <Text style={styles.buttonText}>Finish Editing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    paddingBottom: 10
  },
  header: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputGroup: {
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
    padding: 10,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: 10,
    backgroundColor: '#e7e7e7',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default EditGoalScreen;
