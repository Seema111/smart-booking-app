/* eslint-disable no-undef */
import { useEffect, useState, useRef } from "react";
import chatEmpty from "../../assets/images/book2.jpg";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/setCookie";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Conversation,
  ConversationList,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "./style.scss";
import {
  getAllChatRoomMessages,
  getAllChatRooms,
  getAllChatUsers,
} from "../../services/http-request";
import { validateResponse } from "../../utils/validateResponse";

const chatSocketUrl = process.env.REACT_APP_CHAT_SOCKET_URL;

const ChatroomPage = () => {
  const token = getCookie("token");
  const [allUsers, setUsers] = useState([]);
  const allChatroomsRef = useRef([]);
  const allMessagesRef = useRef([]);
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [activeChat, setActiveChat] = useState({ index: "", uuid: "" });
  const [activeUser, setActiveUser] = useState({
    value: "",
    label: "",
  });
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    // Update the ref whenever allChatrooms state changes
    allChatroomsRef.current = allChatrooms;
  }, [allChatrooms]);

  useEffect(() => {
    // Update the ref whenever allChatrooms state changes
    allMessagesRef.current = allMessages;
  }, [allMessages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const socketUrl = `${chatSocketUrl}?${token}`;
      const ws = new WebSocket(socketUrl);

      ws.onopen = () => {
        console.log("Connected to WebSocket server");
      };

      ws.onmessage = (event) => {
        // Handle incoming messages from the server
        const objectData = JSON.parse(event.data);
        if (objectData) {
          const updatedChatrooms = [...allChatroomsRef.current];
          const finalIndex = updatedChatrooms.length > 0 ? activeChat.index : 0;
          if (
            objectData?.room_uuid &&
            !updatedChatrooms[finalIndex]?.uuid &&
            updatedChatrooms[finalIndex]
          ) {
            updatedChatrooms[finalIndex].uuid = objectData?.text;
          }
          if (updatedChatrooms[finalIndex]) {
            updatedChatrooms[finalIndex].last_message = objectData?.text;
            setAllChatrooms(updatedChatrooms);
          }
          setAllMessages([...allMessagesRef.current, objectData]);
        }
      };

      ws.onerror = (event) => {
        toast.error("WebSocket SOCKET ERROR", event.error);
      };

      ws.onclose = (event) => {
        toast.error("WebSocket connection closed:", event.code);
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    try {
      getAllChatUsers()
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data) {
            const allOptions = data.map((eachData) => ({
              value: eachData.username,
              label: `${eachData.first_name + eachData.last_name + " ("}${eachData.username + ")"}`,
            }));
            setUsers(allOptions);
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    try {
      getAllChatRooms()
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data) {
            setActiveChat({ index: 0, uuid: data[0]?.uuid });
            setActiveUser({ value: data[0]?.name, labe: data[0]?.name });
            setAllChatrooms(data);
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);

  const sendMessage = () => {
    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        // Check if WebSocket connection is open
        const stringData = { text: message };
        const jsonData = activeChat.uuid
          ? { ...stringData, room_uuid: activeChat.uuid }
          : { ...stringData, user: activeUser.value };
        socket.send(JSON.stringify(jsonData));
        setMessage(""); // Clear message input
      } else {
        console.log("WebSocket connection not established");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message");
    }
  };

  useEffect(() => {
    if (activeChat.uuid) {
      try {
        getAllChatRoomMessages(activeChat.uuid)
          .then(function (res) {
            validateResponse(res);
            return res.json();
          })
          .then(function (data) {
            if (data.results) {
              setAllMessages(data.results);
            } else {
              toast.error(JSON.stringify(data));
            }
          });
      } catch (error) {
        console.error("Error:", error);
        toast.error(JSON.stringify(error));
      }
    }
  }, [activeChat.uuid]);

  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption, "data");
    setActiveUser(selectedOption);
    const addNewData = {
      uuid: "",
      name: selectedOption.value,
      image: "",
      last_message: "",
    };

    setAllChatrooms((prevItems) => [addNewData, ...prevItems]);
    setActiveChat({ index: 0, uuid: "" });
    setAllMessages([]);
  };

  const NoMessage = () => (
    <div className="no-message-div d-flex-column align-items-center justify-content-center">
      <img
        className="card-img-top m-0"
        loading="lazy"
        src={chatEmpty}
        height={250}
        alt=""
      />
      <p className="text-center">No Messages Found</p>
    </div>
  );

  return (
    <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center justify-content-center chat-container">
      <div className="col-8 chat-column">
        <MainContainer className="main-chat-container">
          <div
            style={{
              height: "70vh",
              width: "30%",
              borderRight: "1px solid lightgrey",
            }}
          >
            <div
              className="p-4 border-bottom"
              style={{
                height: "6vh",
              }}
            >
              <h5>My Conversations</h5>
            </div>
            <div className="p-4 border-bottom">
              <Select
                isSearchable
                onChange={handleSelectChange}
                options={allUsers}
              />
            </div>
            <ConversationList style={{ height: "52vh", overflow: "auto" }}>
              {allChatrooms.length > 0 ? (
                <>
                  {allChatrooms.map((eachRoom, index) => (
                    <Conversation
                      key={eachRoom.uuid}
                      name={eachRoom.name}
                      active={activeChat.index === index}
                      info={eachRoom.last_message}
                      onClick={() => {
                        setActiveChat({ index, uuid: eachRoom.uuid });
                        setActiveUser({
                          value: eachRoom.name,
                          label: eachRoom.name,
                        });
                      }}
                    >
                      <Avatar
                        name={eachRoom.name}
                        src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                      />
                    </Conversation>
                  ))}
                </>
              ) : (
                <NoMessage />
              )}
            </ConversationList>
          </div>
          <div
            style={{
              height: "70vh",
              width: "70%",
            }}
          >
            <div
              className="p-4 border-bottom"
              style={{
                height: "6vh",
              }}
            >
              <h5>Conversations with {activeUser?.value || "user"}</h5>
            </div>
            <ChatContainer
              style={{
                height: "64vh",
              }}
            >
              <MessageList>
                {allMessages.length > 0
                  ? allMessages.map((eachMessage) => (
                      <Message
                        key={eachMessage?.uuid}
                        model={{
                          message: String(eachMessage?.text),
                          sentTime: "15 mins ago",
                          sender: eachMessage?.user?.username,
                          direction: eachMessage?.self_message
                            ? "outgoing"
                            : "incoming",
                          position: "normal",
                        }}
                      />
                    ))
                  : ""}
              </MessageList>
              <MessageInput
                className="p-4"
                value={message}
                onChange={(value) => setMessage(value)}
                placeholder="Type message here"
                onSend={sendMessage}
              />
            </ChatContainer>
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatroomPage;
