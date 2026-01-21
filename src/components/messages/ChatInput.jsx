import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full flex items-center p-4 border-t border-gray-200">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="input input-bordered flex-1 rounded-lg mr-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        className="btn btn-primary rounded-lg" 
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;