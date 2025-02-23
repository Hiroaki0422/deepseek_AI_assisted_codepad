import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ onRunCode }) => {
  const [code, setCode] = useState("// Write your code here...");

  const handleRun = () => {
    onRunCode(code);
  };

  return (
    <div className="editor-container" style={{ width: "50%" }}>
      <h2>Code Editor</h2>
      <Editor
        width="100%"
        height="70vh"
        defaultLanguage="python"
        defaultValue={code}
        theme="vs-dark"
        onChange={(newValue) => setCode(newValue)}
      />
      <button onClick={handleRun} className="run-btn">
        Run Code
      </button>
    </div>
  );
};

export default CodeEditor;
