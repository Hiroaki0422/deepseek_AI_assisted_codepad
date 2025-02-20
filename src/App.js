import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/Editor";
import ResponseBoard from "./components/ResponseBoard";
import Footer from "./components/Footer";
import MessageInput from "./components/MessageInput";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [aiResponse, setAiResponse] = useState("");

  const handleRunCode = async (code) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {
        query: code,
      });
      setAiResponse(response.data.response);
    } catch (error) {
      setAiResponse("Error fetching response from AI.");
    }
  };

  return (
    <div className="app-container" style={{ width: "100%" }}>
      <Navbar />
      <div
        className="main-container"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <CodeEditor onRunCode={handleRunCode} />
        <ResponseBoard response={aiResponse} />
      </div>
      <MessageInput />
      <Footer />
    </div>
  );
};

export default App;
