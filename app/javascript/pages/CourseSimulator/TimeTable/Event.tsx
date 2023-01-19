import React, { useState } from 'react';
import { GroupEventState } from '../Reducer';
import classNames from 'classnames';
import Modal from 'react-modal';
import CloseIcon from "../../../icons/close";
import LocationIcon from "../../../icons/location";
import CalendarIcon from "../../../icons/calendar";
import RepeatIcon from "../../../icons/repeat";

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

const calculateTimeStart = (event: GroupEventState) => {
  const sHour = Math.floor(event.startedMinuteAt/60);
  const sMinute = (event.startedMinuteAt % 60).toString().padStart(2, '0');
  return `${sHour}:${sMinute}`
}

const calculateTimeEnd = (event: GroupEventState) => {
  const eHour = Math.floor(event.endedMinuteAt/60);
  const eMinute = (event.endedMinuteAt % 60).toString().padStart(2, '0');
  return `${eHour}:${eMinute}`
}

const calculateDay = (wday: number) => {
  if(wday === 1) return 'Monday';
  if(wday === 2) return 'Tuesday';
  if(wday === 3) return 'Wednesday';
  if(wday === 4) return 'Thursday';
  if(wday === 5) return 'Friday';
  if(wday === 6) return 'Saturday';
  if(wday === 0) return 'Sunday';
  return wday

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
    zIndex: 100,
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  content: {
    height: 'min-content',
    width: '60%',
    minWidth: 'min-content',
    // position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1.5rem',
    borderStyle: 'solid',
    borderRadius: '1rem',
  },
};

const mq = window.matchMedia("(max-width: 768px)");
if (mq.matches) {
  customStyles.content.width = '100%';
  customStyles.content.borderStyle = 'none';
  customStyles.content.borderRadius = '0';
}

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
        <h1 className="text-2xl">{courseName}</h1>

        <div className="flex text-lg break-words">
          <div className="w-1/3 py-8 mr-4 font-bold text-right space-y-2">
            <p>Day</p>
            <p>Begins</p>
            <p>Ends</p>
            <p>Location & Class</p>
            <p>Frequency</p>
          </div>
          <div className="w-2/3 py-8 ml-4 space-y-2">
            <p>{calculateDay(event.wday) }</p>
            <p className="flex items-center gap-2 fill-black">
            <CalendarIcon/>
              { calculateTimeStart(event) }
            </p>
            <p className="flex items-center gap-2 fill-black">
            <CalendarIcon/>
              { calculateTimeEnd(event) }
            </p>
            <p className="flex items-center gap-2 fill-black">
              <LocationIcon/>
              { event.place }
            </p>
            <p className="flex items-center gap-2 fill-black">
              <RepeatIcon/>
              &nbsp;
              { event.frequency }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div></div>
          <button onClick={closeModal} className="place-self-end fill-white text-white text-md font-medium rounded-md bg-blue-500 p-2 px-6 h-[3rem] hover:bg-blue-600 ">
            <div className="flex items-center justify-center gap-4">
              <p>Close course description</p>
              <CloseIcon />
            </div>
          </button>
        </div>

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
