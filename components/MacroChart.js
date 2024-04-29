import React from 'react';
import { PieChart } from 'react-native-pie-chart';
import { Dimensions, View, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const MacroPieChart = ({ macros }) => {
  const chart_wh = 250;
  const series = [macros.protein, macros.carbs, macros.fat];
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B'];

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Macro Nutrients</Text>
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

export default MacroPieChart;
