import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import FormSection from "./components/FormSection/FormSection";
import PlayersSection from "./components/PlayersSection/PlayersSection";

const CreateTeam = () => {
  const [teamID, setTeamID] = useState("");

  return (
    <>
      <AnimateSharedLayout>
        <motion.div className="flex py-5 flex-col w-full exsm:px-3 esm:px-7 sm:px-10 md:px-20 lg:px-64">
          <FormSection setTeamID={setTeamID} />
          <PlayersSection teamID={teamID} />
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
};

export default CreateTeam;
