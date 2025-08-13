import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { PostCard } from "../components/PostCard";
import { SearchBar } from "../components/SearchBar";
import { Post } from "../types/Post";
import { loadPosts, savePosts } from "../utils/storage";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    visible: boolean;
    post: Post | null;
  }>({ visible: false, post: null });

  useEffect(() => {
    loadPostsFromStorage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPostsFromStorage();
      return undefined;
    }, [])
  );

  const loadPostsFromStorage = async () => {
    const loadedPosts = await loadPosts();
    setPosts(loadedPosts);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePost = () => {
    router.push("/Post/new");
  };

  const handleEditPost = (postId: string) => {
    router.push({ pathname: "/Post/[id]", params: { id: postId } });
  };

  const handleDeletePost = (post: Post) => {
    setDeleteModal({ visible: true, post });
  };

  const confirmDelete = async () => {
    if (deleteModal.post) {
      const updatedPosts = posts.filter((p) => p.id !== deleteModal.post!.id);
      setPosts(updatedPosts);
      await savePosts(updatedPosts);
    }
    setDeleteModal({ visible: false, post: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ visible: false, post: null });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <TouchableOpacity
          className="bg-green-500 mx-4 mb-4 py-3 rounded-lg"
          onPress={handleCreatePost}
        >
          <Text className="text-white text-center font-bold text-base">
            Create New Post
          </Text>
        </TouchableOpacity>

        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onEdit={() => handleEditPost(item.id)}
              onDelete={() => handleDeletePost(item)}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500 text-center text-base">
                {searchTerm
                  ? "No posts found matching your search."
                  : "No blog posts yet. Create your first post!"}
              </Text>
            </View>
          }
        />

        <DeleteConfirmation
          visible={deleteModal.visible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          postTitle={deleteModal.post?.title || ""}
        />
      </View>
    </SafeAreaView>
  );
}
