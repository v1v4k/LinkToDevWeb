import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { toUserId: targetUserId } = useParams();
  const { _id: userId, firstName } = useSelector((Store) => Store?.user);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    //console.log(chat.data.messages[0].senderId.firstName)

    const chatMessages = chat?.data?.messages.map((msg) => {
      return { firstName: msg?.senderId?.firstName, text: msg?.text };
    });
    //console.log(chatMessages)
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, firstName, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      //console.log(`${firstName} , ${text}`);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 h-[70vh] mx-auto flex flex-col items-center my-2 border-4 bg-primary rounded-lg">
      <h1 className="border-b-2 w-full flex justify-center text-2xl font-bold">
        chat
      </h1>
      <div className="w-full flex-grow m-1 p-1 overflow-scroll bg-white">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex p-2 m-2">
        <input
          value={newMessage}
          type="text"
          placeholder="message here"
          className="m-1 p-2 flex-grow rounded-md"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleSendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
