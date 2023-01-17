import React from "react"
import { TIME_LIST } from ".";

const HorizontalLines = () => {
  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: `repeat(${TIME_LIST.length}, minmax(3.5rem, 1fr))` }}
    >
      {
        TIME_LIST.map(time => (
          <React.Fragment key={time}>
            <div>
              <div className="sticky left-0 z-40 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                { `${time}:00` }
              </div>
            </div>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default HorizontalLines;
