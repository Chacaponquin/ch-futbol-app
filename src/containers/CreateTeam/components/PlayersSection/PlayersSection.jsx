import { AnimatePresence, motion } from "framer-motion";
import { usePlayersHook } from "../../hooks/usePlayersHook";

import PlayersContainer from "./components/PlayersContainer";
import SwitchButton from "./components/SwitchButton";

const PlayersSection = ({ teamID }) => {
  const {
    handleSelectPlayer,
    handleOpenPlayersSection,
    handleTransferPlayer,
    playerSelectClass,
    playerSectionOpen,
    freePlayers,
    ownPlayers,
    selectedPlayer,
    ownPlayersLoading,
    changePlayerLoading,
    freePlayersLoading,
    setFreePlayers,
    setOwnPlayers,
  } = usePlayersHook(teamID);

  return (
    <motion.div className="bg-slate-100 py-6 px-10 mt-5" layout>
      <motion.button
        className="font-monserratBold text-2xl cursor-pointer w-full text-left"
        onClick={handleOpenPlayersSection}
        disabled={teamID ? false : true}
        layout
      >
        Players
      </motion.button>

      <AnimatePresence>
        {playerSectionOpen && (
          <PlayerSelectSection
            freePlayers={freePlayers}
            ownPlayers={ownPlayers}
            selectedPlayer={selectedPlayer}
            playerSelectClass={playerSelectClass}
            handleSelectPlayer={handleSelectPlayer}
            handleTransferPlayer={handleTransferPlayer}
            ownPlayersLoading={ownPlayersLoading}
            changePlayerLoading={changePlayerLoading}
            freePlayersLoading={freePlayersLoading}
            setFreePlayers={setFreePlayers}
            setOwnPlayers={setOwnPlayers}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PlayerSelectSection = ({
  playerSelectClass,
  selectedPlayer,
  freePlayers,
  ownPlayers,
  handleSelectPlayer,
  handleTransferPlayer,
  ownPlayersLoading,
  changePlayerLoading,
  freePlayersLoading,
  setFreePlayers,
  setOwnPlayers,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transitionDelay: 10 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="flex w-full h-[500px] justify-between items-center pt-5">
        <PlayersContainer
          players={ownPlayers?.fetchOwnPlayers}
          loading={ownPlayersLoading}
          playerSelectClass={playerSelectClass}
          handleSelectPlayer={handleSelectPlayer}
          setPlayers={setOwnPlayers}
          message={"No tienes jugadores en tu equipo"}
        />

        <SwitchButton
          loading={changePlayerLoading}
          selectedPlayer={selectedPlayer}
          handleTransferPlayer={handleTransferPlayer}
        />

        <PlayersContainer
          players={freePlayers}
          playerSelectClass={playerSelectClass}
          handleSelectPlayer={handleSelectPlayer}
          setPlayers={setFreePlayers}
          loading={freePlayersLoading}
          message={"Lo sentimos pero no hay jugadores disponibles"}
        />
      </motion.div>
    </motion.div>
  );
};

export default PlayersSection;
