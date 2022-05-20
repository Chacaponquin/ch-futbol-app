import { SwapOutlined } from "@ant-design/icons";
import Loader from "../../../../../shared/Loader/Loader";

const SwitchButton = ({ loading, selectedPlayer, handleTransferPlayer }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <button
          className="px-8 py-5 flex items-center rounded-xl bg-primary_color text-white font-bold h-max"
          disabled={selectedPlayer ? false : true}
          onClick={handleTransferPlayer}
        >
          <SwapOutlined style={{ fontSize: "2rem", pointerEvents: "none" }} />
        </button>
      )}
    </>
  );
};

export default SwitchButton;
