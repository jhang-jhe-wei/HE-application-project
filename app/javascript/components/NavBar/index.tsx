import React, {useContext} from 'react';
import UserIcon from "../../icons/user";

const NavBar = () => {
  return (
    <div className="flex justify-center p-4 bg-white">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="ml-6 flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/HochschuleEsslingen_Logo_4c_DE.svg"
               className="h-10"/>

          <div className=" ml-10 flex items-center text-blue-600">
            <span className="text-xl font-semibold">Timetable</span>
          </div>

          <div className=" ml-10 flex items-center">
            <span className="text-xl">Courses</span>
          </div>


        </div>




      </div>

      <div className="mr-4 flex items-center">
        <div className="flex items-center justify-center w-10 h-10 mr-2 text-white  rounded-full">
          <UserIcon/>
        </div>
        <span className="text-l">example00@hs-esslingen.de</span>
      </div>
    </div>

  )
}

export default NavBar;
