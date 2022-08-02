import clsx from "clsx";
import Loader from "../../../shared/Loader/Loader";
import picture from "../../../assets/images/sad.png";
import OpenMessageSection from "./components/OpenMessageSection";
import FilterMessages from "./components/FilterMessages";
import MessagesSectionHeader from "./components/MessagesSectionHeader";
import MessageCard from "./components/MessageCard";
import { useMessagesHooks } from "./hooks/useMessagesHook";
import "./messages.css";

const Messages = ({ typeQuery }) => {
  const {
    openMessage,
    selectedMessages,
    userMessages,

    getMessagesLoading,
    deleteMessagesLoading,
    createReplyLoading,

    selectMessage,
    handleDeleteMessages,
    handleDeleteSingleMessage,
    handleFilterMessage,
    handleOpenMessage,
    handleSendReply,
  } = useMessagesHooks(typeQuery);

  const messageSectionClass = clsx(
    "flex flex-col transition-all duration-500",
    {
      "w-full": openMessage === null,
      "xl:w-[45%] xl:flex sm:w-0 esm:w-0 sm:hidden esm:hidden":
        openMessage !== null,
    }
  );

  const openMessageClass = clsx("transition-all duration-500", {
    "w-0 hidden": openMessage === null,
    "xl:w-[55%] sm:w-full esm:w-full flex": openMessage !== null,
  });

  const deleteButtonClass = clsx(
    "px-5 py-2 flex items-center gap-3 rounded-md transition-all duration-300",
    { "bg-slate-100 text-black": selectedMessages.length === 0 },
    { "bg-danger_color text-white": selectedMessages.length !== 0 }
  );

  const messageDivClass = (id) => {
    const found = selectedMessages.find((el) => el === id);

    return clsx(
      "w-full flex items-center px-8 transition-all duration-300 esm:px-3",
      { "bg-slate-100": found },
      { "bg-white": !found }
    );
  };

  if (getMessagesLoading) {
    return (
      <div className="px-20 w-full flex justify-center esm:px-10">
        <Loader className="mt-10 w-[200px] esm:w-[100px]" />
      </div>
    );
  }

  return (
    <div className="w-full lg:px-20 esm:px-4 sm:px-9 flex">
      <div className="w-full flex">
        <div className={messageSectionClass}>
          <MessagesSectionHeader
            deleteButtonClass={deleteButtonClass}
            selectedMessages={selectedMessages}
            handleDeleteMessages={handleDeleteMessages}
            deleteLoading={deleteMessagesLoading}
            typeQuery={typeQuery}
            cantMessages={userMessages.length}
          />
          {userMessages.length > 0 && (
            <FilterMessages handleFilterMessage={handleFilterMessage} />
          )}

          {userMessages.length > 0 ? (
            <div className="flex flex-col w-full py-2">
              {userMessages.map((msg, i) => (
                <MessageCard
                  key={i}
                  msg={msg}
                  selectMessage={selectMessage}
                  handleOpenMessage={handleOpenMessage}
                  messageDivClass={messageDivClass}
                />
              ))}
            </div>
          ) : (
            <NoMessageImage />
          )}
        </div>

        <div className={openMessageClass}>
          <OpenMessageSection
            handleOpenMessage={handleOpenMessage}
            selectedMsg={openMessage}
            handleDeleteSingleMessage={handleDeleteSingleMessage}
            handleSendReply={handleSendReply}
            createReplyLoading={createReplyLoading}
          />
        </div>
      </div>
    </div>
  );
};

const NoMessageImage = () => {
  return (
    <div className="w-full text-center pt-5 flex flex-col items-center">
      <img
        src={picture}
        alt="sad-face"
        className="object-cover w-[300px] esm:w-[180px]"
      />
      <h1 className="mb-0 font-monserratBold text-5xl text-slate-500 mt-3 esm:text-3xl">
        No tienes mensajes
      </h1>
    </div>
  );
};

export default Messages;
