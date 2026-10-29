import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import { Post } from "@/lib/types";
import GlassCard from "./ui/GlassCard";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} asChild>
      <Pressable className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white active:opacity-80 dark:border-slate-800 dark:bg-slate-900">
        <Image source={{ uri: post.imageUrl }} className="h-48 w-full bg-slate-200" />
        <GlassCard style={styles.details}>
          <Text className="text-base font-extrabold text-ink dark:text-white" numberOfLines={2}>{post.title}</Text>
          <Text className="mt-1.5 text-xs text-muted dark:text-slate-400">{post.authorName} · {post.likes} likes</Text>
        </GlassCard>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  details: { padding: 12, borderWidth: 0, borderRadius: 0, shadowOpacity: 0, elevation: 0 },
  title: { color: "#0f172a", fontSize: 16, fontWeight: "800" },
  meta: { color: "#64748b", fontSize: 12, marginTop: 6 },
});
