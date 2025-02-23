import React from "react";

const ResponseBoard = ({ response }) => {
  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mb-2">AI Assistant Response</h2>
      </div>
      <div className="w-1/2 h-full p-4 bg-gray-900 text-white overflow-auto" style={{width:"45vw", height:"70vh", overflowY: "scroll"}}>
        <pre style={{overflowY: "scroll"}} className="bg-gray-800 p-4 rounded">{response || "No response yet..."}</pre>
      </div>
    </div>
  );
};

export default ResponseBoard;
