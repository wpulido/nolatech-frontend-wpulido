import { useEffect, useState, useMemo } from "react";
import type { Post } from "../../models/Post";
import { getPosts } from "../../services/postService";
import { Filters } from "../Filters/Filters";
import { addPost, updatePost } from "../../services/postService";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
import { useSocket } from "../../hooks/useSocket";
import { Suspense, lazy } from "react";
const PostFormModal = lazy(() => import("../PostFormModal/PostFormModal"));

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();

  useEffect(() => {
    const allPosts = getPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
  }, []);

  useEffect(() => {
    let result = posts;
    if (selectedAuthor) {
      result = result.filter((p) => p.author === selectedAuthor);
    }
    if (selectedStatus) {
      result = result.filter((p) => p.status === selectedStatus);
    }
    setFilteredPosts(result);
  }, [selectedAuthor, selectedStatus, posts]);

  const authors = Array.from(new Set(posts.map((p) => p.author)));
  const statuses = Array.from(new Set(posts.map((p) => p.status)));

  const openNewPostModal = () => {
    setSelectedPost(undefined);
    setModalOpened(true);
  };

  /**
   * The `handleSavePost` function updates or adds a post to a list of posts and emits socket events
   * accordingly.
   * @param {Post} post - A post object that contains information about a post, such as its id, title,
   * content, author, etc.
   */
  const handleSavePost = (post: Post) => {
    const exists = posts.find((p) => p.id === post.id);
    let updatedPosts: Post[];

    if (exists) {
      updatePost(post);
      socket.emit("post-updated", post);
      updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    } else {
      addPost(post);
      socket.emit("new-post", post);
      updatedPosts = [...posts, post];
    }

    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  /* The `socketHandlers` constant is using the `useMemo` hook to memoize an object containing event
  handlers for socket events. These event handlers are for handling the "new-post" and
  "post-updated" events received from the socket connection. */
  const socketHandlers = useMemo(
    () => ({
      "new-post": (post: Post) => {
        setPosts((prev) => [...prev, post]);
        setFilteredPosts((prev) => [...prev, post]);
      },
      "post-updated": (post: Post) => {
        setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
        setFilteredPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
      },
    }),
    []
  );

  useSocket(socketHandlers);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <Filters
          authors={authors}
          statuses={statuses}
          selectedAuthor={selectedAuthor}
          selectedStatus={selectedStatus}
          onFilterChange={(author, status) => {
            setSelectedAuthor(author);
            setSelectedStatus(status);
          }}
        />

        <button onClick={openNewPostModal} className="bg-blue-500 w-full md:w-auto mt-3 md:mt-auto hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          Agregar publicación
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-[#232323] rounded shadow cursor-pointer hover:bg-gray-50 transition"
            onClick={() => {
              setSelectedPost(post);
              setModalOpened(true);
            }}
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.body}</p>
            <div className="text-sm text-gray-600">
              Autor: {post.author} — Estado: {post.status}
            </div>
          </div>
        ))}
      </div>

      <Suspense fallback={null}>
        <PostFormModal opened={modalOpened} onClose={() => setModalOpened(false)} onSubmit={handleSavePost} initialValues={selectedPost} />
      </Suspense>
    </div>
  );
}
