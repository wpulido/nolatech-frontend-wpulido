import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Post } from "../models/Post";

type Events = {
  "new-post": (post: Post) => void;
  "post-updated": (post: Post) => void;
};

const SOCKET_URL = "http://localhost:3001"; // Cambia según tu backend o mock

export function useSocket(callbacks: Partial<Events>) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    if (callbacks["new-post"]) socket.on("new-post", callbacks["new-post"]);
    if (callbacks["post-updated"]) socket.on("post-updated", callbacks["post-updated"]);

    return () => {
      socket.disconnect();
    };
  }, [callbacks]);
}
