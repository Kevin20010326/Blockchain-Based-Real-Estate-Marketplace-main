import React from "react";
import image from "../assets/giphy.gif";

import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../component/constant";

import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const projectId = "2NUvwy5K9EzmrmotQqVH303hmvV";
const projectSecret = "645df3033ab65599cf00069126867730";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
export const Sell = () => {
  const { contract, account } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    address: "",
    accountaddress: account,
  });

  const [imgurl, setimgurl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, address, accountaddress } = formData;

    const buffer = await imgurl.arrayBuffer();
    const { cid } = await ipfs.add(buffer);
    const data = {
      name: name,
      price: price,
      description: description,
      image: cid.toString(),
      address: address,
      accountaddress: accountaddress,
    };
    const result = await ipfs.add({
      path: cid.toString(),
      content: Buffer.from(JSON.stringify(data)),
    });

    const listingprice = ethers.utils.parseEther((0.01).toString());

    const tx = await contract.createToken(
      `https://ipfs.io/ipfs/${result.cid.toString()}`,
      price,
      {
        value: listingprice,
      }
    );
    await tx.wait();
    alert("Property Minted Successfully");
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);

  //     const jsonData = response.data;
  //     console.log(jsonData);

  //     setipfsdata([...ipfsdata, jsonData]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-900 py-10">
      <div className="max-w-md mx-auto mt-16 bg-gray-800 rounded-lg shadow-2xl shadow-current overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <img
            src={image}
            alt="logo"
            className="w-full h-48 object-center object-cover my-7 mt-16"
          />
          <div>
            <label
              htmlFor="account"
              className="block text-gray-100 font-bold mb-2"
            >
             房屋名稱
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="房屋名稱"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-gray-100 font-bold mb-2"
            >
              價格
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price of the Property"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-gray-100 font-bold mb-2"
            >
              房屋地址
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="房屋地址"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-gray-100 font-bold mb-2"
            >
             賣家地址
            </label>
            <input
              type="text"
              name="accountaddress"
              value={formData.accountaddress}
              onChange={(e) =>
                setFormData({ ...formData, accountaddress: e.target.value })
              }
              placeholder={
                formData.accountaddress
                  ? formData.accountaddress
                  : "Enter your wallet Address"
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-gray-100 font-bold mb-2"
            >
              說明
            </label>
            <textarea
              type="string"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-gray-100 font-bold mb-2"
            >
              選擇圖片
            </label>
            <input
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setimgurl(e.target.files[0]);
              }}
              required
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:shadow-outline mb-10"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
