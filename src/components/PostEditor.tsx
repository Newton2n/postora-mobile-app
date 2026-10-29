import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput } from "react-native";
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

  return <ScreenContainer scroll keyboard edges={["left", "right", "bottom"]}>
    <Text className="mb-6 text-3xl font-extrabold text-ink dark:text-white">{post ? "Edit post" : "Create a post"}</Text>
    <Text className="mb-2 mt-4 font-extrabold text-slate-700 dark:text-slate-300">Title</Text>
    <TextInput value={title} onChangeText={setTitle} placeholder="Give your post a title" placeholderTextColor="#94a3b8" className="rounded-xl border border-slate-300 bg-white p-3.5 text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white" maxLength={70} />
    <Text className="mb-2 mt-4 font-extrabold text-slate-700 dark:text-slate-300">Description</Text>
    <TextInput value={content} onChangeText={setContent} placeholder="What would you like to share?" placeholderTextColor="#94a3b8" className="min-h-32 rounded-xl border border-slate-300 bg-white p-3.5 text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white" multiline maxLength={355} />
    <Text className="mb-2 mt-4 font-extrabold text-slate-700 dark:text-slate-300">Image URL</Text>
    <TextInput value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." placeholderTextColor="#94a3b8" autoCapitalize="none" className="rounded-xl border border-slate-300 bg-white p-3.5 text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
    <Pressable onPress={save} disabled={saving} className="mt-6 items-center rounded-xl bg-brand p-4 active:opacity-80"><Text className="font-extrabold text-white">{saving ? "Saving..." : "Save post"}</Text></Pressable>
  </ScreenContainer>;
}
