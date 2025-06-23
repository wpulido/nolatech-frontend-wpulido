import type { Post } from "../models/Post";

const STORAGE_KEY = "posts";

export function getPosts(): Post[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function addPost(post: Post): void {
  const posts = getPosts();
  posts.push(post);
  savePosts(posts);
}

export function updatePost(updatedPost: Post): void {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    savePosts(posts);
  }
}
