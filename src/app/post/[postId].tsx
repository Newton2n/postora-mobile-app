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
      <Text className="text-3xl font-extrabold text-ink dark:text-white">{post.title}</Text>
      <Text className="mt-2 text-muted dark:text-slate-400">{post.authorName} · {post.createdAt} · {post.likes} likes</Text>
      <Text className="mt-6 text-base leading-6 text-slate-700 dark:text-slate-300">{post.content}</Text>
      {isAuthor && <View style={styles.actions}>
        <Pressable className="flex-1 items-center rounded-xl border border-brand p-3 active:opacity-80" onPress={() => router.push(`/edit-post/${post.id}`)}><Text className="font-extrabold text-brand">Edit</Text></Pressable>
        <Pressable className="flex-1 items-center rounded-xl bg-red-600 p-3 active:opacity-80" onPress={remove}><Text className="font-extrabold text-white">Delete</Text></Pressable>
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
