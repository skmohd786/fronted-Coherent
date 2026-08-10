import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { toUserId } = useParams();
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(() => {
    getUser();
  }, [toUserId]);

  useEffect(() => {
    if (!userId || !toUserId) return;

    const socket = createSocketConnection();

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      socket.emit("joinChat", {
        firstName,
        userId,
        toUserId,
      });
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      toUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const getUser = async () => {
    const res = await axios.get(BASE_URL + "/user/" + toUserId, {
      withCredentials: true,
    });
    setReceiver(res.data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] bg-gray-800 rounded-2xl shadow-xl flex flex-col">
      <div className="h-16 border-b border-gray-500 flex items-center px-6">
        <h2 className="text-xl font-bold">
          Chat with{" "}
          {receiver ? `${receiver.firstName} ${receiver.lastName}` : "receiver"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => {
          const isMyMessage = message.firstName === user?.firstName;

          return (
            <div
              key={index}
              className={isMyMessage ? "chat chat-end" : "chat chat-start"}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={isMyMessage ? user?.photoURL : receiver?.photoURL}
                  />
                </div>
              </div>

              <div className="chat-header">{message.firstName}</div>

              <div className="chat-bubble">{message.text}</div>
            </div>
          );
        })}
      </div>

      <div className="h-20 border-t border-gray-500 flex items-center gap-3 px-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input input-bordered flex-1 rounded-lg"
        />

        <button className="btn btn-primary rounded-lg" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
