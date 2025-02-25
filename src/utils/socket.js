import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => (location.hostname === "localhost") ?  io(BASE_URL) :  io("/", {path: "/api/socket.io"});

