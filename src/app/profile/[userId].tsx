import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostCard from "@/components/PostCard";
import { repository } from "@/lib/mock-repository";
import { Post, User } from "@/lib/types";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { repository.getCurrentUser().then(setUser); if (userId) repository.listUserPosts(userId).then(setPosts); }, [userId]);
  return <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={({ item }) => <PostCard post={item} />} contentContainerStyle={styles.list} ListHeaderComponent={
    <View style={styles.profile}>{user && <><Image source={{ uri: user.avatarUrl }} style={styles.avatar} /><Text style={styles.name}>{user.name}</Text><Text style={styles.bio}>{user.bio}</Text></>}</View>
  } />;
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  profile: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: 12 },
  name: { color: "#0f172a", fontSize: 24, fontWeight: "800" },
  bio: { color: "#64748b", textAlign: "center", marginTop: 6, lineHeight: 20 },
});
