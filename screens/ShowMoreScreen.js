import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Database/Firebase';
import FoodListItemTrash from '../components/FoodListItemTrash';

const ShowMoreScreen = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foodsRef = collection(firestore, 'foods');
        const q = query(foodsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const foodsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                product_name: doc.data().productName,
                nutriments: {
                    'energy-kcal_100g': doc.data().calories
                },
                carbohydrates: doc.data().carbohydrates,
                protein: doc.data().protein,
                fat: doc.data().fat,
                brands: doc.data().brand || 'Unknown'
            }));
            setFoods(foodsList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching foods:", error);
            setLoading(false);
        });

        return () => unsubscribe();  // Cleanup the subscription
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={foods}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <FoodListItemTrash item={item} />}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    list: {
        paddingBottom: 20
    }
});

export default ShowMoreScreen;
