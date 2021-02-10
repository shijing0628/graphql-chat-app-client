import React, { useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useSubscription } from "@apollo/client";

import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";

import Users from "./Users";
import Messages from "./Messages";

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const NEW_REACTION = gql`
  subscription newReaction {
    newReaction {
      uuid
      content
      message {
        uuid
        from
        to
      }
    }
  }
`;

export default function Home({ history }) {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  const { data: reactionData, error: reactionError } = useSubscription(
    NEW_REACTION
  );

  useEffect(() => {
    if (messageError) console.log(messageError);

    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;

      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [messageError, messageData]);

  useEffect(() => {
    if (reactionError) console.log(reactionError);

    if (reactionData) {
      const reaction = reactionData.newReaction;
      const otherUser =
        user.username === reaction.message.to
          ? reaction.message.from
          : reaction.message.to;

      messageDispatch({
        type: "ADD_REACTION",
        payload: {
          username: otherUser,
          reaction,
        },
      });
    }
  }, [reactionError, reactionData]);

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <div>
      <div id="container">
        <div class="steam" id="steam1">
          {" "}
        </div>
        <div class="steam" id="steam2">
          {" "}
        </div>
        <div class="steam" id="steam3">
          {" "}
        </div>
        <div class="steam" id="steam4">
          {" "}
        </div>
        <div id="cup">
          <div id="cup-body">
            <div id="cup-shade"></div>
          </div>
          <div id="cup-handle"></div>
        </div>
        <div id="saucer"></div>
        <div id="shadow"></div>
      </div>
      <Row className="justify-content-around mb-5">
        <Link to="/login">
          <Button variant="link" className="nav-link-button">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="link" className="nav-link-button">
            Register
          </Button>
        </Link>
        <Button variant="link" onClick={logout} className="nav-link-button">
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </div>
  );
}
