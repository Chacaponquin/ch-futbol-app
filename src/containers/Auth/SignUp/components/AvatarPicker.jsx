import React, { useEffect, useState } from "react";
import clsx from "clsx";

const AvatarPicker = ({
  sectionClass,
  handleChangeSection,
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
    <div className={sectionClass}>
      <div className="w-full flex flex-col px-64 space-y-10">
        <h1 className={headerTextClass}>Elija su Avatar</h1>

        <div className="flex justify-center space-x-14 flex-wrap">
          {selectImages.map((image, i) => (
            <img
              src={image}
              alt="Buenas"
              key={i}
              className={imageClass(image)}
              onClick={() => handleChangeUserImage(image)}
            />
          ))}
        </div>

        <div className="flex w-full justify-between text-lg">
          <button
            className="bg-white font-bold rounded-md py-3 px-7"
            onClick={() => handleChangeSection(0)}
          >
            Atras
          </button>

          <button className="rounded-md py-3 px-7 text-white transition-all duration-300 hover:shadow-md hover:shadow-white font-bold bg-gradient-to-r from-purple-400 to-pink-600 p-8">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPicker;
