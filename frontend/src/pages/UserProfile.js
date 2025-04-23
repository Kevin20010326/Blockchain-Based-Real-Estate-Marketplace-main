import React from "react";
import image from "../assets/userProfileBackground.jpg";
import image2 from "../assets/giphy4.gif";
import { UserContext } from "../component/constant";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Card3 } from "../component/Card3";
import { useState } from "react";
import axios from "axios";
export const UserProfile = () => {
  const { account, balance, contract } = useContext(UserContext);
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [allNFTsUpdated, setAllNFTsUpdated] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const fetchData = async () => {
    const allnft = await contract.getMyNFTs();
    setIsToggled(!isToggled);
    const promises = allnft.map(async (item) => {
      const tokenuri = await contract.tokenURI(item.tokenId.toNumber());
      const response = await axios.get(tokenuri);
      const jsonData = response.data;
      jsonData.tokenId = item.tokenId.toNumber();

      return {
        tokenId: item.tokenId,
        name: jsonData.name,
        price: item.price.toString(),
        description: jsonData.description,
        accountaddress: jsonData.accountaddress,
        image: `https://ipfs.io/ipfs/${jsonData.image}`,
        owner: item.owner,
        seller: item.seller,
      };
    });

    const jsonDataArray = await Promise.all(promises);
    console.log(jsonDataArray.tokenId);

    if (!dataFetched) {
      updateData((prev) => [...prev, ...jsonDataArray]);
      updateFetched(true);
    }
    setAllNFTsUpdated(false);
  };

  const randomPhotoUrl = `${image2}`;
  return (
    <div>
      <section>
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-100 to-indigo-900">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="relative max-w-md bg-blue-200 bg-opacity-30 hover:bg-opacity-100 rounded-lg shadow-2xl shadow-white p-6">
            <div className="mb-6">
              <img
                src={randomPhotoUrl}
                alt="Random"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Wallet Address:</h3>
              <p className="text-gray-900">{account}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Balance:</h3>
              <p className="text-gray-900">{balance} Ethers</p>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg border-2 border-white transform transition duration-300 ease-in-out hover:scale-110"
                onClick={fetchData}
              >
                財產列表
              </button>
            </div>
          </div>
        </div>
      </section>
      {isToggled ? (
        <section>
          <div className="min-h-screen py-10 bg-gradient-to-b from-blue-950 to-gray-700 bg-opacity-50">
            <div className="max-w-screen-xl mx-auto px-4 mt-10">
              <div className="flex flex-wrap justify-center gap-6">
                {data.map((item, key) => (
                  <Card3
                    key={item.tokenId}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    accountaddress={item.accountaddress}
                    image={item.image}
                    tokenId={item.tokenId}
                    owner={item.owner}
                    seller={item.seller}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p></p>
      )}
    </div>
  );
};
