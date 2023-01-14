import React from 'react';
import UserIcon from "../../icons/user";
import LogOutIcon from "../../icons/logout";

const NavBar = ({activePage}) => {
  // if {activePage} is "index", then the index page is active
  // if {activePage} is "courses_list", then the courses list page is active

  return (
    <div className="flex justify-center p-4 bg-white">

      <style jsx>{`
        .active {
          color: rgb(58, 97, 215);
          font-weight: bold;
        }`}</style>

      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="ml-6 flex items-center">
          <a href="/" className="flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/HochschuleEsslingen_Logo_4c_DE.svg"
                 className="h-10"/>
          </a>

          <div className=" ml-10 flex items-center">
            <span className="text-xl">
              <a href="/" className={activePage === "index" ? "active" : ""}>Timetable</a>
            </span>
          </div>

          <div className=" ml-10 flex items-center">
            <span className="text-xl">
              <a href="/courses_list" className={activePage === "courses_list" ? "active" : ""}>Courses</a>
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
          <a href="#sign_out" onClick={() => {
            fetch('/users/sign_out', {method: 'DELETE'})
              .then(() => {
                // redirect the user to the login page or do something else
                window.location.href = '/';
              });
          }}>Logout</a>
        </div>

        <div className="flex items-center justify-center">
          <LogOutIcon/>
        </div>

      </div>
    </div>

  )
}

export default NavBar;
