import React from "react";
import { UserContext } from "./constant";
import { ethers } from "ethers";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export const Card3 = ({
  image,
  tokenId,
  name,
  price,
  description,
  accountaddress,
  owner,
  seller,
}) => {
  const { contract, signer } = useContext(UserContext);

  const handleclick = async () => {
    // const newPrice = ethers.utils.formatEther(price);

    try {
      if (window.ethereum) {
        const tx = await contract.executeSale(tokenId, {
          value: price,
        });
        await tx.wait();
        alert(
          `Property ${name} bought by ${await signer.getAddress()} successfully`
        );
      } else {
        alert("Please install MetaMask");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-2xl shadow-white flex flex-col">
      <img
        className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg shadow-2xl shadow-white border-gray-300 cursor-pointer "
        src={image}
        alt="logo"
      />
      <div className="px-6 py-4 flex-grow flex items-center justify-center">
        <span className="inline-block text-3xl bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-white bg-clip-text text-transparent rounded-full px-4 py-2 font-bold tracking-wide shadow-lg border-2 border-white">
          價格: {price} WEI
        </span>
      </div>
      <div className="px-6 py-4 flex justify-center gap-4">
        <Link to={`/buy/${tokenId}`}>
          <button className="button-86">詳細資訊</button>
        </Link>
      </div>
    </div>
  );
};
