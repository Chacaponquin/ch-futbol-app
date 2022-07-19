import Loader from "../../../../shared/Loader/Loader";
import Icon from "supercons";

const MessagesSectionHeader = ({
  deleteButtonClass,
  selectedMessages,
  handleDeleteMessages,
  loading,
}) => {
  return (
    <>
      <div className="flex items-center justify-end gap-5 mb-3">
        <button className="text-white bg-primary_color px-5 py-2 flex items-center gap-3 rounded-md">
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
