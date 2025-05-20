import ChatAI from "../../../../../../components/chat/ChatAI";

const ChatPage = () => {
  return (
    <div className="w-full">
      <div
        className="border border-gray-200 bg-white shadow-none w-full rounded-md p-6"
        style={{
          boxShadow: "none",
        }}
      >
        <ChatAI />
      </div>
    </div>
  );
};

export default ChatPage;
