import Account from "@/components/Account";
import Contact from "@/components/Contact";
import Landing from "@/components/Landing";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");

  const showPage = () => {
    switch (currentPage) {
      case "home":
        return <Landing />;
      case "products":
        return <Products />;
      case "contact":
        return <Contact />;
      case "login":
        return <Login />;
      case "account":
        return <Account />;
      default:
        return <Landing />;
    }
  };

  return (
    <>
      <Head>
        <title>Scentique</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-b from-gray-200 to-red-600 h-screen w-screen scrollbar-thin scrollbar-thumb-red-800">
        <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        {showPage()}
        {currentPage !== "home" ||
          (currentPage !== "products" && (
            <div className="flex items-center justify-center">
              <span
                onClick={() => {
                  setCurrentPage("products");
                }}
                className="bg-white bg-opacity-50 text-sm p-1 rounded-md m-3"
              >
                Browse All Products
              </span>
            </div>
          ))}
      </main>
    </>
  );
}
