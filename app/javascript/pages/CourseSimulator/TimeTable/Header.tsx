import React from "react"
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const Header = () => {
  return (
    <div id="find-4-dsfa" className="sticky top-0 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8 z-40" >

      <div className="hidden -mr-px text-sm text-gray-500 border-r border-gray-100 grid-cols-7 divide-x divide-gray-100 leading-6 sm:grid">
        <div className="col-end-1 w-14" />
        {
          DAYS.map(day => (
            <div key={day} className="flex items-center justify-center py-3">
              <span>
                { day }
              </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Header;
