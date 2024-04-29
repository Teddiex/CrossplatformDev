// DoughnutChart.js
import React from 'react';
import PieChart from 'react-native-pie-chart';
import { View, Dimensions } from 'react-native';

const DoughnutChart = ({ caloriesGoal, caloriesIntake }) => {
  const chart_wh = 100; // Width and height for the chart
  const series = [caloriesIntake, caloriesGoal - caloriesIntake];
  const sliceColor = ['green', 'lightgrey']; // Colors for the chart slices

  // Ensure that the calories intake does not exceed the goal for the chart representation
  if (series[1] < 0) {
    series[1] = 0;
  }

  return (
    <View>
      <PieChart
        chart_wh={chart_wh}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.45}
        coverFill={'white'}
      />
    </View>
  );
};

export default DoughnutChart;