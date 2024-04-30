import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addFoodToDatabase } from '../Services/FirestoreService';

const FoodListItem = ({ item }) => {
    const navigation = useNavigation();

    console.log('Item:', item);

    const onItemPress = (item) => {
        
        const barcode = item.code || item.barcode;

        if (barcode) {
            navigation.navigate('Product Screen', { barcode });
        
        }
        else {
            throw new Error('Barcode not found in item:', item);
        }
    };

    const onPlusPressed = (item) => {
        addFoodToDatabase(item)
            .then(() => {
                alert('Product added to your list');
            })
            .catch((error) => {
                console.log('Error adding product to database:', error);
                alert('Failed to add product. Please try again.');
            });
    };


    return (
        <TouchableOpacity onPress={() => onItemPress(item)}>
            <View style={styles.container}>
                <View style={{ flex: 1, gap: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.product_name}</Text>
                    <Text style={{ color: 'dimgray' }}>{item.nutriments['energy-kcal_100g']} kcal, {item.brands}</Text>
                </View>
                <TouchableOpacity onPress={() => onPlusPressed(item)}>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default FoodListItem;
