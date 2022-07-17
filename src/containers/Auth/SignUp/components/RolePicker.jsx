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
    <div className="flex lg:px-32 esm:px-7 sm:px-20">
      <div className="flex flex-col">
        <h1 className={headerTextClass}>Elije tu Rol</h1>

        <div className="flex gap-5 mt-3 esm:flex-col">
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
            className="bg-white font-bold rounded-md py-3 px-7 text-lg"
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
      className="w-full fixed h-full top-0 left-0 z-50 esm:px-4 md:px-10 lg:px-20 esm:-top-[50%]"
      layoutId={"expandible-card"}
    >
      <div className="rounded-lg bg-white py-5 px-10 min-h-full flex flex-col">
        <div className="flex justify-end cursor-pointer text-4xl ">
          <BsX onClick={handleOpenCard} />
        </div>

        <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1 items-center">
          <div className="flex items-center justify-center">
            <img
              src={image}
              alt={role}
              className="object-cover w-[350px] esm:w-[200px]"
            />
          </div>

          <motion.div
            className="flex flex-col pr-10 relative space-y-6 esm:space-y-3 esm:pr-0"
            transition={{ delay: 0.5 }}
            initial={{ opacity: 0, top: "3rem" }}
            animate={{ opacity: 1, top: "0rem" }}
          >
            <motion.h1 className="font-bold text-3xl esm:text-xl relative mb-0">
              ¿Qué cosas puedes hacer?
            </motion.h1>

            <motion.ul className="list-disc relative">
              {benefits.map((ben, i) => (
                <motion.li
                  className="font-bold list-item text-xl esm:text-lg"
                  key={i}
                >
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
      className="md:p-5 px-8 py-5 rounded-md bg-white cursor-pointer flex md:flex-col items-center flex-row"
      onClick={handleOpenCard}
      layoutId={"expandible-card"}
      key={id}
    >
      <motion.img
        src={image}
        alt={role}
        className="object-cover lg:w-[250px] esm:hidden md:w-[150px]"
      />
      <motion.h1 className="font-monserratBold flex justify-center mb-0 md:text-4xl text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
        {role}
      </motion.h1>
    </motion.div>
  );
};

export default RolePicker;
