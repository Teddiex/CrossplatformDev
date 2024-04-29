import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import FoodListItem from "../components/FoodListItem";
import { searchAPI } from "../API/OFF";
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);  // Example history data

  const performSearch = (searchTerm = search) => {
    if (!searchTerm.trim()) {
      return; // Avoid performing an empty search
    }

    setLoading(true);
    searchAPI(searchTerm)
      .then(data => {
        setLoading(false);
        setSearchResults(data.products);
        if (!history.includes(searchTerm)) {
          setHistory(prevHistory => [...prevHistory, searchTerm]);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  };

  const onHistoryPress = (term) => {
    setSearch(term);
    performSearch(term);
  };

  const deleteHistoryItem = (term) => {
    setHistory(prevHistory => prevHistory.filter(item => item !== term));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search food items"
          style={styles.input}
        />
        <Button title="Search" onPress={() => performSearch()} disabled={!search.trim()}/>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <FoodListItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1, gap: 5 }}
        />
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.header}>Search History</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <View style={styles.historyItemContainer}>
              <TouchableOpacity onPress={() => onHistoryPress(item)}>
                <Text style={styles.historyItem}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteHistoryItem(item)} style={styles.deleteButton}>
                <AntDesign name="closecircle" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchContainer: {
    flex: 2,
    padding: 10,
    gap: 5,
  },
  historyContainer: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  historyItem: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
