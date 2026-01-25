import { useSelector } from "react-redux";

const ChatBubble = ({ message }) => {
  console.log("from bubble:", message);
  const user = useSelector((store) => store.user);

  const isMe = message?.firstName === user?.firstName;

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header mb-1">
        <span className="text-xs font-bold opacity-70 mr-2">
          {isMe ? user?.firstName : message?.firstName}
        </span>
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div
        className={`chat-bubble ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
      >
        {message.text}
      </div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};

export default ChatBubble;
