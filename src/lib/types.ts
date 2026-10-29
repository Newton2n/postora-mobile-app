export type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
};

export type PostInput = Pick<Post, "title" | "content" | "imageUrl">;
