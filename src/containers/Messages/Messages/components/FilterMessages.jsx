import Icon from "supercons";

const FilterMessages = ({ handleFilterMessage }) => {
  return (
    <div className="flex w-full px-10 py-3 text-lg bg-slate-100 rounded-md">
      <Icon glyph="filter-fill" size={40} />
      <input
        type="text"
        onChange={handleFilterMessage}
        className="outline-0 ml-4 bg-transparent"
        placeholder="Filter..."
      />
    </div>
  );
};

export default FilterMessages;
