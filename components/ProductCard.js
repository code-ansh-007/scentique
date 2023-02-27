import Image from "next/image";
import React from "react";

const ProductCard = ({ img, name, price, auras, quantity }) => {
  return (
    <>
      <main className="w-[340px] sm:w-[280px] m-3 bg-white p-1 rounded-lg bg-opacity-50">
        <div>
          <Image
            src={img}
            alt="poroduct pic"
            width={340}
            height={150}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col mt-3 text-sm">
          <span className="font-semibold">{name}</span>
          <div className="text-xs flex flex-col mt-2">
            <span>Price: ₹{price}</span>
            <span>{auras} auras</span>
            <span>Quantity: {quantity}ml</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductCard;
