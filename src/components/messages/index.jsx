import { useSelector } from "react-redux";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import useConnections from "../../hooks/useConnections";
import useSocket from "../../hooks/useSocket";
import useChat from "../../hooks/useChat";

const Messages = () => {
  const { _id: userId, firstName } = useSelector((store) => store.user);

  const { conversations, selectedUser, setSelectedUser } =
    useConnections(userId);
  const { socketRef, onlineUsers } = useSocket(userId);
  const { messages, sendMessage } = useChat({
    socketRef,
    currentUserId: userId,
    currentUserName: firstName,
    selectedUser,
  });

  return (
    <div className="flex h-full w-full border border-base-300 rounded-lg overflow-hidden bg-base-100 shadow-xl">
      <div
        className={`
      w-full md:w-[320px] md:shrink-0 border-r border-base-300
      ${selectedUser ? "hidden md:block" : "block"}
    `}
      >
        <ChatSidebar
          conversations={conversations}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          onlineUsers={onlineUsers}
        />
      </div>
      <div
        className={`
      flex-1 flex flex-col h-full
      ${selectedUser ? "flex" : "hidden md:flex"}
    `}
      >
        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={sendMessage}
          onBack={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
};

export default Messages;
