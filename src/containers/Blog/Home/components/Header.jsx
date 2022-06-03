import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper";
import "../../../../assets/test.jpg";
import { Link } from "react-router-dom";

const Header = ({ headerArticles = [] }) => {
  return (
    <div className="h-[300px]">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        modules={[Keyboard, Pagination]}
      >
        {headerArticles &&
          headerArticles.map(({ resume, title, _id }) => (
            <SwiperSlide key={_id}>
              <div
                style={{
                  background: "url('../../../../assets/test.jpg') no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="py-10 h-full px-10 flex justify-start"
              >
                <div className="flex flex-col text-base text-left max-w-xl h-full justify-center">
                  <h1 className="font-bold mb-1">{title}</h1>
                  <p>{resume}</p>

                  <Link to={`/blog/viewArticle/${_id}`}>
                    <div className="flex items-center">
                      <button className="py-2 px-7 font-bold text-white bg-primary_color rounded-sm">
                        Visit
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Header;
