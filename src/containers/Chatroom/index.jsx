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

/**
 * @description Is responsible for rendering the chat room page, including displaying
 * a list of all conversations and messages within them, as well as an input field
 * to compose new messages and send buttons. It fetches user data from an API and
 * displays it in a select menu, and handles sending messages via WebSocket connection.
 * 
 * @returns { object } a React component that displays a chat room interface with
 * conversations and message input.
 */
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
    /**
     * @description Establishes a WebSocket connection to the server and listens for
     * messages from the server. It handles incoming messages, updates the chatrooms state
     * and saves them to the component state.
     */
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
            /**
             * @description Combines `eachData` values to form a new object with `value` and
             * `label`. The `value` is an attribute of each `data` item, while the `label` is
             * constructed by concatenating the `first_name`, `last_name`, and `username` attributes.
             * 
             * @param { object } eachData - username, first name, last name, and username of a
             * user, which are then used to create a custom label for each user.
             * 
             * @returns { object } an object with `value` and `label` properties, where `value`
             * contains the username and `label` is a custom string created by concatenating the
             * person's first name, last name, and username.
             */
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

  /**
   * @description Sends a message via WebSocket connection. It takes the message to be
   * sent as an argument, and if the connection is open, it serializes the message into
   * JSON format and sends it through the connection. If the connection is not established,
   * it logs an error message to the console and displays an error toast.
   */
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

  /**
   * @description Updates active user data and adds a new item to the all chatrooms
   * array when the selected option changes.
   * 
   * @param { object } selectedOption - selected user from the list of available users
   * to be assigned as the active user for the chat session, and its values are used
   * to set the active user and create new data objects in the database.
   */
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

  /**
   * @description Renders an empty message card with a chat bubble and a "No Messages
   * Found" label centered vertically on a white background.
   * 
   * @returns { image element } a card with an empty chat bubble and a centrally
   * positioned message reading "No Messages Found".
   * 
   * 	* `<div>` - The parent element of the entire response, which contains a card image
   * and a message.
   * 	* `<img>` - A loading-lazy image of a chat bubble with no messages inside, with
   * a height of 250 pixels and an alt attribute of an empty string.
   * 	* `<p>` - A centrally positioned paragraph with the text "No Messages Found".
   */
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
                  {/**
                   * @description Provides information about a chat room, including its name and an
                   * avatar image. When the chat room is clicked, the active chat index and user are
                   * set to the respective values for that chat room.
                   * 
                   * @param { string } key - unique identifier for each chat room and is used to associate
                   * the room with its corresponding message information when displaying the room's
                   * last message.
                   * 
                   * @param { string } name - name of the chat room.
                   * 
                   * @param { `index` value } active - index of the currently active chat room and
                   * updates the `activeChat` variable accordingly.
                   * 
                   * 	* `key`: A unique identifier (uuid) for each conversation.
                   * 	* `name`: The name of the person or group in the conversation.
                   * 	* `active`: Indicates whether the current chat is active (true) or not (false).
                   * This property is set to the index of the currently active chat.
                   * 	* `info`: The last message received in the conversation, which can be a string
                   * of text, an image, or other types of data.
                   * 
                   * @param { string } info - message left by the last user to join the chat room.
                   * 
                   * @param { JavaScript Function. } onClick - 4th action, setting the active chat and
                   * active user details to those specified within the room information object passed
                   * into the `Conversation` component.
                   * 
                   * 	* `setActiveChat`: a function that updates the active chat with the provided
                   * `index` and `uuid`.
                   * 	* `setActiveUser`: a function that updates the active user with the provided
                   * `value` (name) and `label` (display name).
                   * 
                   * 	Note: The `onClick` function is deserialized from a JSON object, so it has all
                   * the properties and attributes defined in that object.
                   */}
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
              {/**
               * @description Maps over an array of message objects and generates a list of messages,
               * including information such as text, sent time, sender, direction, and position.
               */}
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
              {/**
               * @description Provides an interface for users to enter messages and sends them to
               * a designated location.
               * 
               * @param { string } className - class name for an element in JavaScript and sets its
               * attribute value to that string.
               * 
               * @param { string } value - message that is entered by the user in the text input field.
               * 
               * @param { string } onChange - function that will be triggered when the user changes
               * the value of the `message` input field.
               * 
               * @param { string } placeholder - default value for the message input field, which
               * allows the user to type or edit their message before sending it.
               * 
               * @param { event. } onSend - functionality that will be triggered when the user
               * clicks the "Send" button and sends the entered message to the chat platform.
               * 
               * 	1/ `sendMessage`: This is the main event handler function called when the user
               * sends a message. It takes no arguments.
               * 	2/ `value`: This property returns the current value of the message input field.
               */}
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
