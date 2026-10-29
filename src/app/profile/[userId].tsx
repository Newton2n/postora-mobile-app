import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostCard from "@/components/PostCard";
import { repository } from "@/lib/mock-repository";
import { Post, User } from "@/lib/types";
import ScreenContainer from "@/components/ui/ScreenContainer";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { repository.getCurrentUser().then(setUser); if (userId) repository.listUserPosts(userId).then(setPosts); }, [userId]);
  return <ScreenContainer contentStyle={styles.container}><FlatList data={posts} keyExtractor={(item) => item.id} renderItem={({ item }) => <PostCard post={item} />} contentContainerStyle={styles.list} ListHeaderComponent={
    <View className="mb-6 items-center">{user && <><Image source={{ uri: user.avatarUrl }} className="mb-3 h-24 w-24 rounded-full" /><Text className="text-2xl font-extrabold text-ink dark:text-white">{user.name}</Text><Text className="mt-1.5 text-center leading-5 text-muted dark:text-slate-400">{user.bio}</Text></>}</View>
  } /></ScreenContainer>;
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0 },
  list: { paddingBottom: 8 },
});
