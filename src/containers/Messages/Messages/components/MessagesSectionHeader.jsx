import Icon from "supercons";
import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useContext } from "react";
import UserContext from "../../../../context/UserContext";
import { useMutation, useQuery } from "@apollo/client";
import { getPeopleToSendMessage } from "../../../../graphql/Message/getPeopleToSendMessage";
import { showError, showSucces } from "../../../../helpers/showNotifications";
import { TYPES_MESSAGE_QUERY } from "../helpers/typeMessageQuery";
import LoaderContainer from "../../../../shared/components/LoaderContainer/LoaderContainer";
import { createMessage } from "../../../../graphql/Message/createMessage";
const { Option } = Select;

const MessagesSectionHeader = ({
  deleteButtonClass,
  selectedMessages,
  handleDeleteMessages,
  deleteLoading,
  typeQuery,
}) => {
  const { actualUser, elementActive } = useContext(UserContext);

  const [newMessage, setNewMessage] = useState({
    content: null,
    title: null,
    to: null,
  });

  const [openModal, setOpenModal] = useState(false);

  const [peopleToSend, setPeopleToSend] = useState([]);

  useQuery(getPeopleToSendMessage, {
    variables: {
      elementID:
        typeQuery === TYPES_MESSAGE_QUERY.ELEMENT ? elementActive : null,
    },
    onError: showError,
    onCompleted: ({ getPeopleToSendMessage }) => {
      console.log(getPeopleToSendMessage);
      setPeopleToSend(getPeopleToSendMessage);
    },
  });

  const [createNewMessage, { loading: creationLoading }] =
    useMutation(createMessage);

  const onChange = (id) => {
    const found = peopleToSend.find((el) => el.userID === id);
    setNewMessage({
      ...newMessage,
      to: found,
    });
  };

  const handleChange = (e) =>
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSendMessage = (ev) => {
    ev.preventDefault();

    createNewMessage({
      variables: {
        msg: {
          to: { type: newMessage.to.__typename, id: newMessage.to.userID },
          content: newMessage.content,
          title: newMessage.title,
        },
      },
      onError: showError,
      onCompleted: () =>
        showSucces({
          header: "Enviado con exito",
          description: "Se ha enviado correctamente el mensaje",
        }),
    });
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-5 mb-3 esm:justify-center">
        <Modal
          title=""
          visible={openModal}
          okText={"Send"}
          onCancel={handleCancel}
          className="!w-[800px]"
        >
          <form
            action=""
            className="flex flex-col px-20 gap-5 py-5"
            onSubmit={handleSendMessage}
          >
            <div className="flex items-center gap-5 justify-center">
              <img
                src={actualUser.image}
                alt={actualUser.username}
                className="rounded-full w-[50px] h-[50px]"
              />

              <div className="text-primary_color">
                <Icon glyph="enter" />
              </div>

              <Select
                onChange={onChange}
                className="w-[500px] peopleToSend-container"
              >
                {peopleToSend.map((el, i) => (
                  <Option value={el.userID} key={i}>
                    <div className="flex items-center gap-3">
                      <img
                        src={el.image}
                        alt={el.username}
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                      <p className="mb-0 font-bold">{el.username}</p>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex flex-col w-full gap-4">
              <div className="w-full flex flex-col gap-1">
                <h1 className="text-xl font-bold mb-0">Title:</h1>
                <input
                  type="text"
                  className="outline-none px-4 py-2 text-base border-2 rounded-md"
                  placeholder="Title..."
                  name="title"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <h1 className="text-xl font-bold mb-0">Message:</h1>
                <textarea
                  name="content"
                  className="px-4 py-2 outline-none border-2 rounded-md resize-none !h-[200px]"
                  placeholder="Message..."
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end w-full gap-5 items-center">
              <button
                className="bg-slate-100 text-black font-bold rounded-md py-2 px-5 h-max"
                onClick={handleCancel}
              >
                <p className="mb-0 font-monserratBold text-base uppercase">
                  Cancel
                </p>
              </button>

              <LoaderContainer className={"w-[60px]"} loading={creationLoading}>
                <button
                  type="submit"
                  className="flex items-center bg-primary_color rounded-md w-max py-2 px-5 gap-2 text-white"
                >
                  <p className="font-monserratBold text-base uppercase mb-0">
                    Send
                  </p>
                  <Icon glyph="send-fill" size={22} />
                </button>
              </LoaderContainer>
            </div>
          </form>
        </Modal>

        <button
          className="text-white bg-primary_color px-5 py-2 flex items-center gap-3 rounded-md"
          onClick={handleOpenModal}
        >
          <Icon glyph="message-new" />
          <p className="mb-0 font-bold">New Message</p>
        </button>

        <LoaderContainer className="w-[80px]" loading={deleteLoading}>
          <button
            className={deleteButtonClass}
            disabled={selectedMessages.length > 0 ? false : true}
            onClick={handleDeleteMessages}
          >
            <Icon glyph="delete" />
            <p className="mb-0 font-bold">Delete</p>
          </button>
        </LoaderContainer>
      </div>
    </>
  );
};

export default MessagesSectionHeader;
