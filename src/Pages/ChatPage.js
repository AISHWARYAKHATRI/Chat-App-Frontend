import React, { useEffect } from "react";
import axios from "axios";
const ChatPage = () => {
  useEffect(() => {
    fethChats();
  }, []);

  const fethChats = async () => {
    const data = await axios.get("/api/chat");
    console.log(data);
  };
  return <div>ChatPage</div>;
};

export default ChatPage;
