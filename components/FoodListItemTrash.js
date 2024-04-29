import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteFood } from '../Services/FirestoreService';
import Icon from 'react-native-vector-icons/Ionicons';

const FoodListItemTrash = ({ item }) => {
    const navigation = useNavigation();

    const onItemPress = (item) => {
        
        const barcode = item.code || item.barcode;

        if (barcode) {
            navigation.navigate('Product Screen', { barcode });
        
        }
        else {
            throw new Error('Barcode not found in item:', item);
        }
    };

    const onTrashPressed = (item) => {
        deleteFood(item.id)
            .then(() => {
                alert('Product deleted from your list');
            })
            .catch((error) => {
                console.log('Error deleting product from database:', error);
                alert('Failed to delete product. Please try again.');
            });

    };

    return (
        <TouchableOpacity onPress={() => onItemPress(item)}>
            <View style={styles.container}>
                <View style={{ flex: 1, gap: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.product_name}</Text>
                    <Text style={{ color: 'dimgray' }}>{item.nutriments['energy-kcal_100g']} kcal, {item.brands}</Text>
                </View>
                <TouchableOpacity onPress={() => onTrashPressed(item)}>
                    <Icon name="trash-bin" size={24} color="black" />
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

export default FoodListItemTrash;
