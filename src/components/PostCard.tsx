import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} asChild>
      <Pressable style={styles.card}>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
          <Text style={styles.meta}>{post.authorName} · {post.likes} likes</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", marginBottom: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  image: { width: "100%", height: 190, backgroundColor: "#e2e8f0" },
  details: { padding: 12 },
  title: { color: "#0f172a", fontSize: 16, fontWeight: "800" },
  meta: { color: "#64748b", fontSize: 12, marginTop: 6 },
});
