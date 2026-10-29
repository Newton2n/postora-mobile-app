import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import PostCard from "@/components/PostCard";
import { repository } from "@/lib/mock-repository";
import { Post } from "@/lib/types";
import ScreenContainer from "@/components/ui/ScreenContainer";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repository.listPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  if (loading) return <ScreenContainer><View style={styles.center}><ActivityIndicator color="#2563eb" /></View></ScreenContainer>;
  return (
    <ScreenContainer edges={["left", "right"]} contentStyle={styles.list}>
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={styles.feed}
      ListHeaderComponent={<View><Text className="mb-1 text-3xl font-extrabold text-ink dark:text-white">Discover</Text><Text className="mb-5 text-muted dark:text-slate-400">Ideas, images, and moments from the community.</Text></View>}
      ListEmptyComponent={<Text className="mt-10 text-center text-muted dark:text-slate-400">No posts yet. Create the first one.</Text>}
    />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 0 },
  feed: { paddingBottom: 8 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: "#64748b", textAlign: "center", marginTop: 40 },
});
