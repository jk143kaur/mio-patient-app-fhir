import React, { useState } from "react";
import { FaBars, FaUserDoctor } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isNavOpen, setNavOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMenuToggle = (): void => {
    setNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="w-screen h-20 bg-gray-100 flex justify-between items-center">
        <div
          className="mx-10 flex items-center hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaUserDoctor
            color="blue"
            className="mx-2 cursor-pointer"
            size={30}
          />
          <h2 className="text-lg font-semibold text-blue-600 cursor-pointer">
            Patients Manager
          </h2>
        </div>

        <div className="hidden md:flex">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            My Patients
          </button>
          <button className="px-4 ml-6 mr-16 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Profile
          </button>
        </div>

        {isNavOpen ? (
          <IoIosClose
            className="md:hidden size-8 mx-10 cursor-pointer"
            onClick={handleMenuToggle}
          />
        ) : (
          <FaBars
            className="md:hidden mx-10 cursor-pointer"
            onClick={handleMenuToggle}
          />
        )}
      </div>

      {isNavOpen && (
        <div className="md:hidden top-0 fixed bg-blue-500 h-screen w-[60%] z-10 transition-transform duration-500 ease-in-out">
          <ul>
            <li
              className="border-b border-gray-100 px-2 py-3 text-gray-100 cursor-pointer"
              onClick={() => navigate("/")}
            >
              My Patients
            </li>
            <li className="border-b border-gray-100 px-2 py-3 text-gray-100 cursor-pointer">
              Profile
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
