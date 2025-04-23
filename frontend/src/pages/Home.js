import React from "react";
import image from "../assets/giphy3.gif";
import buyproperty from "../assets/Buyproperty.jpg";
import sellproperty from "../assets/SellProperty.jpg";
import profile from "../assets/profile.jpeg";
import { UserContext } from "../component/constant";
import { useEffect, useContext, useState } from "react";
import "./Home.css";
import { Card2 } from "../component/Card2";

export const Home = () => {
  const { contract } = useContext(UserContext);
  const [state, setState] = useState("CONNECT WALLET");

  const handleclick = async () => {
    if (contract !== null) {
      setState("錢包連結");
    }
  };

  useEffect(() => {
    handleclick();
  }, []);

  return (
    <div className="bg-gray-100">
      <section
        className="relative h-screen"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center  justify-center">
          <div className="text-zinc-950 text-center p-4 rounded-lg shadow-2xl shadow-black bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-opacity-75 hover:bg-gradient-to-r hover:from-purple-900 hover:via-indigo-900 hover:to-blue-900 hover:shadow-lg transition-all duration-300 hover:text-white">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to the BLockEstate
            </h1>
            <p className="text-lg">Please Connect Your Wallet</p>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-40">
          <button class="button-82-pushable" onClick={handleclick}>
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">{state}</span>
          </button>
        </div>
      </section>

      <div className="cards">
        <h1 className="text-white text-4xl">Browse Througn Our Services</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <Card2
                src={buyproperty}
                text="Click --------> Buy Page"
                label="Buy"
                path="/buy"
              />
              <Card2
                src={sellproperty}
                text="Click --------> Sell Page"
                label="Sell"
                path="/sell"
              />
              <Card2
                src={profile}
                text="Click --------> Profile Page"
                label="User Profile"
                path="/userprofile"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
