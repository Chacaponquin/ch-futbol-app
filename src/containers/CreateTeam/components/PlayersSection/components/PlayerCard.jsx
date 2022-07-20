import { motion } from "framer-motion";

const PlayerCard = ({ image, fullName }) => {
  return (
    <>
      <motion.img
        src={image}
        alt={fullName}
        className="rounded-full mr-5 w-[40px] h-[40px]"
      />
      <motion.p className="font-bold mb-0">{fullName}</motion.p>
    </>
  );
};

export default PlayerCard;
