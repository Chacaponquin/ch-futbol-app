import { SwapOutlined } from "@ant-design/icons";
import Loader from "../../../../../shared/Loader/Loader";

const SwitchButton = ({ loading, selectedPlayer, handleTransferPlayer }) => {
  return (
    <>
      {loading ? (
        <Loader className="w-[100px] h-[100px]" />
      ) : (
        <button
          className="px-6 py-4 flex items-center rounded-xl bg-primary_color text-white font-bold h-max text-xl"
          disabled={selectedPlayer ? false : true}
          onClick={handleTransferPlayer}
        >
          <SwapOutlined style={{ pointerEvents: "none" }} />
        </button>
      )}
    </>
  );
};

export default SwitchButton;
