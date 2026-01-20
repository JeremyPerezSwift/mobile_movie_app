import React from "react";
import { View, Text, FlatList } from "react-native";
import SearchBar from "@/components/SearchBar";

type Movie = {
    id: number | string;
    title: string;
};

interface Props {
    movies: Movie[] | null;
    onSearchPress: () => void;
}

export default function MoviesSection({ movies, onSearchPress }: Props) {
    const safeMovies = movies ?? []; // fallback tableau

    return (
        <View className="flex-1 mt-5">
            <SearchBar onPress={onSearchPress} placeholder="Search for a movie" />

            <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
            </Text>

            <FlatList
                data={safeMovies}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text className="text-white">{item.title}</Text>
                )}
            />
        </View>
    );
}

