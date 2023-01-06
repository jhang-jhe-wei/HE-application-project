import React from 'react';
import {GroupEventState} from '../../courseReducer';

const calculateGridRowValue = (event: GroupEventState) => {
  const position = Math.floor((event.startedMinuteAt - 7 * 60) / 5) + 1
  const span = Math.round((event.endedMinuteAt - event.startedMinuteAt) / 5)
  return `${position} / span ${span}`
}

const calculateTimeDuration = (event: GroupEventState) => {
  const sHour = Math.floor(event.startedMinuteAt/60);
  const sMinute = (event.startedMinuteAt % 60).toString().padStart(2, '0');
  const eHour = Math.floor(event.endedMinuteAt/60);
  const eMinute = (event.endedMinuteAt % 60).toString().padStart(2, '0');
  return `${sHour}:${sMinute}~${eHour}:${eMinute}`
}

const calculateColStartValue = (wday: number) => {
  if(wday === 0) return 'col-start-7';
  return `col-start-${wday}`
}

interface EventProps {
  event: GroupEventState;
  courseName: string;
  className?: string;
}

const Event = (props: EventProps) => {
  const {
    event,
    courseName,
    className = ''
  } = props;

  return (
    <li className={`relative flex mt-px sm:${calculateColStartValue(event.wday)} ${className}`} style={{ gridRow: `${calculateGridRowValue(event)}` }}>
      <a
        href="#"
        className="absolute flex flex-col p-2 overflow-y-auto text-xs rounded-lg inset-x-2 group bg-blue-50 leading-5 hover:bg-blue-100"
      >
        <p className="order-1 font-semibold text-blue-700">{ courseName }</p>
        <p className="text-blue-500 group-hover:text-blue-700">
          { calculateTimeDuration(event) }
        </p>
      </a>
    </li>
  )
}

export default Event;
