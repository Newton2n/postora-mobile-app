import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { repository } from "@/lib/mock-repository";
import { Post } from "@/lib/types";
import { RootState } from "@/store/store";
import ScreenContainer from "@/components/ui/ScreenContainer";

export default function PostEditor({ post }: { post?: Post }) {
  const user = useSelector((state: RootState) => state.auth.userData);
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user]);

  const save = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing details", "Add a title and description before saving.");
      return;
    }
    if (!user) return;
    setSaving(true);
    try {
      const input = { title: title.trim(), content: content.trim(), imageUrl: imageUrl.trim() || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900" };
      const saved = post ? await repository.updatePost(post.id, input) : await repository.createPost(input, user);
      if (saved) router.replace(`/post/${saved.id}`);
    } finally {
      setSaving(false);
    }
  };

  return <ScreenContainer scroll keyboard edges={["left", "right", "bottom"]} contentStyle={styles.container}>
    <Text style={styles.heading}>{post ? "Edit post" : "Create a post"}</Text>
    <Text style={styles.label}>Title</Text>
    <TextInput value={title} onChangeText={setTitle} placeholder="Give your post a title" style={styles.input} maxLength={70} />
    <Text style={styles.label}>Description</Text>
    <TextInput value={content} onChangeText={setContent} placeholder="What would you like to share?" style={[styles.input, styles.multiline]} multiline maxLength={355} />
    <Text style={styles.label}>Image URL</Text>
    <TextInput value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." autoCapitalize="none" style={styles.input} />
    <Pressable onPress={save} disabled={saving} style={styles.button}><Text style={styles.buttonText}>{saving ? "Saving..." : "Save post"}</Text></Pressable>
  </ScreenContainer>;
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { color: "#0f172a", fontSize: 28, fontWeight: "800", marginBottom: 24 },
  label: { color: "#334155", fontWeight: "800", marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: "#fff", borderColor: "#cbd5e1", borderWidth: 1, borderRadius: 10, padding: 13, color: "#0f172a" },
  multiline: { minHeight: 130, textAlignVertical: "top" },
  button: { backgroundColor: "#2563eb", borderRadius: 10, padding: 15, alignItems: "center", marginTop: 24 },
  buttonText: { color: "#fff", fontWeight: "800" },
});
