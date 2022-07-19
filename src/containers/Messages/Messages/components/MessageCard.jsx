import { Checkbox } from "antd";

const MessageCard = ({
  msg,
  selectMessage,
  handleOpenMessage,
  messageDivClass,
}) => {
  return (
    <div className={messageDivClass(msg._id)}>
      <div className="pr-7">
        <Checkbox onChange={(e) => selectMessage(e, msg._id)} />
      </div>

      <div
        className="flex flex-col py-3 rounded-lg w-full gap-1 cursor-pointer"
        onClick={() => handleOpenMessage(msg)}
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            <img
              src={msg.from.image}
              alt={msg.from.username}
              className="w-[50px] h-[50px] object-cover"
            />

            <h1 className="font-monserratBold text-lg mb-0">
              {msg.from.username}
            </h1>

            <div className="text-xs border-2 border-solid border-[#f0932b] text-[#f0932b] rounded-full py-2 px-4 font-bold bg-[#f6e58d] text-center">
              {msg.from.role}
            </div>

            {msg.from.isAdmin && (
              <div className="text-xs border-2 border-solid border-[#00b894] text-[#00b894] rounded-full py-2 px-4 font-bold bg-[#7bed9f]">
                Admin
              </div>
            )}
          </div>

          <div className="text-slate-600">9: 45 pm</div>
        </div>

        <p className="font-bold">{msg.title}</p>
      </div>
    </div>
  );
};

export default MessageCard;
