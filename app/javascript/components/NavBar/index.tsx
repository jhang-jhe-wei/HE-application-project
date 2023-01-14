import React, {useContext} from 'react';
import UserIcon from "../../icons/user";
import LogOutIcon from "../../icons/logout";

// Get the username from the table users


const NavBar = () => {
  return (
    <div className="flex justify-center p-4 bg-white">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="ml-6 flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/HochschuleEsslingen_Logo_4c_DE.svg"
               className="h-10"/>

          <div className=" ml-10 flex items-center text-blue-600">
            <span className="text-xl font-semibold">
              <a href="/">Timetable</a>
            </span>
          </div>

          <div className=" ml-10 flex items-center">
            <span className="text-xl">
              <a href="/courses">Courses</a>
              </span>
          </div>

        </div>

      </div>

      <div className="mr-4 flex items-center">


        <span className="text-l mr-4">
          example00
        </span>

        <div className="flex items-center justify-center w-10 h-10 mr-2 text-white rounded-full">
          <UserIcon/>
        </div>

      </div>

      <div className="mr-4 flex items-center">

        <div className="mr-4 flex items-center text-red-500 hover:text-red-900 hover:text-bold">
          <a href="/#">Log out</a>
        </div>

        <div className="flex items-center justify-center">
          <LogOutIcon/>
        </div>

      </div>
    </div>

  )
}

export default NavBar;
