import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";
import logo from "../images/glogo.png";

const Login = () => {
  const { signIn } = useAuth();
  return (
    <>
      <main className="flex flex-col items-center justify-center h-[600px]">
        <div className="flex space-x-2">
          <button
            className="bg-gray-200 w-fit p-2 rounded-md font-semibold"
            onClick={signIn}
          >
            Login With Google
          </button>
          <Image src={logo} alt="google logo" width={50} />
        </div>
      </main>
    </>
  );
};

export default Login;
