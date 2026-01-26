import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { createSocketConnection } from "../../utils/socket";
import { BASE_URL } from "../../utils/constants";

const Messages = () => {
  const { _id: userId, firstName } = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        setConversations(res?.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) fetchConnections();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // Join socket
    if (!socketRef.current) {
      socketRef.current = createSocketConnection(userId);
      //console.log(socketRef.current);
    }

    socketRef.current.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("getOnlineUsers");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId]);

  // Handle Selection (Fetch msgs )
  useEffect(() => {
    if (!selectedUser || !socketRef.current) return;

    // Fetch history
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/chat/${selectedUser._id}`, {
          withCredentials: true,
        });

        const chatMessages = res?.data?.messages.map((msg) => {
          return { firstName: msg?.senderId?.firstName, text: msg?.text };
        });

        // console.log(chatMessages);
        setMessages(chatMessages || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    // Join the specific room
    socketRef.current.emit("joinChat", {
      userId,
      firstName,
      targetUserId: selectedUser._id,
    });

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      //console.log("New Msg:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };

    socketRef.current.on("messageReceived", handleNewMessage);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("messageReceived", handleNewMessage);
      }
    };
  }, [selectedUser, userId, firstName]);

  //  Send Message
  const handleSendMessage = (text) => {
    if (!socketRef.current) return;

    // Emit to backend
    socketRef.current.emit("sendMessage", {
      firstName,
      userId,
      targetUserId: selectedUser._id,
      text,
    });
  };

  return (
    <div className="flex h-full w-full border border-base-300 rounded-lg overflow-hidden bg-base-100 shadow-xl">
      <div className="w-1/3 border-r border-base-300">
        <ChatSidebar
          conversations={conversations}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          onlineUsers={onlineUsers}
        />
      </div>
      <div className="flex-1 flex flex-col h-full">
        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};



export default Messages;
