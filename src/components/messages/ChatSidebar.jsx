import PropTypes from "prop-types";

const ChatSidebar = ({
  conversations,
  onlineUsers,
  selectedUser,
  onSelectUser,
}) => (
  <div className="w-full flex flex-col h-full bg-base-200">
    <div className="p-4 border-b border-base-300 shrink-0">
      <h2 className="font-bold text-base text-base-content">
        Connections
        <span className="text-base-content/40 font-medium ml-1">
          ({conversations?.length || 0})
        </span>
      </h2>
    </div>
    <div className="overflow-y-auto flex-1">
      {conversations.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center p-4 text-center gap-2">
          <p className="text-sm font-semibold text-base-content/50">
            No connections yet
          </p>
          <p className="text-xs text-base-content/30">Go make some friends!</p>
        </div>
      ) : (
        conversations.map((user) => {
          const isOnline = onlineUsers?.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer 
                transition-colors border-l-2
                ${
                  isSelected
                    ? "bg-base-300 border-l-primary"
                    : "border-l-transparent hover:bg-base-300/50"
                }`}
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-base-300">
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-200 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate capitalize text-base-content">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-xs text-base-content/40 truncate">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);

ChatSidebar.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      photoUrl: PropTypes.string,
    }),
  ).isRequired,
  selectedUser: PropTypes.object,
  onSelectUser: PropTypes.func.isRequired,
  onlineUsers: PropTypes.array,
};

export default ChatSidebar;
