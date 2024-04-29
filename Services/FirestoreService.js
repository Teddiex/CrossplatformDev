import { firestore } from '../Database/Firebase'; 
import { collection, addDoc, serverTimestamp, query, orderBy, limit, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export const addFoodToDatabase = async (foodData, barcode) => {
  try {
    if (!barcode){
      barcode = foodData.code;
    }
    const docRef = await addDoc(collection(firestore, "foods"), {
      productName: foodData.product_name,
      calories: foodData.nutriments['energy-kcal_100g'],
      carbohydrates: foodData.nutriments.carbohydrates_100g,
      protein: foodData.nutriments.proteins_100g,
      fat: foodData.nutriments.fat_100g,
      barcode: barcode,
      createdAt: serverTimestamp()
    });
    console.log('Food added successfully with ID: ' + docRef.id);
  } catch (error) {
    console.log('Failed to add food: ' + error.message);
  }
};


export const subscribeToMostRecentFood = (updateRecentFoodName, updateRecentFoodCalories) => {
  const foodRef = collection(firestore, "foods");
  const q = query(foodRef, orderBy("createdAt", "desc"), limit(1));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const mostRecentFoodDoc = snapshot.docs[0].data();
      updateRecentFoodName(mostRecentFoodDoc.productName);
      updateRecentFoodCalories(mostRecentFoodDoc.calories);
      
    }
  }, error => {
    console.error("Error fetching the most recent food:", error);
  });

  return unsubscribe;
};

export const subscribeToTodaysFoodData = (updateData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const foodRef = collection(firestore, "foods");
  const q = query(foodRef, where("createdAt", ">=", today), where("createdAt", "<", tomorrow));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      totalCalories += Number(data.calories);
      totalProtein += Number(data.protein);
      totalCarbs += Number(data.carbohydrates);
      totalFat += Number(data.fat);
    });

    updateData({
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    });
  }, error => {
    console.error("Error fetching today's food data:", error);
  });

  return unsubscribe;
};


export const deleteFood = async (foodId) => {
  try {
    await deleteDoc(doc(firestore, 'foods', foodId));
    console.log('Food deleted successfully');
  } catch (error) {
    console.error('Error deleting food:', error);
  }
}