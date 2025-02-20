import React, { useState } from "react";
import axios from "axios";

const MessageInput = ({ onMessageSent }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {
        query: message,
      });

      onMessageSent(response.data.response); // Send response to parent component
    } catch (error) {
      onMessageSent("Error: Unable to fetch AI response.");
    } finally {
      setLoading(false);
      setMessage(""); // Clear the textbox
    }
  };

  return (
    <div className="p-4 flex" style={{ height: "20vh", width: "100%" }}>
      <input
        type="text"
        className="w-full p-2 border rounded text-black"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
        style={{ height: "80%", width: "100%" }}
      />
      <button
        onClick={sendMessage}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default MessageInput;
