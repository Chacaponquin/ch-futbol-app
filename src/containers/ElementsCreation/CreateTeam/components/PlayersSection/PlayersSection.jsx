import { buttonClass, headerClass } from "../../helpers/classes";
import { usePlayersHook } from "../../hooks/usePlayersHook";
import PlayersContainer from "./components/PlayersContainer";
import SwitchButton from "./components/SwitchButton";
import SubmitButton from "../SubmitButton";

const PlayersSection = ({ teamID }) => {
  const {
    handleSelectPlayer,
    handleTransferPlayer,
    playerSelectClass,
    freePlayers,
    freePlayersLoading,
    setFreePlayers,
    playerSelect,
    handleSubmit,
    createOffertLoading,
    selectedPlayers,
    setSelectedPlayers,
  } = usePlayersHook(teamID);

  return (
    <div className="bg-slate-100 py-6 px-10 w-full flex flex-col gap-5">
      <h1 className={headerClass}>Players</h1>

      <PlayerSelectSection
        selectedPlayers={selectedPlayers}
        freePlayers={freePlayers}
        playerSelect={playerSelect}
        playerSelectClass={playerSelectClass}
        handleSelectPlayer={handleSelectPlayer}
        handleTransferPlayer={handleTransferPlayer}
        freePlayersLoading={freePlayersLoading}
        setFreePlayers={setFreePlayers}
        setSelectedPlayers={setSelectedPlayers}
      />

      <SubmitButton
        onClick={handleSubmit}
        className={buttonClass}
        loading={createOffertLoading}
        text={"Submit"}
      />
    </div>
  );
};

const PlayerSelectSection = ({
  playerSelectClass,
  playerSelect,
  freePlayers,
  handleSelectPlayer,
  handleTransferPlayer,
  freePlayersLoading,
  setFreePlayers,
  setSelectedPlayers,
  selectedPlayers,
}) => {
  return (
    <div>
      <div className="flex esm:flex-col sm:flex-col lg:flex-row w-full items-center lg:space-x-4 esm:space-y-4 sm:space-y-4">
        <PlayersContainer
          players={selectedPlayers}
          playerSelectClass={playerSelectClass}
          handleSelectPlayer={handleSelectPlayer}
          setPlayers={setSelectedPlayers}
          message={"No tienes jugadores en tu equipo"}
        />

        <SwitchButton
          selectedPlayer={playerSelect}
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
