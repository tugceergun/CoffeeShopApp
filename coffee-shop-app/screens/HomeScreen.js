import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { api } from "../services/api";

const HomeScreen = ({ navigation }) => {

    const [coffees, setCoffes] = useState([]);

    useEffect(() => {
        api.get("/coffees")
            .then((response) => setCoffes(response.data))
            .catch((error) => console.error("Error fetching coffees", error))
    }, []);

    return (
        <View>
        <Text>☕ Coffee List</Text>
        <FlatList
          data={coffees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Button title="Add to Cart" onPress={() => console.log("Added to cart", item.name)} />
            </View>
          )}
        />
      </View>
    )
};

export default HomeScreen;