import { Checkbox } from "antd";
import { useState, useContext } from "react";
import clsx from "clsx";
import Icon from "supercons";
import { useQuery } from "@apollo/client";
import { getAllMessagesUser } from "../../graphql/Message/getAllMessagesUser";
import UserContext from "../../context/UserContext";
import { showError } from "../../helpers/showNotifications";
import { useNavigate } from "react-router";
import Loader from "../../shared/Loader/Loader";

const Messages = () => {
  const { actualUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  const [openMessage, setOpenMessage] = useState(null);

  const { loading: getMessagesLoading } = useQuery(getAllMessagesUser, {
    variables: { id: actualUser._id },
    onError: (error) => {
      showError(error);
      navigate("/dashboard");
    },
    onCompleted: ({ getAllMessagesUser }) =>
      setUserMessages(getAllMessagesUser),
  });

  const selectMessage = (ev, id) => {
    const check = ev.target.checked;
    if (check) setSelectedMessages([...selectedMessages, id]);
    else {
      const filt = selectedMessages.filter((el) => el !== id);
      setSelectedMessages(filt);
    }
  };

  const handleOpenMessage = (message) => {
    setOpenMessage(message);
  };

  const handleFilterMessage = (e) => {
    console.log(e.target.value);
  };

  const messageSectionClass = clsx(
    "flex flex-col transition-all duration-500",
    { "w-full": openMessage === null, "w-[40%]": openMessage !== null }
  );

  const openMessageClass = clsx("transition-all duration-500", {
    "w-0 hidden": openMessage === null,
    "w-[60%] flex": openMessage !== null,
  });

  const deleteButtonClass = clsx(
    "px-5 py-2 flex items-center gap-3 rounded-md transition-all duration-300",
    { "bg-slate-100 text-black": selectedMessages.length === 0 },
    { "bg-danger_color text-white": selectedMessages.length !== 0 }
  );

  if (getMessagesLoading) {
    return (
      <div className="px-20 w-full flex justify-center esm:px-10">
        <Loader className="mt-10 w-[200px]" />
      </div>
    );
  }

  return (
    <div className="w-full px-20">
      <div className="w-full flex">
        <div className={messageSectionClass}>
          <MessagesSectionHeader deleteButtonClass={deleteButtonClass} />
          {userMessages.length > 0 && (
            <FilterMessages handleFilterMessage={handleFilterMessage} />
          )}

          {userMessages.length > 0 ? (
            <div className="flex flex-col w-full py-2">
              {userMessages.map((_, i) => (
                <MessageCard
                  key={i}
                  selectMessage={selectMessage}
                  handleOpenMessage={handleOpenMessage}
                />
              ))}
            </div>
          ) : (
            <div className="w-full text-center pt-10 flex flex-col">
              <h1 className="mb-0 font-monserratBold text-5xl text-slate-500">
                No tienes mensajes
              </h1>
            </div>
          )}
        </div>

        <div className={openMessageClass}>
          <OpenMessageSection handleOpenMessage={handleOpenMessage} />
        </div>
      </div>
    </div>
  );
};

const FilterMessages = ({ handleFilterMessage }) => {
  return (
    <div className="flex w-full px-10 py-3 text-lg bg-slate-100 rounded-md">
      <Icon glyph="filter-fill" size={40} />
      <input
        type="text"
        onChange={handleFilterMessage}
        className="outline-0 ml-4 bg-transparent"
        placeholder="Filter..."
      />
    </div>
  );
};

const MessagesSectionHeader = ({ deleteButtonClass }) => {
  return (
    <>
      <div className="flex items-center justify-end gap-5 mb-3">
        <button className="text-white bg-primary_color px-5 py-2 flex items-center gap-3 rounded-md">
          <Icon glyph="message-new" />
          <p className="mb-0 font-bold">New Message</p>
        </button>

        <button className={deleteButtonClass}>
          <Icon glyph="delete" />
          <p className="mb-0 font-bold">Delete</p>
        </button>
      </div>
    </>
  );
};

const OpenMessageSection = ({ handleOpenMessage }) => {
  return (
    <div className="flex flex-col py-8 px-16 gap-5">
      <div className="">
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-700 text-lg mb-0">22 de Julio de 2022</p>

          <div className="flex items-center gap-5">
            <button className="w-[50px] h-[50px] rounded-full flex justify-center items-center text-white bg-danger_color">
              <Icon glyph="delete" />
            </button>

            <button onClick={() => handleOpenMessage(null)}>
              <Icon glyph="view-close" />
            </button>
          </div>
        </div>

        <h1 className="text-5xl font-bold">Today hay party bb</h1>

        <p className="mb-0 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ea
          nam accusamus temporibus quibusdam quaerat voluptatem non illum quia.
          Eos aliquid blanditiis doloribus esse quo commodi vero deleniti,
          molestiae, omnis fuga itaque, molestias laborum debitis laudantium
          nemo labore voluptatum suscipit!
        </p>

        <div className="flex justify-end font-bold gap-3 items-center">
          <img
            src={`https://api.multiavatar.com/654.svg`}
            alt=""
            className="w-[50px] h-[50px] object-cover"
          />
          <p className="mb-0">Francisco el duro</p>
        </div>
      </div>

      <ReplySection />
    </div>
  );
};

const ReplySection = () => {
  return (
    <div className="w-full flex flex-col py-4 px-8 border-2 rounded-lg">
      <h1 className="mb-0 uppercase font-monserratBold text-2xl">Reply</h1>

      <textarea
        name=""
        className="resize-none outline-none py-3 h-[150px]"
        placeholder="Escribe tu respuesta..."
      ></textarea>

      <div className="flex justify-end">
        <button className="flex items-center bg-primary_color rounded-md w-max py-2 px-5 gap-2 text-white">
          <p className="font-monserratBold text-base uppercase mb-0">Send</p>
          <Icon glyph="send-fill" size={25} />
        </button>
      </div>
    </div>
  );
};

const MessageCard = ({ message, selectMessage, handleOpenMessage }) => {
  return (
    <div className="w-full flex items-center px-8">
      <div className="pr-7">
        <Checkbox onChange={(e) => selectMessage(e, 3)} />
      </div>

      <div
        className="flex flex-col py-3 rounded-lg w-full gap-1 bg-white cursor-pointer"
        onClick={() => handleOpenMessage(5)}
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            <img
              src={`https://api.multiavatar.com/654.svg`}
              alt=""
              className="w-[50px] h-[50px] object-cover"
            />

            <h1 className="font-monserratBold text-lg mb-0">
              Franscisco Antonio
            </h1>

            <div className="text-xs border-2 border-solid border-[#00b894] text-[#00b894] rounded-full py-2 px-4 font-bold bg-[#7bed9f]">
              Admin
            </div>
          </div>

          <div className="text-slate-600">9: 45 pm</div>
        </div>

        <p className="font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default Messages;
