import React from 'react';
import { PieChart } from 'react-native-pie-chart';
import { Dimensions, View, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CaloriePieChart = ({ caloriesIntake, caloriesGoal }) => {
  const chart_wh = 250;
  const series = [caloriesIntake, Math.max(caloriesGoal - caloriesIntake, 0)];
  const sliceColor = ['#4CAF50', '#FFC107'];

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Calories Intake vs Goal</Text>
      <PieChart
        chart_wh={chart_wh}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.45}
        coverFill={'#FFF'}
      />
    </View>
  );
};

export default CaloriePieChart;
