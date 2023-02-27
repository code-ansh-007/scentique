import React, { useState } from "react";
import brand from "../images/brand.png";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

const Navbar = ({ setCurrentPage, currentPage }) => {
  const { user } = useAuth();

  return (
    <>
      <main className="flex flex-col items-center space-y-3 pt-3">
        <div className="">
          <Image src={brand} alt="brand pic" width={200} />
        </div>
        <div className="flex items-center space-x-[30px] sm:space-x-[100px]">
          <span
            onClick={() => setCurrentPage("home")}
            className={
              currentPage === "home"
                ? "pb-[1px] border-b-[1px] border-black"
                : "pb-[1px] border-b-[1px] border-transparent"
            }
          >
            Home
          </span>
          <span
            onClick={() => setCurrentPage("products")}
            className={
              currentPage === "products"
                ? "pb-[1px] border-b-[1px] border-black"
                : "pb-[1px] border-b-[1px] border-transparent"
            }
          >
            Products
          </span>
          <span
            onClick={() => setCurrentPage("contact")}
            className={
              currentPage === "contact"
                ? "pb-[1px] border-b-[1px] border-black"
                : "pb-[1px] border-b-[1px] border-transparent"
            }
          >
            Contact
          </span>
          {!user ? (
            <span
              onClick={() => setCurrentPage("login")}
              className={
                currentPage === "login"
                  ? "pb-[1px] border-b-[1px] border-black"
                  : "pb-[1px] border-b-[1px] border-transparent"
              }
            >
              Login
            </span>
          ) : (
            <span
              onClick={() => setCurrentPage("account")}
              className={
                currentPage === "account"
                  ? "pb-[1px] border-b-[1px] border-black flex items-center space-x-1"
                  : "pb-[1px] border-b-[1px] border-transparent flex items-center space-x-1"
              }
            >
              <AiOutlineUser />
              <span>You</span>
            </span>
          )}
        </div>
      </main>
    </>
  );
};

export default Navbar;
