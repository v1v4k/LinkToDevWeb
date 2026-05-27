import { useEffect, useState } from "react";
import { getChatHistory } from "../services/chatApi";

const useChat = ({
  socketRef,
  currentUserId,
  currentUserName,
  selectedUser,
}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedUser || !socketRef.current) return;

    const socket = socketRef.current;

    // Fetch chat history
    const fetchMessages = async () => {
      try {
        const res = await getChatHistory(selectedUser._id);
        const chatMessages = res.data.messages.map((msg) => ({
          firstName: msg?.senderId?.firstName,
          text: msg?.text,
          textedAt: msg?.createdAt,
        }));
        setMessages(chatMessages || []);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };
    fetchMessages();

    // Join the specific room
    socket.emit("joinChat", {
      userId: currentUserId,
      firstName: currentUserName,
      targetUserId: selectedUser._id,
    });

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };
    socket.on("messageReceived", handleNewMessage);

    return () => {
      if (socket) {
        socket.off("messageReceived", handleNewMessage);
      }
    };
  }, [selectedUser, currentUserId, currentUserName, socketRef]);

  const sendMessage = (text) => {
    if (!socketRef.current || !selectedUser) return;
    socketRef.current.emit("sendMessage", {
      firstName: currentUserName,
      userId: currentUserId,
      targetUserId: selectedUser._id,
      text,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
