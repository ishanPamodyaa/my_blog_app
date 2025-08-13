import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../types/Post';

const POSTS_KEY = 'blog_posts';

export const savePosts = async (posts: Post[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

export const loadPosts = async (): Promise<Post[]> => {
  try {
    const postsJson = await AsyncStorage.getItem(POSTS_KEY);
    return postsJson ? JSON.parse(postsJson) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};