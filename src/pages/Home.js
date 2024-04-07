import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const [EditorId, setEditorId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const createNewEditor = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setEditorId(id);
    toast.success("Created a new Editor");
  };

  const joinEditor = () => {
    if (!EditorId || !username || !email) {
      toast.error("Editor ID , username & email is required");
      return;
    }
    // Basic email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Redirect
    navigate(`/editor/${EditorId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinEditor();
    }
  };

  const testCode = () => {
    // Open a new tab with the specified URL
    window.open("http://localhost:3001", "_blank");
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <h4 className="mainLabel">Paste invitation editor ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Editor ID"
            onChange={(e) => setEditorId(e.target.value)}
            value={EditorId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onKeyUp={handleInputEnter}
          />
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <button className="btn joinBtn" onClick={joinEditor}>
              Join
            </button>
            <button className="btn jonBtn" onClick={testCode}>
              Test Code
            </button>
          </div>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewEditor} href="" className="createNewBtn">
              new Editor
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
