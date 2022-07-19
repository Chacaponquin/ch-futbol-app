import { useFormHook } from "../../hooks/useFormHook";
import { Select } from "antd";
import Loader from "../../../../shared/Loader/Loader";
import { buttonClass, headerClass } from "../../helpers/classes";
const { Option } = Select;

const FormSection = ({ setTeamID, changeNextSection }) => {
  const {
    onSubmit,
    freeLeagues,
    onSelectChange,
    handleChange,
    createTeamLoading,
  } = useFormHook(setTeamID, changeNextSection);

  return (
    <div className="bg-slate-100 py-6 px-10 w-full">
      <h1 className={headerClass}>Initial Form</h1>

      <InitialForm
        freeLeagues={freeLeagues?.findAvailibleLeagues}
        onSubmit={onSubmit}
        onSelectChange={onSelectChange}
        handleChange={handleChange}
        createTeamLoading={createTeamLoading}
      />
    </div>
  );
};

const InitialForm = ({
  freeLeagues = [],
  onSubmit,
  onSelectChange,
  createTeamLoading,
  handleChange,
}) => {
  return (
    <div>
      <form className="pt-5" onSubmit={onSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-xl font-bold mb-2">
            Name
          </label>
          <input
            className="p-3 border-2 focus:border-primary_color rounded-md"
            type="text"
            placeholder="Team Name..."
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-xl font-bold mb-2">
            League
          </label>

          {freeLeagues ? (
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={onSelectChange}
            >
              {freeLeagues.map((league, i) => (
                <Option value={league._id} key={i}>
                  {league.name}
                </Option>
              ))}
            </Select>
          ) : (
            <h1 className="mb-0 text-2xl pt-3">No hay Ligas disponibles</h1>
          )}
        </div>

        <div className="flex w-full justify-end">
          {createTeamLoading ? (
            <Loader className="w-[80px]" />
          ) : (
            <button type="submit" className={buttonClass}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormSection;
