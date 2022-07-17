import { motion, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { loginBenefits } from "../../../../helpers/loginBenefits";
import image1 from "../../../../assets/images/login/character.png";
import image2 from "../../../../assets/images/login/coach.png";
import image3 from "../../../../assets/images/login/football-player.png";

const RolePicker = ({ headerTextClass, handleSubmit, changeToPrevSection }) => {
  const roles = {
    PLAYER: "Player",
    TRAINER: "Trainer",
    CLUB_OWNER: "Club Owner",
  };

  const roleCard = [
    {
      id: 1,
      image: image3,
      role: roles.PLAYER,
      benefits: loginBenefits.PLAYER,
    },
    {
      id: 2,
      image: image2,
      role: roles.TRAINER,
      benefits: loginBenefits.TRAINER,
    },
    {
      id: 3,
      image: image1,
      role: roles.CLUB_OWNER,
      benefits: loginBenefits.OWNER,
    },
  ];

  return (
    <div className="flex px-32">
      <div className="flex flex-col">
        <h1 className={headerTextClass}>Elije tu Rol</h1>

        <div className="flex gap-5 mt-3">
          {roleCard.map((card) => (
            <SignUpRoleCard
              card={card}
              key={card.id}
              handleSubmit={handleSubmit}
            />
          ))}
        </div>

        <div className="flex justify-start py-3">
          <button
            className="bg-white font-bold rounded-md py-3 px-7"
            onClick={changeToPrevSection}
          >
            Atras
          </button>
        </div>
      </div>
    </div>
  );
};

const SignUpRoleCard = ({ card, handleSubmit }) => {
  const [openCard, setOpenCard] = useState(false);

  const handleOpenCard = () => setOpenCard(!openCard);

  return (
    <AnimateSharedLayout>
      {openCard ? (
        <ExpandCard
          {...card}
          handleOpenCard={handleOpenCard}
          handleSubmit={handleSubmit}
        />
      ) : (
        <CompactCard {...card} handleOpenCard={handleOpenCard} />
      )}
    </AnimateSharedLayout>
  );
};

const ExpandCard = ({
  role,
  image,
  handleOpenCard,
  benefits,
  handleSubmit,
}) => {
  return (
    <motion.div
      className="w-full fixed h-full top-0 left-0 z-50 px-20"
      layoutId={"expandible-card"}
    >
      <div className="rounded-lg bg-white py-5 px-10 h-full flex flex-col">
        <div className="flex justify-end cursor-pointer text-4xl ">
          <BsX onClick={handleOpenCard} />
        </div>

        <div className="grid grid-cols-2 grid-rows-1 items-center">
          <div className="flex items-center justify-center">
            <img src={image} alt={role} className="object-cover w-[350px]" />
          </div>

          <motion.div
            className="flex flex-col pr-10 relative space-y-6"
            transition={{ delay: 0.5 }}
            initial={{ opacity: 0, top: "3rem" }}
            animate={{ opacity: 1, top: "0rem" }}
          >
            <motion.h1 className="font-bold text-3xl relative mb-0">
              ¿Qué cosas puedes hacer?
            </motion.h1>

            <motion.ul className="list-disc relative">
              {benefits.map((ben, i) => (
                <motion.li className="font-bold list-item text-xl" key={i}>
                  {ben}
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex justify-end">
              <button
                className="rounded-md py-3 px-7 text-white font-bold bg-gradient-to-r from-purple-400 to-pink-600 w-max text-xl"
                onClick={handleSubmit}
              >
                Crear
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CompactCard = ({ id, image, role, handleOpenCard }) => {
  return (
    <motion.div
      className="p-5 rounded-md bg-white cursor-pointer"
      onClick={handleOpenCard}
      layoutId={"expandible-card"}
      key={id}
    >
      <motion.img src={image} alt={role} className="object-cover w-[250px]" />
      <motion.h1 className="font-monserratBold flex items-center mb-0 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
        {role}
      </motion.h1>
    </motion.div>
  );
};

export default RolePicker;
