import React from 'react';
import UserIcon from "../../icons/user";
import LogOutIcon from "../../icons/logout";
import HSLogo from '../../images/HS-logo.png';

const NavBar = ({activePage}) => {
  // if {activePage} is "index", then the index page is active
  // if {activePage} is "courses_list", then the courses list page is active

  return (
    <div>
      <div className="flex justify-center p-4 bg-white fixed top-0 w-full h-[4.5rem] z-100">

        <div className="flex items-center justify-between w-full max-w-7xl">
          <div className="flex items-center">

            <a href="/" className="flex items-center">
              <img src={ HSLogo }
                   className="h-10" alt="Hochschule Esslingen"/>
            </a>

            <div className=" ml-10 flex items-center">
              <span className="text-lg">
                <a href="/" className={activePage === "index" ? "text-blue-600 font-semibold" : ""}>Timetable</a>
              </span>
            </div>

            <div className=" ml-10 flex items-center">
              <span className="text-lg">
                <a href="/courses_list"
                   className={activePage === "courses_list" ? "text-blue-600 font-semibold" : ""}>Courses</a>
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

        <div className="mr-4 flex items-center fill-red-500 hover:fill-red-900 text-red-500 hover:text-red-900">
          <a href="#sign_out" onClick={() => {
            fetch('/users/sign_out', {method: 'DELETE'})
              .then(() => {
                // TODO: redirect the user to the login page or do something else
                window.location.href = '/';
              });
          }}>
            <div className="mr-4 flex items-center">
              Logout
            </div>

          </a>

          <div className="flex items-center justify-center">
            <LogOutIcon/>
          </div>

        </div>

      </div>
    </div>
  )
}

export default NavBar;
