import { useMutation, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../../../context/UserContext";
import { deleteMesseges } from "../../../../graphql/Message/deleteMessages";
import { getAllMessagesUser } from "../../../../graphql/Message/getAllMessagesUser";
import { showError, showSucces } from "../../../../helpers/showNotifications";

export const useMessagesHooks = () => {
  const navigate = useNavigate();
  const { actualUser } = useContext(UserContext);

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [openMessage, setOpenMessage] = useState(null);

  const { loading: getMessagesLoading } = useQuery(getAllMessagesUser, {
    variables: {
      element: {
        id: actualUser._id,
        type: actualUser.role,
      },
    },
    onError: (error) => {
      console.log(error);
      showError(error);
      navigate("/dashboard");
    },
    onCompleted: ({ getAllMessagesUser }) => {
      console.log(getAllMessagesUser);
      //setUserMessages(getAllMessagesUser),
    },
  });

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
          variables: { id: actualUser._id },
          onError: (error) => {
            showError(error);
            navigate("/dashboard");
          },
          onCompleted: ({ getAllMessagesUser }) =>
            setUserMessages(getAllMessagesUser),
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
          variables: { id: actualUser._id },
          onError: (error) => {
            showError(error);
            navigate("/dashboard");
          },
          onCompleted: ({ getAllMessagesUser }) =>
            setUserMessages(getAllMessagesUser),
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
