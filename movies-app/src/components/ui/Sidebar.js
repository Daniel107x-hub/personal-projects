import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Sidebar.css";

function Sidebar({ children, isVisible, onClose }) {
  return (
    <>
      <div
        className={`rounded-l-xl bg-gray-800 w-[30%] h-screen top-0 z-10 fixed transition-all overflow-y-auto flex flex-col items-center text-zinc-200 p-2 ${
          isVisible ? "right-0" : "-right-1/3"
        }`}
      >
        <span
          className="absolute top-3 right-3 text-xl hover:text-red-400 cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose />
        </span>
        {children}
      </div>
      <div
        className={`overlay fixed top-0 left-0 w-screen h-screen ${
          isVisible ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>
    </>
  );
}

export default Sidebar;
