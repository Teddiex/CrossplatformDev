import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GoalModalScreen = ({ nutrient, currentGoal, onSave, onClose }) => {
  const [newGoal, setNewGoal] = useState(currentGoal);

  // Handler to save goal
  const saveGoal = () => {
    onSave(newGoal);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.headerText}>Set {nutrient} Goal</Text>
        <View style={styles.content}>
          {/* Parent view for horizontal alignment */}
          <View style={styles.inputContainer}>
            <Text>Per Day</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewGoal}
              value={newGoal}
              placeholder="Enter New Goal"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} color='red'/>
          <Button title="Save Goal" onPress={saveGoal} color='green'/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modal: {
    backgroundColor: 'white',
    width: '80%', // Adjust the width as needed
    maxHeight: '80%', // Adjust the max height as needed
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    width: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});

export default GoalModalScreen;
