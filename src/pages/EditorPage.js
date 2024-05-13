import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import Chat from "../components/Chat";
import ChatAI from "../components/ChatWithAI";
import FileUpload from "../components/FileUpload";
import { initSocket } from "../socket";
import BottomNavigation from "../components/BottomNavigation";
import "../App.css";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("Chat");
  const [selectedTab, setSelectedTab] = useState("chat");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };
  const toggleEditorFullScreen = () => {
    setIsEditorFullScreen(!isEditorFullScreen);
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`mainWrap ${isEditorFullScreen ? "fullscreen" : ""}`}>
      <div
        className="aside"
        style={{
          display: isEditorFullScreen ? "none" : "block",
        }}
      >
        <div className="asideInner">
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy Editor ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div
        className={`editorWrap scrollable-content middle-column ${
          isEditorFullScreen ? "fullscreen" : ""
        }`}
      >
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
        <button className="fullscreen-btn" onClick={toggleEditorFullScreen}>
          {isEditorFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
      <div
        style={{
          display: isEditorFullScreen ? "none" : "block",
        }}
      >
        <div style={{ height: "50vh" }}>
          <div style={{ display: selectedTab === "chat" ? "block" : "none" }}>
            <Chat socketRef={socketRef} username={location.state?.username} />
          </div>
          <div
            style={{ display: selectedTab === "fileUpload" ? "block" : "none" }}
          >
            <FileUpload socket={socketRef} />
          </div>
          <div
            style={{ display: selectedTab === "chatwithai" ? "block" : "none" }}
          >
            <ChatAI socketRef={socketRef} username={location.state?.username} />
          </div>
          <BottomNavigation
            onSelectTab={handleTabChange}
            selectedTab={selectedTab}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
