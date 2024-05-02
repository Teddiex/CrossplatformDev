import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const CaloriePieChart = ({ caloriesGoal, caloriesIntake }) => {

    const screenWidth = Dimensions.get("window").height;
    console.log('Screen width:', screenWidth);
    const chartSize = Math.min(screenWidth*0.07, 80)

    const chartData = [
        {
            name: "Remaining",
            calories: Math.max(caloriesGoal - caloriesIntake, 0), // Ensure no negative values
            color: "lightblue",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Intake",
            calories: caloriesIntake,
            color: "blue",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
    };

    return (
        <View style={styles.chartContainer}>
            <PieChart
                data={chartData}
                width={chartSize} // Adjusted for visual fit
                height={chartSize} // Adjusted for visual fit
                chartConfig={chartConfig}
                accessor={"calories"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute // Show absolute values not percentages
                hasLegend={false} // Disable the built-in legend
            />
            <View style={styles.legendContainer}>
                {chartData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendIcon, {backgroundColor: item.color}]} />
                        <Text style={styles.legendText}>{item.name}: {item.calories}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Ensures horizontal centering of the legend items
        flexWrap: 'wrap', // Allows items to wrap in case of space shortage
        marginTop: 5,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10, // Provides spacing between legend items
    },
    legendIcon: {
        width: 10, // Adjusted for better visibility
        height: 10, // Adjusted for better visibility
        marginRight: 5, // Right margin for spacing between icon and text
    },
    legendText: {
        fontSize: 12,
        color: '#7F7F7F'
    }
});

export default CaloriePieChart;
