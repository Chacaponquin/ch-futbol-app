import { Reorder } from "framer-motion";
import Loader from "../../../../../shared/Loader/Loader";
import EmptyPlayersArray from "./EmptyPlayersArray";
import PlayerCard from "./PlayerCard";

const PlayersContainer = ({
  players = [],
  loading,
  playerSelectClass,
  handleSelectPlayer,
  setPlayers,
  message,
}) => {
  return (
    <>
      <div className="border-2 p-5 h-full bg-white rounded-lg overflow-y-auto md:w-[43%] esm:w-[100%] sm:w-[100%]">
        {loading && <Loader />}

        {players.length ? (
          <Reorder.Group
            axis="y"
            values={players}
            onReorder={setPlayers}
            as="ul"
            layoutScroll
          >
            {players.map((player) => (
              <Reorder.Item
                value={player}
                key={player._id}
                id={player._id}
                className={playerSelectClass(player._id)}
                onClick={() => handleSelectPlayer(player._id)}
              >
                <PlayerCard {...player} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <EmptyPlayersArray message={message} />
        )}
      </div>
    </>
  );
};

export default PlayersContainer;
