import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { repository } from "@/lib/mock-repository";
import { Post } from "@/lib/types";
import { RootState } from "@/store/store";
import ScreenContainer from "@/components/ui/ScreenContainer";

export default function PostScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const user = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => { if (postId) repository.getPost(postId).then(setPost); }, [postId]);
  if (!post) return <ScreenContainer><View style={styles.center}><ActivityIndicator color="#2563eb" /></View></ScreenContainer>;
  const isAuthor = post.authorId === user?.id;

  const remove = () => Alert.alert("Delete post?", "This removes the demo post from the local repository.", [
    { text: "Cancel", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: async () => { await repository.deletePost(post.id); router.replace("/"); } },
  ]);

  return (
    <ScreenContainer scroll edges={["left", "right", "bottom"]} contentStyle={styles.container}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.meta}>{post.authorName} · {post.createdAt} · {post.likes} likes</Text>
      <Text style={styles.content}>{post.content}</Text>
      {isAuthor && <View style={styles.actions}>
        <Pressable style={styles.secondary} onPress={() => router.push(`/edit-post/${post.id}`)}><Text style={styles.secondaryText}>Edit</Text></Pressable>
        <Pressable style={styles.danger} onPress={remove}><Text style={styles.buttonText}>Delete</Text></Pressable>
      </View>}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: "100%", height: 300, borderRadius: 18, backgroundColor: "#e2e8f0", marginBottom: 20 },
  title: { color: "#0f172a", fontSize: 28, fontWeight: "800" },
  meta: { color: "#64748b", marginTop: 8 },
  content: { color: "#334155", fontSize: 17, lineHeight: 26, marginTop: 24 },
  actions: { flexDirection: "row", gap: 12, marginTop: 30 },
  secondary: { borderWidth: 1, borderColor: "#2563eb", borderRadius: 10, padding: 12, flex: 1, alignItems: "center" },
  secondaryText: { color: "#2563eb", fontWeight: "800" },
  danger: { backgroundColor: "#dc2626", borderRadius: 10, padding: 12, flex: 1, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
