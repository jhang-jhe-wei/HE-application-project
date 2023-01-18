import React, { useState } from 'react';
import {GroupEventState} from '../Reducer';
import classNames from 'classnames';
import Modal from 'react-modal';

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
  focus?: boolean;
  hasConflict?: boolean;
}

const customStyles = {
  overlay: {
    zIndex: 100
  },
  content: {
    inset: '10% 20%',
  },
};

const Event = (props: EventProps) => {
  const {
    event,
    courseName,
    focus = false,
    hasConflict = false
  } = props;

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Course Detail"
      >
        <button onClick={closeModal}>close</button>
        <p>{JSON.stringify(props)}</p>
      </Modal>

      <li
        className={classNames('relative flex mt-px', {
          'animate-[scale-x_1s_linear_infinite]': focus
        })}
        style={{
          gridRow: `${calculateGridRowValue(event)}`,
            gridColumnStart: `${calculateColStartValue(event.wday)}` }
        }
        onClick={() => {
          openModal()
        }}
      >
          <a
            href="#"
            className={classNames("absolute flex flex-col p-2 overflow-y-auto text-xs rounded-lg inset-x-2 group bg-blue-50 leading-5 hover:bg-blue-100 h-full", { 'bg-red-300': hasConflict })}
          >
            <p className="order-1 font-semibold text-blue-700 break-words">{ courseName }</p>
            <p className="text-blue-500 break-words group-hover:text-blue-700">
              { calculateTimeDuration(event) }
            </p>
          </a>
        </li>

      </>
  )
}

export default Event;
