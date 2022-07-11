import { DatePicker } from "antd";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Select } from "antd";
import { playerPositions } from "../../helpers/playerPositions";
import { countryList } from "../../helpers/allCountries";
import { showError } from "../../helpers/showNotifications";
import ProgressBar from "./components/ProgressBar";
import { useMutation } from "@apollo/client";
import { createPlayer } from "../../graphql/Players/createPlayer";
import axios from "axios";
import Loader from "../../shared/Loader/Loader";

const { Option } = Select;

const CreatePlayer = () => {
  const selectClass = "esm:w-[100%] sm:w-52 md:w-72 lg:w-80 xl:w-96 rounded-md";
  const [showImage, setShowImage] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);

  const [imageLoader, setImageLoader] = useState(false);

  const [playerData, setPlayerData] = useState({
    birth: null,
    pos: null,
    firstName: null,
    lastName: null,
    country: null,
    gender: null,
  });

  const [playerMutation, { loading }] = useMutation(createPlayer);

  const onChangeName = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };
  const onDateChange = (date, dateString) => {
    setPlayerData({ ...playerData, birth: date });
  };
  const onPosChange = (value) => {
    setPlayerData({ ...playerData, pos: value });
  };
  const onGenderChange = (value) => {
    setPlayerData({ ...playerData, gender: value });
  };
  const onImageChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      const reader = new FileReader();

      reader.onload = (file) => {
        setShowImage(reader.result);
        setPlayerImage(files[0]);
      };

      reader.readAsDataURL(files[0]);
    }
  };
  const onCountryChange = (value) => {
    setPlayerData({ ...playerData, country: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(playerData);

    for (let i = 0; i < values.length; i++) {
      if (!values[i] || !playerImage) {
        showError({ message: "Ningun campo puede estar vacio" });
        return;
      }
    }

    const data = new FormData();
    data.set("image", playerImage);

    setImageLoader(true);
    axios
      .post(`${process.env.REACT_APP_API_CURRENT}/uploadImage`, data)
      .then((res) => {
        const { imageUrl } = res.data;

        playerMutation({
          variables: { player: { ...playerData, imageUrl: imageUrl } },
          onCompleted: (data) => console.log(data),
          onError: showError,
        });
      })
      .catch((error) => showError(error))
      .finally(() => setImageLoader(false));
  };

  return (
    <div>
      {(loading || imageLoader) && <CreatePlayerLoader />}

      <div className="exsm:px-3 esm:px-7 sm:px-10 md:px-20 lg:px-64">
        <ProgressBar />

        <div className="bg-form_bg py-8 px-16 exsm:px-3 esm:px-5 sm:px-10 md:px-16">
          <h1 className="text-2xl font-monserratBold mb-5 exsm:text-center">
            Player Data
          </h1>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex w-full items-center h-max esm:flex-col">
              <ImageInput onImageChange={onImageChange} showImage={showImage} />

              <div className="flex flex-col ml-16 space-y-3 w-full esm:ml-0 exsm:mt-5">
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-base font-bold w-full mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 rounded-md"
                    name="firstName"
                    onChange={onChangeName}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="text-base font-bold w-full mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 rounded-md"
                    name="lastName"
                    onChange={onChangeName}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between esm:flex-col esm:space-y-5">
              <div className="flex flex-col">
                <label htmlFor="" className="text-base font-bold w-full mb-1">
                  Birthdate
                </label>
                <DatePicker
                  onChange={onDateChange}
                  picker={"date"}
                  size="large"
                  className={selectClass}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="text-base font-bold w-full mb-1">
                  Position
                </label>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className={selectClass}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onPosChange}
                >
                  {playerPositions.map((pos, i) => (
                    <Option value={pos} key={i}>
                      {pos}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-between esm:flex-col esm:space-y-5">
              <div className="flex flex-col">
                <label htmlFor="" className="text-base font-bold w-full mb-1">
                  Gender
                </label>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className={selectClass}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onGenderChange}
                >
                  <Option value={"MALE"}>Male</Option>
                  <Option value={"FEMALE"}>Female</Option>
                </Select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="text-base font-bold w-full mb-1">
                  Country
                </label>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className={selectClass}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onCountryChange}
                >
                  {countryList.map((country, i) => (
                    <Option value={country} key={i}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="font-bold  py-2 px-8 text-lg bg-primary_color text-white">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CreatePlayerLoader = () => {
  return (
    <div className="fixed w-screen h-screen bg-slate-200 top-0 left-0 flex justify-center items-center z-50 opacity-70">
      <Loader className="w-[150px] h-[150px]" />
    </div>
  );
};

const ImageInput = ({ onImageChange, showImage }) => {
  const imageInput = useRef();
  return (
    <>
      <input
        type="file"
        ref={imageInput}
        onChange={onImageChange}
        className="hidden"
        multiple={false}
        accept=".jpg, .png, .jpeg"
      />
      {showImage ? (
        <img
          src={showImage}
          alt=""
          className="border-dashed w-[150px] h-[150px] rounded-full flex justify-center items-center bg-white border-4 cursor-pointer border-primary_color esm:w-[100px] esm:h-[100px] object-cover"
          onClick={() => imageInput.current.click()}
        />
      ) : (
        <>
          <div
            className="border-dashed min-w-[150px] min-h-[150px] rounded-full flex justify-center items-center bg-white border-4 cursor-pointer border-primary_color esm:min-w-[100px] esm:min-h-[100px]"
            onClick={() => imageInput.current.click()}
          >
            <FaCamera className="text-3xl text-primary_color esm:text-xl" />
          </div>
        </>
      )}
    </>
  );
};

export default CreatePlayer;
