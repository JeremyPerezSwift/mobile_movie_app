import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {updateSearchCount} from "@/services/appwrite";

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

    const searchMovies = async (): Promise<void> => {
        const q = searchQuery.trim();

        if (!q) {
            reset();
            return;
        }

        const result = await loadMovies(); // ✅ result est la vraie liste renvoyée par fetchMovies
        if (result && Array.isArray(result) && result.length > 0) {
            await updateSearchCount(q, result[0], result); // ✅ plus de décalage
        }
    };

    /*const searchMoviesOld = async (): Promise<void> => {
        if (searchQuery.trim()) {
            await loadMovies();

            if (movies && movies.length > 0) {
                console.log(movies[0]);
                await updateSearchCount(searchQuery, movies[0]);
            }
        } else {
            reset();
        }
    };*/

    // Debounced search effect
    /*useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();

                // Call updateSearchCount only if there are results
                if (movies?.length! > 0 && movies?.[0]) {
                    console.log(movies?.[0]);
                    await updateSearchCount(searchQuery, movies[0]);
                }
            } else {
                reset();
            }
        }, 1200);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);*/
    
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

                    <Button
                        onPress={searchMovies}
                        title="search"
                    />

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