import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-fit overflow-hidden my-5">
      <div className="flex justify-center items-center flex-col">
        {/* image cropper div */}
        <div className="relative w-[355px] h-[250px] sm:w-[700px] sm:h-[400px]">
          <Image
            src={images[currentIndex]}
            fill={true}
            className="object-cover rounded-md"
            alt="slider"
          />
        </div>

        <div className="flex items-center justify-between z-10 absolute w-[365px] sm:w-[690px]">
          <button
            className=""
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + images.length) % images.length
              )
            }
          >
            <MdOutlineArrowBackIosNew className="text-gray-300 text-6xl  p-3 bg-opacity-40 rounded-full cursor-pointer" />
          </button>
          <button
            className=""
            onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          >
            <MdOutlineArrowForwardIos className="text-gray-300 text-6xl  p-3 bg-opacity-40 rounded-full cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
