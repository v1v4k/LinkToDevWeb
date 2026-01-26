import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = (userId) =>
  (location.hostname === "localhost")
    ? io(BASE_URL, {
        query: {
          userId,
        },
      })
    : io("/", {
        path: "/api/socket.io",
        query: {
          userId,
        },
      });
