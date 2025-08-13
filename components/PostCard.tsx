import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Post } from '../types/Post';
import "../global.css"

interface PostCardProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getContentPreview = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mb-3 mx-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-2">{post.title}</Text>
      <Text className="text-gray-600 mb-3 text-sm leading-5">
        {getContentPreview(post.content)}
      </Text>
      <Text className="text-xs text-gray-400 mb-3">
        Updated: {formatDate(post.updatedAt)}
      </Text>
      <View className="flex-row justify-end space-x-2">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-md mr-2"
          onPress={onEdit}
        >
          <Text className="text-white font-medium">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-md"
          onPress={onDelete}
        >
          <Text className="text-white font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};