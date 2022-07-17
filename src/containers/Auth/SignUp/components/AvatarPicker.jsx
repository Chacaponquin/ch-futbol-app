import React, { useEffect, useState } from "react";
import clsx from "clsx";

const AvatarPicker = ({
  changeToNextSection,
  changeToPrevSection,
  headerTextClass,
  handleChangeUserImage,
  imageSelected,
}) => {
  const [selectImages, setSelectImages] = useState([]);

  const imageClass = (url) =>
    clsx(
      "w-[80px] h-[80px] transition-all duration-300 hover:scale-125 cursor-pointer",
      {
        "scale-125 border-4 border-white border-solid rounded-full":
          url === imageSelected,
      }
    );

  useEffect(() => {
    const images = [];

    for (let i = 0; i < 5; i++) {
      const api = `https://api.multiavatar.com/${Number(
        Math.random() * 1000
      ).toFixed(0)}.svg`;

      images.push(api);
    }

    setSelectImages(images);
  }, []);

  return (
    <div className="w-full flex flex-col space-y-10 esm:px-5 sm:px-5 md:px-10 lg:px-40 xl:px-64">
      <h1 className={headerTextClass}>Elija su Avatar</h1>

      <div className="flex justify-center gap-14 flex-wrap esm:gap-9 ">
        {selectImages.map((image, i) => (
          <img
            src={image}
            alt={image}
            key={i}
            className={imageClass(image)}
            onClick={() => handleChangeUserImage(image)}
          />
        ))}
      </div>

      <div className="flex w-full justify-between text-lg">
        <button
          className="bg-white font-bold rounded-md py-3 px-7"
          onClick={changeToPrevSection}
        >
          Atras
        </button>

        <button
          className="rounded-md py-3 px-7 text-white transition-all duration-300 hover:shadow-md hover:shadow-white font-bold bg-gradient-to-r from-purple-400 to-pink-600 p-8"
          onClick={changeToNextSection}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AvatarPicker;
