import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Image, Pressable } from "react-native";
import { api } from "../services/api";
import { coffeeImages } from "../constants/coffeeImages";

const HomeScreen = ({ navigation }) => {
    const [coffees, setCoffes] = useState([]);

    useEffect(() => {
        api.get("/coffees")
            .then((response) => setCoffes(response.data))
            .catch((error) => console.error("Error fetching coffees", error))
    }, []);

    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-bold mb-4">☕ Coffee List</Text>
            <FlatList
                data={coffees}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => (

                    <View className="bg-white p-4 mb-4 rounded-lg shadow-xl shadow-gray-300">
                        <Image
                            source={coffeeImages[item.name]}
                            className="w-32 h-32 rounded-lg mb-2"
                            resizeMode="cover"
                        />
                        <Text className="text-lg font-bold mb-2">{item.name}</Text>

                        <View className="flex-row justify-between items-center">
                            <Text>${item.price}</Text>
                            <Pressable
                                onPress={() => console.log("Added to cart", item.name)}
                                className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center mt-2 self-end relative"
                            >
                                <Text className="text-white text-lg">+</Text>

                            </Pressable>
                        </View>
                    </View>

                )}
            />
        </View>
    )
};

export default HomeScreen;