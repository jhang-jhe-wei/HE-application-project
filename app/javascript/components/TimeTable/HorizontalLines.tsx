import React from "react"

const TIME_LIST = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
const HorizontalLines = () => {
  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: 'repeat(15, minmax(3.5rem, 1fr))' }}
    >
      {
        TIME_LIST.map(time => (
          <React.Fragment key={time}>
            <div>
              <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
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
