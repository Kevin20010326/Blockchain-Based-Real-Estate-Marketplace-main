import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-white">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  About Us
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  Contact Us
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-white">Legal</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-white">Social</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://www.facebook.com/profile.php?id=100055837221296"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  <FaFacebook className="inline-block mr-2 mb-1" /> Facebook
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://www.instagram.com/raisul_ronnie/"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  <FaInstagram className="inline-block mr-2 mb-1" /> Instagram
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://github.com/Ronnie-Ahmed"
                  className="hover:underline text-gray-300 hover:text-gray-100"
                >
                  <FaGithub className="inline-block mr-2 mb-1" /> Github
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase  mb-6 font-bold text-white">
              Developed By
            </h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:uppercase text-gray-300 hover:text-gray-100"
                >
                  MD Raisul Islam Rony
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:uppercase text-gray-300 hover:text-gray-100"
                >
                  Avishak Poddar
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="#"
                  className="hover:uppercase text-gray-300 hover:text-gray-100"
                >
                  Ferdous
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-white font-bold mb-2">
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
