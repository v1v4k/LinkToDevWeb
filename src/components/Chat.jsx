import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const {  _id: targetUserId } = useParams();
  const {  _id : userId, firstName } = useSelector((Store) => Store?.user);



  const [messages, setMessages] = useState("Hello... This is Vivek");

  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetUserId });

    return () => {
      socket.disconnect();
    };
  });

  return (
    <div className="w-1/2 h-[70vh] mx-auto flex flex-col items-center my-2 border-2 border-teal-200">
      <h1 className="border-b-2 border-teal-200 w-full flex justify-center text-3xl text-white">
        chat
      </h1>
      <div className="w-full flex-grow m-1 p-1">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            {firstName}
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{messages}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            vikram
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">How are you boss</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      <div className="w-full flex p-2 m-2">
        <input
          type="text"
          placeholder="message here"
          className="m-1 p-2 flex-grow rounded-md"
        />
        <button className="btn btn-secondary">send</button>
      </div>
    </div>
  );
};

export default Chat;
