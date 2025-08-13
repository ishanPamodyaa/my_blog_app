import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import "../global.css"

interface DeleteConfirmationProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  postTitle: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  visible,
  onConfirm,
  onCancel,
  postTitle,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-6 mx-8 w-80">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Delete Post
          </Text>
          <Text className="text-gray-600 mb-6">
            Are you sure you want to delete &quot;{postTitle}&quot;? This action cannot be undone.
          </Text>
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              className="px-4 py-2 rounded-md border border-gray-300 mr-3"
              onPress={onCancel}
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 px-4 py-2 rounded-md"
              onPress={onConfirm}
            >
              <Text className="text-white font-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};