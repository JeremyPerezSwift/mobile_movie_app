import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: movies = [],
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 1200);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);
    
  return (
      <View className="flex-1 bg-primary">
          <Image source={images.bg} className="absolute w-full z-0" resizeMode={"cover"} />

          <FlatList
              data={movies}
              className="px-5"
              renderItem={({ item, index }) => (
                  <MovieCard
                      { ... item }
                  />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                  justifyContent: 'center',
                  gap: 16,
                  marginVertical: 16
              }}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListHeaderComponent={
                <>
                    <View className="w-full flex-row justify-center mt-20 items-center" >
                        <Image source={icons.logo} className="w-12 h-10 " />
                    </View>

                    <View className="mt-5 mb-5">
                        <SearchBar
                            placeholder="Search movie ..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>

                    {loading && (
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            className="my-3"
                        />
                    )}

                    {error && (
                        <Text className="text-red-500 px-5 my-3">
                            Error: {error.message}
                        </Text>
                    )}

                    {!loading && !error && searchQuery.trim() && movies?.length! > 0 && (
                        <Text className="text-xl text-white font-bold">
                            Search Results for{' '}
                            <Text className="text-accent" >{searchQuery}</Text>
                        </Text>
                    )}


                </>
              }
              ListEmptyComponent={
                  !loading && !error ? (
                      <View className="mt-10 px-5">
                          <Text className="text-center text-gray-500">
                              {searchQuery.trim()
                                  ? "No movies found"
                                  : "Start typing to search for movies"}
                          </Text>
                      </View>
                  ) : null
              }
          />
      </View>
  );
}

export default Search;