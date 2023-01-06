import React from 'react';
import {GroupEventState} from '../../courseReducer';
import classNames from 'classnames';

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
  if(wday === 0) return 7;
  return wday
}

interface EventProps {
  event: GroupEventState;
  courseName: string;
  hasConflict?: boolean;
}

const Event = (props: EventProps) => {
  const {
    event,
    courseName,
    hasConflict = false
  } = props;

  return (
    <li
      className={classNames('relative flex mt-px', {
      'animate-[scale-x_1s_linear_infinite]': hasConflict
    })}
    style={{
      gridRow: `${calculateGridRowValue(event)}`,
      gridColumnStart: `${calculateColStartValue(event.wday)}` }
    }>
      <a
        href="#"
        className={classNames("absolute flex flex-col p-2 overflow-y-auto text-xs rounded-lg inset-x-2 group bg-blue-50 leading-5 hover:bg-blue-100", { 'bg-red-300': hasConflict })}
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
