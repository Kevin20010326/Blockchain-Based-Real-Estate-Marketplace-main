import React, { useContext, useEffect } from "react";
import { UserContext } from "../component/constant";
import { Card } from "../component/Card";
import profile from "../assets/NIbp.gif";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

export const Buy = () => {
  const { contract } = useContext(UserContext);
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [allNFTsUpdated, setAllNFTsUpdated] = useState(false);

  const fetchData = async () => {
    const allnft = await contract.getAllNFTs();

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

    if (!dataFetched) {
      updateData((prev) => [...prev, ...jsonDataArray]);
      updateFetched(true);
    }
    setAllNFTsUpdated(false);
  };
  const handleButtonClick = () => {
    fetchData();
  };
  if (!allNFTsUpdated) {
    fetchData();
    setAllNFTsUpdated(true);
  }

  return (
    <div className="bg-gradient-to-b from-green-100 to-indigo-900 min-h-screen py-10">
      <div className="max-w-screen-xl mx-auto px-4 mt-10">
        <div className="flex flex-wrap justify-center gap-6 ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-5 rounded"
            onClick={handleButtonClick}
            style={{
              backgroundImage: `url(${profile})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundColor: "rgba(0, 0, 255, 0.5)", // 半透明藍色背景
              boxShadow: "0 2px 4px rgba(0, 0, 0, 2)",
              borderRadius: "8px",
              border: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "16px",
              fontWeight: "bold",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            MarketPlace
          </button>
          {data.map((item, key) => (
            <Card
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
  );
};
