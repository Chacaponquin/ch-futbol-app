import { useState } from "react";
import FormSection from "./components/FormSection/FormSection";
import PlayersSection from "./components/PlayersSection/PlayersSection";
import TrainerSection from "./components/TrainerSection/TrainerSection";

const CreateTeam = () => {
  const [teamID, setTeamID] = useState("");

  const [activeSection, setActiveSection] = useState(0);

  const changeNextSection = () => setActiveSection(activeSection + 1);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-[300vw] flex">
        <CreateTeamSection activeSection={activeSection}>
          <FormSection
            setTeamID={setTeamID}
            changeNextSection={changeNextSection}
          />
        </CreateTeamSection>

        <CreateTeamSection activeSection={activeSection}>
          <TrainerSection />
        </CreateTeamSection>

        <CreateTeamSection activeSection={activeSection}>
          <PlayersSection teamID={teamID} />
        </CreateTeamSection>
      </div>
    </div>
  );
};

const CreateTeamSection = ({ children, activeSection }) => {
  return (
    <div
      className="w-[100vw] duration-500 flex"
      style={{ transform: `translateX(-${activeSection * 100}vw)` }}
    >
      {children}
    </div>
  );
};

export default CreateTeam;
