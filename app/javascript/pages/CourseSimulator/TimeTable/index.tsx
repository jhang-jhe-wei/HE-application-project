import React from 'react'
import Header from './Header'
import HorizontalLines from './HorizontalLines';
import VerticalLines from './VerticalLines';
import Events from './Events';

export const TIME_LIST = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
const TimeTable = () => {

  return (
    <div>
      <div className="full-page-max-height flex flex-col h-full pt-6">
        <div className="flex flex-col flex-auto overflow-auto bg-white isolate rounded-[12px]">
          <div className="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full">
            <Header/>

            <div className="flex flex-auto">
              <div id="left-hours" className="sticky left-0 z-10 flex-none bg-white w-14 ring-1 ring-gray-100"/>
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
    </div>
  )
}

export default TimeTable;
