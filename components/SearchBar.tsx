import { icons } from "@/constants/icons";

import {Image, View, TextInput} from 'react-native';

interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}

const SearchBar = ({placeholder, value, onChangeText, onPress}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} tintColor="AB8BFF" className="size-5" resizeMode="contain" />
        <TextInput
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#A8B5DB"
            className="flex-1 ml-2 text-white"
        />
    </View>
  );
}

export default SearchBar;