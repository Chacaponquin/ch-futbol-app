import { headerClass } from "../../helpers/classes";
import { usePlayersHook } from "../../hooks/usePlayersHook";

import PlayersContainer from "./components/PlayersContainer";
import SwitchButton from "./components/SwitchButton";

const PlayersSection = ({ teamID }) => {
  const {
    handleSelectPlayer,
    handleTransferPlayer,
    playerSelectClass,
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
    <div className="bg-slate-100 py-6 px-10 w-full">
      <h1 className={headerClass}>Players</h1>

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
    </div>
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
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transitionDelay: 10 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex esm:flex-col sm:flex-col md:flex-row w-full h-[500px] items-center pt-5 md:space-x-4 esm:space-y-4 sm:space-y-4">
        <PlayersContainer
          players={ownPlayers}
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
      </div>
    </div>
  );
};

export default PlayersSection;
