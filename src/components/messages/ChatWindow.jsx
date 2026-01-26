import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import PropTypes from "prop-types";

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  //console.log(messages)
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (!selectedUser) {
    return (
      <div className="flex h-full items-center justify-center font-bold text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-base-200 p-4 border-b border-base-300 font-bold flex gap-2 items-center">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={selectedUser.photoUrl} alt="avatar" />
          </div>
        </div>
        <span>
          {selectedUser.firstName} {selectedUser.lastName}
        </span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
        {messages &&
          messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div>
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

ChatWindow.propTypes = {
  selectedUser: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      firstName: PropTypes.string,
    })
  ),
  onSendMessage: PropTypes.func.isRequired,
}; 
export default ChatWindow;


