import loader from "../../assets/svg/loader.svg";

const Loader = ({ className = "" }) => {
  return (
    <div className={className}>
      <img src={loader} alt="loader" className="w-full h-full object-contain" />
    </div>
  );
};

export default Loader;
