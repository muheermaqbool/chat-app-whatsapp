import { Avatar, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import "./Chats.css";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
  Mic,
  Dataset,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import db from "./Firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "./Stateprovider";

function Chats() {
  let [seed, setseed] = useState("");
  let [input, setinput] = useState("");
  let { roomId } = useParams();
  let [roomName, setroomName] = useState("");
  let [messages, setmessages] = useState([]);
  let [emoji, setemoji] = useState(false);
  let [emojicharacter, setemojicharacter] = useState([]);
  let [emojichat, setemojichat] = useState(false);
  let [filteredEmoji, setFilteredEmoji] = useState([]);
  let [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshote) =>
          setmessages(snapshote.docs.map((doc) => doc.data()))
        );
    }

    setseed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  let sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?access_key=35cfe4917a648d8b4ac2b9301ee4f2d0527754d6"
    )
      .then((resp) => resp.json())
      .then((data) => {
        setemojicharacter(data);
        setFilteredEmoji(data);
      });
  }, []);

  function filterEmoji(val) {
    let filtterdEmoji = emojicharacter.filter((imogies) => {
      return imogies.slug.includes(val);
    });
    setFilteredEmoji(filtterdEmoji);
  }

  let SearchEmoji = (e) => {
    filterEmoji(e.target.value);
  };

  let ListnEmoji = () => {
    setemoji(!emoji);
    setemojichat(!emojichat);
  };

  let addValueOfEmoji = (e) => {
    setinput((pre) => pre + e.target.innerHTML);
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat_headerinfo">
          <h3>{roomName}</h3>
          <p>
            lastseen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p key={message.timestamp}
            className={`chat_message ${
              message.name === user.displayName && "chat_reciver"
            }`}
          >
            {" "}
            <span className="chat_name">{message.name}</span>
            <span className="chat_message_reciver_">{message.message}</span>
            <span className="time_span">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>{" "}
          </p>
        ))}
      </div>
      {emojichat === true ? (
        <div className={emoji === true ? `emojilistner` : null}>
          <input
            type="text"
            className="inputemoji"
            placeholder="search emoji"
            onChange={SearchEmoji}
          ></input>{" "}
          <div className="emojocharacter">
            {filteredEmoji.map((emojis) => (
              <div className="emojicharacterfaces" onClick={addValueOfEmoji} key={emoji.codePoint} >
                {emojis.character}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="chat_footer">
        <InsertEmoticon onClick={ListnEmoji} />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            autoComplete="off"
            required
            minLength={1}
          ></input>
          <button type="submit"> send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chats;
