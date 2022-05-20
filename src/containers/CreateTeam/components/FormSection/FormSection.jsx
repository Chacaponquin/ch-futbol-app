import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useFormHook } from "../../hooks/useFormHook";

const FormSection = ({ setTeamID }) => {
  const { onSubmit, freeLeagues, formOpen, handleOpenForm } =
    useFormHook(setTeamID);

  return (
    <motion.div className="bg-slate-100 py-6 px-10" layout>
      <motion.button
        onClick={handleOpenForm}
        className="text-2xl cursor-pointer w-full text-left font-monserratBold"
        layout
      >
        Initial Form
      </motion.button>

      <AnimatePresence>
        {formOpen && (
          <InitialForm freeLeagues={freeLeagues} onSubmit={onSubmit} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InitialForm = ({ freeLeagues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transitionDelay: 10 }}
      exit={{ opacity: 0 }}
    >
      <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full p-4 bg-warning text-zinc-900 ">
          Los datos no rellenados se generaran automaticamente
        </div>

        <div className="flex flex-col mb-4 pt-4">
          <label htmlFor="" className="text-xl font-bold mb-2">
            Name
          </label>
          <input
            className="p-3 border-2 focus:border-primary_color rounded-md"
            type="text"
            placeholder="Team Name..."
            {...register("name", { required: true, maxLength: 50 })}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-xl font-bold mb-2">
            League
          </label>
          {freeLeagues ? (
            <select {...register("league")} className="p-3 border-2">
              {freeLeagues.findAvailibleLeagues.map((league, i) => (
                <option value={league._id} key={i}>
                  {league.name}
                </option>
              ))}
            </select>
          ) : (
            <h1 className="mb-0 text-2xl pt-3">No hay Ligas disponibles</h1>
          )}
        </div>

        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="px-4 py-3 rounded-lg text-white bg-primary_color text-xl "
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FormSection;
