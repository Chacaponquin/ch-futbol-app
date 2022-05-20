import loader from "../../assets/svg/loader.svg";

const Loader = ({ className = "" }) => {
  return (
    <div>
      <img src={loader} alt="loader" className={className} />
    </div>
  );
};

export default Loader;
