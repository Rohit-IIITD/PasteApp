import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full gap-4 place-content-around bg-blue-950">
      <div className="w-full flex flex-row justify-evenly items-center mx-auto text-xl font-semibold p-2">
        <div className="hover:text-blue-400 text-white">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="hover:text-blue-400 text-white">
          <NavLink to="/pastes">Pastes</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



