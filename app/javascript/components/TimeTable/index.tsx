import React  from 'react'
import Header from './Header'
import HorizontalLines from './HorizontalLines';
import VerticalLines from './VerticalLines';
import Events from './Events';

const TimeTable = () => {

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-auto overflow-auto bg-white isolate">
        <div className="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full">
          <Header/>

          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 flex-none bg-white w-14 ring-1 ring-gray-100" />
            <div className="flex-auto grid grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <HorizontalLines/>

              {/* Vertical lines */}
              <VerticalLines/>

              {/* Events */}
              <Events/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTable;
