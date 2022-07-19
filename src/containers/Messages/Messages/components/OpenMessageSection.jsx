import Icon from "supercons";

const OpenMessageSection = ({
  handleOpenMessage,
  selectedMsg,
  handleDeleteSingleMessage,
}) => {
  return (
    <>
      {selectedMsg && (
        <div className="flex flex-col py-8 px-16 gap-5">
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

            <h1 className="text-5xl font-bold">Today hay party bb</h1>

            <p className="text-lg">{selectedMsg.content}</p>

            <div className="flex justify-end font-bold gap-3 items-center">
              <img
                src={selectedMsg.from.image}
                alt={selectedMsg.from.username}
                className="w-[50px] h-[50px] object-cover"
              />
              <p className="mb-0">{selectedMsg.from.username}</p>
            </div>
          </div>

          <ReplySection />
        </div>
      )}
    </>
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

export default OpenMessageSection;
