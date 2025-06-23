import type { Post } from "../models/Post";

const STORAGE_KEY = "posts";

/**
 * The function `getPosts` retrieves posts from local storage and returns them as an array of `Post`
 * objects.
 * @returns An array of Post objects is being returned.
 */
export function getPosts(): Post[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * The function `savePosts` saves an array of `Post` objects to the local storage after converting them
 * to a JSON string.
 * @param {Post[]} posts - An array of Post objects that you want to save to the local storage.
 */
export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/**
 * The function `addPost` adds a new post to an existing list of posts and saves the updated list.
 * @param {Post} post - The `post` parameter in the `addPost` function is of type `Post`, which means
 * it is expected to be an object that represents a post. This object likely contains properties such
 * as `title`, `content`, `author`, `date`, etc., depending on the structure of your `
 */
export function addPost(post: Post): void {
  const posts = getPosts();
  posts.push(post);
  savePosts(posts);
}

/**
 * The function `updatePost` updates a post in a list of posts if the post with the same id exists.
 * @param {Post} updatedPost - The `updatedPost` parameter is an object of type `Post` that represents
 * the post that needs to be updated. It likely contains properties such as `id`, `title`, `content`,
 * `author`, etc. The `updatePost` function takes this updated post object and updates the
 * corresponding post
 */
export function updatePost(updatedPost: Post): void {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    savePosts(posts);
  }
}
