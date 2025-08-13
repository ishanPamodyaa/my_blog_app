import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Post } from "../../types/Post";
import { loadPosts, savePosts } from "../../utils/storage";

export default function PostEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isNewPost = id === "new";

  const loadPost = useCallback(async () => {
    const posts = await loadPosts();
    const post = posts.find((p) => p.id === id);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [id]);

  useEffect(() => {
    if (!isNewPost) {
      loadPost();
    }
  }, [isNewPost, loadPost]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Please fill in both title and content.");
      return;
    }

    setLoading(true);

    try {
      const posts = await loadPosts();
      const now = new Date().toISOString();

      if (isNewPost) {
        const newPost: Post = {
          id: Date.now().toString(),
          title: title.trim(),
          content: content.trim(),
          createdAt: now,
          updatedAt: now,
        };
        posts.push(newPost);
      } else {
        const postIndex = posts.findIndex((p) => p.id === id);
        if (postIndex !== -1) {
          posts[postIndex] = {
            ...posts[postIndex],
            title: title.trim(),
            content: content.trim(),
            updatedAt: now,
          };
        }
      }

      await savePosts(posts);
      router.back();
    } catch {
      Alert.alert("Error", "Failed to save post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Title
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
            placeholder="Enter post title..."
            value={title}
            onChangeText={setTitle}
            multiline={false}
          />
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Content
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50 h-64"
            placeholder="Write your post content here..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          className={`py-4 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500"}`}
          onPress={handleSave}
          disabled={loading}
        >
          <Text className="text-white text-center font-bold text-base">
            {loading ? "Saving..." : isNewPost ? "Create Post" : "Update Post"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
