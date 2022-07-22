import Loader from "../../../../shared/Loader/Loader";
import Icon from "supercons";
import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useContext } from "react";
import UserContext from "../../../../context/UserContext";
import { useQuery } from "@apollo/client";
import { getPeopleToSendMessage } from "../../../../graphql/Message/getPeopleToSendMessage";
import { showError } from "../../../../helpers/showNotifications";
import { TYPES_MESSAGE_QUERY } from "../helpers/typeMessageQuery";
const { Option } = Select;

const MessagesSectionHeader = ({
  deleteButtonClass,
  selectedMessages,
  handleDeleteMessages,
  loading,
  typeQuery,
}) => {
  const { actualUser, elementActive } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);

  const [peopleToSend, setPeopleToSend] = useState([]);

  useQuery(getPeopleToSendMessage, {
    variables: {
      elementID:
        typeQuery === TYPES_MESSAGE_QUERY.ELEMENT ? elementActive : null,
    },
    onError: showError,
    onCompleted: (data) => console.log(data),
  });

  const [newMessage, setNewMessage] = useState({
    content: null,
    title: null,
  });

  const onChange = (id) => setNewMessage({ ...newMessage, to: id });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    console.log(newMessage);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-5 mb-3">
        <Modal
          title=""
          visible={openModal}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={"Send"}
        >
          <form action="" className="flex flex-col">
            <div className="flex">
              <img
                src={actualUser.image}
                alt={actualUser.username}
                className="rounded-full w-[50px] h-[50px]"
              />

              <Select onChange={onChange}></Select>
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

        {loading ? (
          <Loader className="w-[80px]" />
        ) : (
          <button
            className={deleteButtonClass}
            disabled={selectedMessages.length > 0 ? false : true}
            onClick={handleDeleteMessages}
          >
            <Icon glyph="delete" />
            <p className="mb-0 font-bold">Delete</p>
          </button>
        )}
      </div>
    </>
  );
};

export default MessagesSectionHeader;
