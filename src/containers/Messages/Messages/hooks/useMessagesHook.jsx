import { useMutation, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../../../context/UserContext";
import { deleteMesseges } from "../../../../graphql/Message/deleteMessages";
import { getAllMessagesUser } from "../../../../graphql/Message/getAllMessagesUser";
import { showError, showSucces } from "../../../../helpers/showNotifications";
import { TYPES_MESSAGE_QUERY } from "../helpers/typeMessageQuery";

//TODO: PONER ESTE ARCHIVO APARTE
const dataMap = (from) => {
  const deleteProperty = (field, obj) => {
    const id = from[field];

    return { id, ...obj };
  };

  switch (from.__typename) {
    case "Player": {
      const { playerID, ...rest } = from;
      return deleteProperty("playerID", rest);
    }
    case "User": {
      const { userID, ...rest } = from;
      return deleteProperty("userID", rest);
    }
    case "Team": {
      const { teamID, ...rest } = from;
      return deleteProperty("teamID", rest);
    }
    case "Trainer": {
      const { teamID, ...rest } = from;
      return deleteProperty("trainerID", rest);
    }
    default:
      return from;
  }
};

export const useMessagesHooks = (typeQuery) => {
  const navigate = useNavigate();
  const { actualUser, elementActive } = useContext(UserContext);

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [openMessage, setOpenMessage] = useState(null);

  const getMessageQueryOptions = () => {
    return {
      variables: {
        elementID:
          typeQuery === TYPES_MESSAGE_QUERY.ELEMENT
            ? elementActive.playerID
            : null,
      },
      onError: (error) => {
        showError(error);
        navigate("/dashboard");
      },
      onCompleted: ({ getAllMessagesUser }) => {
        const mapData = getAllMessagesUser.map(({ from, ...rest }) => {
          return { ...rest, from: dataMap(from) };
        });

        setUserMessages(mapData);
      },
    };
  };

  const { loading: getMessagesLoading } = useQuery(
    getAllMessagesUser,
    getMessageQueryOptions()
  );

  const [deleteMessages, { loading: deleteMessagesLoading }] =
    useMutation(deleteMesseges);

  const selectMessage = (ev, id) => {
    const check = ev.target.checked;
    if (check) setSelectedMessages([...selectedMessages, id]);
    else {
      const filt = selectedMessages.filter((el) => el !== id);
      setSelectedMessages(filt);
    }
  };

  const handleDeleteMessages = () => {
    deleteMessages({
      variables: {
        messageInf: { userID: actualUser._id, messages: selectedMessages },
      },
      onCompleted: () => {
        showSucces({
          description: "Se han eliminado los mensajes con éxito",
          header: "Eliminación con éxito",
        });
      },
      onError: showError,
      refetchQueries: [
        {
          query: getAllMessagesUser,
          ...getMessageQueryOptions(),
        },
      ],
    });
  };

  const handleDeleteSingleMessage = () => {
    deleteMessages({
      variables: {
        messageInf: { userID: actualUser._id, messages: [openMessage._id] },
      },
      onCompleted: () => {
        showSucces({
          description: "Se han eliminado con éxito",
          header: "Eliminación con éxito",
        });

        setOpenMessage(null);
      },
      onError: showError,
      refetchQueries: [
        {
          query: getAllMessagesUser,
          ...getMessageQueryOptions(),
        },
      ],
    });
  };

  const handleOpenMessage = (message) => {
    setOpenMessage(message);
  };

  const handleFilterMessage = (e) => {
    console.log(e.target.value);
  };

  return {
    userMessages,
    openMessage,
    selectedMessages,
    selectMessage,
    handleDeleteMessages,
    handleDeleteSingleMessage,
    handleFilterMessage,
    handleOpenMessage,
    getMessagesLoading,
    deleteMessagesLoading,
  };
};
