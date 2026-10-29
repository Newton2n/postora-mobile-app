import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostEditor from "@/components/PostEditor";
import { repository } from "@/lib/mock-repository";
import { Post } from "@/lib/types";

export default function EditPostScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => { if (postId) repository.getPost(postId).then(setPost); }, [postId]);
  if (!post) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator color="#2563eb" /></View>;
  return <PostEditor post={post} />;
}
