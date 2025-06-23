/**
 * The `useSocket` function sets up a WebSocket connection to a specified URL and listens for specific
 * events with corresponding callbacks.
 * @param callbacks - The `callbacks` parameter in the `useSocket` function is an object that contains
 * functions to handle specific socket events. The keys in the `callbacks` object correspond to the
 * event names, and the values are functions that will be called when those events are received from
 * the socket connection.
 */
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Post } from "../models/Post";

type Events = {
  "new-post": (post: Post) => void;
  "post-updated": (post: Post) => void;
};

const SOCKET_URL = "http://localhost:3001";

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
