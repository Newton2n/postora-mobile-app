import { Post, PostInput, User } from "./types";

const demoUser: User = {
  id: "demo-user",
  name: "Maya Chen",
  email: "maya@example.com",
  bio: "Collecting small moments and sharing them with the Postora community.",
  avatarUrl: "https://i.pravatar.cc/160?img=47",
};

let posts: Post[] = [
  {
    id: "post-sunrise",
    title: "Quiet morning light",
    content: "A soft start to the day, captured before the city woke up.",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
    authorId: demoUser.id,
    authorName: demoUser.name,
    createdAt: "Today",
    likes: 42,
  },
  {
    id: "post-coast",
    title: "A walk by the coast",
    content: "The best ideas arrive when there is room to wander.",
    imageUrl: "https://images.unsplash.com/photo-1507521248579-2b55f5a6e6c1?w=900",
    authorId: demoUser.id,
    authorName: demoUser.name,
    createdAt: "Yesterday",
    likes: 28,
  },
  {
    id: "post-studio",
    title: "A corner for making",
    content: "Keeping the tools close and the distractions far away.",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900",
    authorId: demoUser.id,
    authorName: demoUser.name,
    createdAt: "2 days ago",
    likes: 19,
  },
];

const wait = async () => new Promise((resolve) => setTimeout(resolve, 120));

export const repository = {
  async getCurrentUser() {
    await wait();
    return demoUser;
  },
  async signIn(email: string) {
    await wait();
    return { ...demoUser, email: email.trim() || demoUser.email };
  },
  async signUp(name: string, email: string) {
    await wait();
    return { ...demoUser, name: name.trim() || demoUser.name, email: email.trim() || demoUser.email };
  },
  async listPosts() {
    await wait();
    return [...posts];
  },
  async getPost(id: string) {
    await wait();
    return posts.find((post) => post.id === id) ?? null;
  },
  async listUserPosts(userId: string) {
    await wait();
    return posts.filter((post) => post.authorId === userId);
  },
  async createPost(input: PostInput, author: User) {
    await wait();
    const post: Post = {
      ...input,
      id: `post-${Date.now()}`,
      authorId: author.id,
      authorName: author.name,
      createdAt: "Just now",
      likes: 0,
    };
    posts = [post, ...posts];
    return post;
  },
  async updatePost(id: string, input: PostInput) {
    await wait();
    posts = posts.map((post) => (post.id === id ? { ...post, ...input } : post));
    return posts.find((post) => post.id === id) ?? null;
  },
  async deletePost(id: string) {
    await wait();
    posts = posts.filter((post) => post.id !== id);
  },
};
