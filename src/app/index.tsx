import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import PostCard from "@/components/PostCard";
import { repository } from "@/lib/mock-repository";
import { Post } from "@/lib/types";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repository.listPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator color="#2563eb" /></View>;
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<View><Text style={styles.heading}>Discover</Text><Text style={styles.subtitle}>Ideas, images, and moments from the community.</Text></View>}
      ListEmptyComponent={<Text style={styles.empty}>No posts yet. Create the first one.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  heading: { color: "#0f172a", fontSize: 32, fontWeight: "800", marginBottom: 4 },
  subtitle: { color: "#64748b", marginBottom: 18 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: "#64748b", textAlign: "center", marginTop: 40 },
});
