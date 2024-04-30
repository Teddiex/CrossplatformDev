import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import BarcodeScanner from '../components/BarcodeScanner';
import ProductScreen from '../screens/ProductScreen';
import EditGoalScreen from '../screens/EditGoalScreen';
import ShowMoreScreen from '../screens/ShowMoreScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';


const ScanNav = () => {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Barcode Scanner" component={BarcodeScanner}/>
      <Stack.Screen name="Product Screen" component={ProductScreen}/>
    </Stack.Navigator>
  );
}

const SearchNav = () => {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search Screen" component={SearchScreen}/>
      <Stack.Screen name="Product Screen" component={ProductScreen}/>
      <Stack.Screen name="Product Details Screen" component={ProductDetailsScreen}/>
    </Stack.Navigator>
  );
}

const HomeNav = () => {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home Screen" component={HomeScreen}/>
      <Stack.Screen name="Edit Goal Screen" component={EditGoalScreen}/>
      <Stack.Screen name="Show More Screen" component={ShowMoreScreen}/>
      <Stack.Screen name="Product Screen" component={ProductScreen}/>
      <Stack.Screen name="Product Details Screen" component={ProductDetailsScreen}/>

    </Stack.Navigator>
  );
}


const TabNav = () => {
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { height : 60},
      tabBarActiveTintColor: 'black'
    }}> 

      <Tab.Screen name="Home" component={HomeNav}
      options = {{
        tabBarIcon: ({color, size}) => (
          <Icon name = "home" color = {color} size={size}/>
        ),
      }}
      />

      <Tab.Screen name = "Scan" component={ScanNav}
        options = {{
          tabBarIcon: ({color, size}) => (
            <Icon name = "scan" color = {color} size={size}/>
          ),
        }}
      />
      <Tab.Screen name="Search" component={SearchNav}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size}/>
          ),
        }}
      />
      

    </Tab.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <TabNav/>
    </NavigationContainer>
  );
}