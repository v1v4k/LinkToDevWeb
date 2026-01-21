import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { createSocketConnection } from "../../utils/socket"; 
import { BASE_URL } from "../../utils/constants"; 

const Messages = () => {

  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [conversations, setConversations] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
        setConversations(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchConnections();
  }, [user]);

  // Handle Selection (Fetch msgs + Join Socket) 
  useEffect(() => {
    if (!selectedUser) return;

    // Fetch history
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/chat/${selectedUser._id}`, { withCredentials: true });
        console.log(res.data.messages)
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    // Join socket
    if (!socketRef.current) {
        socketRef.current = createSocketConnection();
    }
    
    // Join the specific room
    socketRef.current.emit("joinChat", { 
        userId: user._id, 
        targetUserId: selectedUser._id 
    });

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      
        setMessages((prev) => [...prev, newMessage]);
    };
    socketRef.current.on("messageReceived", handleNewMessage);

    return () => {
        socketRef.current.off("messageReceived", handleNewMessage);
    };
  }, [selectedUser, user]);

  //  Send Message 
  const handleSendMessage = (text) => {
    if (!socketRef.current) return;

    // Emit to backend
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId: selectedUser._id,
      text: text,
    });

    //  Update to Show it immediately
    setMessages((prev) => [...prev, {
        text: text,
        senderId: user._id,
        createdAt: new Date().toISOString()
    }]);
  };

  //  Disconnect on Unmount
  useEffect(() => {
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex h-full w-full border border-base-300 rounded-lg overflow-hidden bg-base-100 shadow-xl">
      <div className="w-1/3 border-r border-base-300">
        <ChatSidebar 
            conversations={conversations} 
            selectedUser={selectedUser} 
            onSelectUser={setSelectedUser} 
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