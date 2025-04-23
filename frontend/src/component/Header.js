import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/Logo.png";
import { UserContext } from "./constant";
import { useContext } from "react";
import { ethers } from "ethers";
import { abi, address } from "./constant";

export const Header = () => {
  const [addHidden, setHidden] = useState("");

  const handleToggleMenu = () => {
    setHidden(addHidden === "" ? "hidden" : "");
  };
  const {
    setContract,
    setProvider,
    setSigner,
    setaccount,
    setbalance,
    setState,
  } = useContext(UserContext);
  const fetchData = async () => {
    try {
      if (window.ethereum) {
        const newprovider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newprovider);
        await newprovider.send("eth_requestAccounts", []);
        const newsigner = newprovider.getSigner();
        const bal2 = ethers.utils.formatEther(await newsigner.getBalance());
        setbalance(bal2);
        setSigner(newsigner);
        const newcontract = new ethers.Contract(address, abi, newsigner);
        setContract(newcontract);
        const account = await newsigner.getAddress();
        setaccount(account);
        setState("WALLET CONNECTED");
        console.log("wallet connected");
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={image} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BlockEstate
          </span>
        </Link>
        <button
          onClick={handleToggleMenu}
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="false"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${addHidden} w-full md:block md:w-auto`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/buy"
                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Buy
              </Link>
            </li>
            <li>
              <Link
                to="/sell"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sell
              </Link>
            </li>
            <li>
              <Link
                to="/userprofile"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                User Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
