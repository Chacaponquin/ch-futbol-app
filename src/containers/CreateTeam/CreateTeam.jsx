import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import FormSection from "./components/FormSection/FormSection";
import PlayersSection from "./components/PlayersSection/PlayersSection";

const CreateTeam = () => {
  const [teamID, setTeamID] = useState("");

  return (
    <>
      <AnimateSharedLayout>
        <motion.div className="flex px-52 py-5 flex-col w-full">
          <FormSection setTeamID={setTeamID} />
          <PlayersSection teamID={teamID} />
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
};

export default CreateTeam;
