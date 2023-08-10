import React from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <div className="w-screen">
      <div className="w-11/12 mx-auto flex max-h-[100px] min-h-[70px] justify-between items-center bg-slate-500">
        {/* <Dropdown /> */}
        <p className="text-3xl font-mono font-bold">ThreadIt</p>
        <div className="flex justify-center">
          <input
            className="p-3 rounded-l-full w-[400px]"
            type="text"
            placeholder="Search"
          />
          <CiSearch
            className="bg-white h-auto w-[50px] p-3 text-sm rounded-r-full "
            onClick={() => {
              console.log("first");
            }}
          />
        </div>
        <img
          className="w-[50px] rounded-full"
          src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
