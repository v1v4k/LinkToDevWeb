const ChatSidebar = ({
  conversations,
  onlineUsers,
  selectedUser,
  onSelectUser,
}) => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="p-4 border-b border-base-300 font-bold text-lg ">
        Connections({conversations?.length})
      </div>
      <div className="overflow-y-auto flex-1 bg-base-200">
        {conversations.length === 0 && (
          <div className="h-full text-center flex justify-center items-center p-4 text-gray-500 text-sm">
            No connections yet.
            <br />
            Go make some friends!
          </div>
        )}

        {conversations.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          //console.log(isOnline)
          return (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-base-300 border-l-4 border-primary"
                  : ""
              }`}
            >
              <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoUrl} alt={user.firstName} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-700 truncate capitalize">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  Click to start chatting
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
