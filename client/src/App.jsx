import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data.js";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleUser = (e) => {
    setUser(username);
  };

  return (
    <div className={user ? "container" : "containerLogin"}>
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card post={post} key={post.id} socket={socket} user={user} />
          ))}
          <div className="username">{user}</div>
        </>
      ) : (
        <div className="login">
          <form action="" onSubmit={handleUser}>
            <input
              type="text"
              placeholder="username"
              onChange={handleUsername}
            />
          </form>
          <button type="submit" onClick={handleUser}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
