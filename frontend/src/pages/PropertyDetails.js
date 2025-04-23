import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../component/constant";
import axios from "axios";
import { useState } from "react";
import { ethers } from "ethers";

export const PropertyDetails = () => {
  const { contract, signer } = useContext(UserContext);
  const param = useParams();

  const [jsonData, updateJsonData] = useState({});
  const [owner, setOwner] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const [tokenId, setTokenId] = useState(0);

  const fetchdata = async () => {
    const allnft = await contract.getListedTokenForId(param.tokenID);
    setOwner(allnft.owner);
    setSeller(allnft.seller);
    setPrice(allnft.price.toString());
    setTokenId(allnft.tokenId.toNumber());

    const tokenuri = await contract.tokenURI(allnft.tokenId.toNumber());

    const response = await axios.get(tokenuri);

    updateJsonData(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-purple-100 to-indigo-900 py-10">
        <section className="flex flex-row items-center mx-4 px-1 md:mx-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-8 shadow-xl hover:shadow-2xl shadow-black transform transition-all duration-300 hover:scale-105 mb-8">
          <div>
            <img
              src={`https://ipfs.io/ipfs/${jsonData.image}`}
              alt="logo"
              className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-2xl shadow-black transform hover:scale-105 transition-all duration-300"
            />
          </div>

          <div className="mt-4 text-center">
            <div className="inline-block bg-indigo-400 text-white px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-black hover:-translate-y-1 transition-all duration-300">
              <p className="text-lg font-semibold">
                擁有者:{" "}
                <span className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-black">
                  {owner}
                </span>
              </p>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-block bg-indigo-400 text-white px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-black hover:-translate-y-1 transition-all duration-300">
                <p className="text-lg font-semibold">
                  賣家:{" "}
                  <span className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-black">
                    {seller}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-indigo-400 text-white px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-black hover:-translate-y-1 transition-all duration-300">
                <p className="text-lg font-semibold">
                  房屋名稱:{" "}
                  <span className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-black">
                    {jsonData.name}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-indigo-400 text-white px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-black hover:-translate-y-1 transition-all duration-300">
                <p className="text-lg font-semibold">
                  房屋描述:{" "}
                  <span className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-black">
                    {jsonData.description}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-indigo-400 text-white px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-black hover:-translate-y-1 transition-all duration-300">
                <p className="text-lg font-semibold">
                  房屋地址:{" "}
                  <span className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-black">
                    {jsonData.address}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-indigo-400 text-white px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-black hover:-translate-y-1 transition-all duration-300">
                <p className="text-lg font-semibold">
                  房屋價格:{" "}
                  <span className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-black">
                    {price} WEI
                  </span>
                </p>
              </div>
            </div>
            {/* <div className="mt-4 text-center">
              <div className="inline-block bg-red-800 text-black px-2 py-1 rounded-md shadow-md hover:shadow-2xl shadow-red-950 hover:-translate-y-1 transition-all duration-300">
                <p className="text-lg font-semibold">
                  <button
                    className="tw-animate-pulse tw-text-indigo-900 shadow-2xl shadow-red-950"
                    onClick={handleclick}
                  >
                    BUY PROPERTY
                  </button>
                </p>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
};
