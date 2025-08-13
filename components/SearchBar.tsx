import React from 'react';
import { TextInput, View } from 'react-native';
import "../global.css"


interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <View className="mx-4 mb-4">
      <TextInput
        className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-base"
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={onSearchChange}
      />
    </View>
  );
};