import React, { useState, useEffect } from "react";
import "./Chat.css";

import Box from "@mui/material/Box";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "botuser";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const rasaAPI = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({ sender: name, message: msg }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          const temp = response[0];
          const recipient_id = temp["recipient_id"];
          const combinedResponse = response.map((res) => res.text).join("\n");

          const response_temp = {
            sender: "bot",
            recipient_id: recipient_id,
            msg: combinedResponse,
          };
          setbotTyping(false);

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  console.log(chat);

  const styleBody = {
    paddingTop: "10px",
    height: "26rem",
    overflowY: "a",
    overflowX: "hidden",
  };

  return (
    <div className="main">
      <div className="nav">
        <Box sx={{ width: "100%", bgcolor: "#53A57D" }}>
          <p>
            <h3> Disclaimer: </h3>
            HealthBot is designed to provide diagnostic suggestions, but you
            should not rely on the information provided as a substitute for
            professional advice. Please be aware that the chatbot is an
            automated system, and it may not always provide 100% accurate
            information.
          </p>
        </Box>
      </div>
      <div className="bot">
        <div className="head">
          <div className="boticon">
            <SmartToyIcon sx={{ fontSize: 45 }} />
          </div>
          <h1>HealthBot</h1>
          {botTyping ? <h6>Bot Typing....</h6> : ""}
        </div>

        <div className="cardBody" id="messageArea" style={styleBody}>
          <div className="row msgarea">
            {chat.map((user, key) => (
              <div key={key}>
                {user.sender === "bot" ? (
                  <div
                    className="msgalignstart"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <SmartToyIcon  style={{ background: "#53A57D" , color: "#fff", fontSize: 35, borderRadius: '50%'}} />
                    <p className="botmsg">{user.msg}</p>
                  </div>
                ) : (
                  <div className="msgalignend">
                    <p className="usermsg">{user.msg}</p>
                    <Avatar style={{ background: "#53A57D" , fontSize: 30}} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="message">
          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <div className="input">
              <input
                onChange={(e) => setInputMessage(e.target.value)}
                value={inputMessage}
                type="text"
                className="msginp"
              ></input>
            </div>

            <div className="out">
              <button className="btn" type="submit">
                Send
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
