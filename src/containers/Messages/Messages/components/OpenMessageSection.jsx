import { useState } from "react";
import Icon from "supercons";
import LoaderContainer from "../../../../shared/components/LoaderContainer/LoaderContainer";

const OpenMessageSection = ({
  handleOpenMessage,
  selectedMsg,
  handleDeleteSingleMessage,
  handleSendReply,
  createReplyLoading,
}) => {
  return (
    <>
      {selectedMsg && (
        <div className="flex flex-col lg:py-8 lg:px-16 gap-5 w-full exsm:px-2 exsm:py-3 esm:py-4 esm:px-5 sm:px-8 sm:py-5 ">
          <MessageInfSection
            selectedMsg={selectedMsg}
            handleOpenMessage={handleOpenMessage}
            handleDeleteSingleMessage={handleDeleteSingleMessage}
          />

          <ReplyMessagesSection replys={selectedMsg.replys} />

          <ReplySection
            handleSendReply={handleSendReply}
            selectedMsgID={selectedMsg._id}
            loading={createReplyLoading}
          />
        </div>
      )}
    </>
  );
};

const ReplyMessagesSection = ({ replys = [] }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {replys.map((el, i) => (
        <div
          className="py-4 px-3 w-full border-t-2 border-b-2 flex flex-col"
          key={i}
        >
          <p className="mb-0">{el.content}</p>

          <div className="flex justify-end items-center gap-6">
            <div className="flex items-center gap-2">
              <img
                src={el.from.image}
                alt={el.from.name}
                className="w-[35px] h-[35px] object-cover rounded-full"
              />
              <p className="mb-0 font-bold text-sm">{el.from.name}</p>
            </div>

            <p className="text-gray-500 mb-0">22 de julio</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MessageInfSection = ({
  selectedMsg,
  handleOpenMessage,
  handleDeleteSingleMessage,
}) => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-3">
        <p className="text-slate-700 text-lg mb-0">22 de Julio de 2022</p>

        <div className="flex items-center gap-5">
          <button
            className="w-[50px] h-[50px] rounded-full flex justify-center items-center text-white bg-danger_color"
            onClick={handleDeleteSingleMessage}
          >
            <Icon glyph="delete" />
          </button>

          <button onClick={() => handleOpenMessage(null)}>
            <Icon glyph="view-close" />
          </button>
        </div>
      </div>

      <h1 className="text-5xl font-bold esm:text-2xl">{selectedMsg.title}</h1>

      <p className="text-lg esm:text-base">{selectedMsg.content}</p>

      <div className="flex justify-end font-bold gap-3 items-center">
        <img
          src={selectedMsg.from.image}
          alt={selectedMsg.from.name}
          className="w-[50px] h-[50px] object-cover rounded-full esm:w-[30px] esm:h-[30px]"
        />
        <p className="mb-0">{selectedMsg.from.name}</p>
      </div>
    </div>
  );
};

const ReplySection = ({ handleSendReply, selectedMsgID, loading }) => {
  const [replyContent, setReplyContent] = useState("");

  return (
    <div className="w-full flex flex-col py-4 px-8 border-2 rounded-lg esm:px-6">
      <h1 className="mb-0 uppercase font-monserratBold text-2xl esm:text-lg">
        Reply
      </h1>

      <textarea
        name=""
        className="resize-none outline-none py-3 h-[120px] esm:h-[80px]"
        placeholder="Escribe tu respuesta..."
        onChange={(e) => setReplyContent(e.target.value)}
      ></textarea>

      <div className="flex justify-end">
        <LoaderContainer loading={loading} className="w-[70px]">
          <button
            onClick={() => handleSendReply(selectedMsgID, replyContent)}
            className="flex items-center bg-primary_color rounded-md w-max py-2 px-5 gap-2 text-white esm:px-4 esm:py-1"
          >
            <p className="font-monserratBold text-base uppercase mb-0 esm:text-sm">
              Send
            </p>
            <Icon glyph="send-fill" size={25} />
          </button>
        </LoaderContainer>
      </div>
    </div>
  );
};

export default OpenMessageSection;
