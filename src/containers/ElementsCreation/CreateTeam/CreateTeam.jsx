import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../../context/UserContext";
import { userRoles } from "../../../helpers/userRoles";
import FormSection from "./components/FormSection/FormSection";
import PlayersSection from "./components/PlayersSection/PlayersSection";
import TrainerSection from "./components/TrainerSection/TrainerSection";

const CreateTeam = () => {
  const { actualUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [teamID, setTeamID] = useState("");

  const [activeSection, setActiveSection] = useState(0);

  const changeNextSection = () => setActiveSection(activeSection + 1);

  useEffect(() => {
    if (actualUser.role !== userRoles.CLUB_OWNER) navigate("/dashboard");
  }, [actualUser, navigate]);

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
          <TrainerSection
            changeNextSection={changeNextSection}
            teamID={teamID}
          />
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
      className="w-[100vw] duration-500 flex xl:px-64 h-max esm:px-4 sm:px-14 md:px-20 lg:px-48"
      style={{ transform: `translateX(-${activeSection * 100}vw)` }}
    >
      {children}
    </div>
  );
};

export default CreateTeam;
