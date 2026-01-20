import { icons } from "@/constants/icons";
import React from 'react';
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';

interface Props {
    placeholder: string;
    onPress?: () => void;
}

const SearchBar = ({placeholder, onPress}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} tintColor="AB8BFF" className="size-5" resizeMode="contain" />
        <TextInput
            onPress={onPress}
            placeholder={placeholder}
            value=""
            onChangeText={() => {}}
            placeholderTextColor="#A8B5DB"
            className="flex-1 ml-2 text-white"
        />
    </View>
  );
}

export default SearchBar;