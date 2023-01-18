import React, {useContext} from 'react';
import CourseContext from '../Context';
import {ReducerActions} from '../Reducer';
import InfoIcon from "../../../icons/info";

const Alert = () => {
  const [state, dispatch] = useContext(CourseContext)
  if (state.alertTexts.length === 0) return;
  return (
    <div className="flex justify-center p-4 text-yellow-700 bg-yellow-100 fixed top-4.5rem w-full z-90" role="alert">
      <InfoIcon/>
      <span className="sr-only">Info</span>
      <ul className="ml-3 text-sm font-medium">
        {
          state.alertTexts.map(text => (
            <li key={text}>{text}</li>
          ))
        }
      </ul>
      <button
        type="button"
        className="ml-3"
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={() => {
          dispatch({type: ReducerActions.SET_ALERT_TEXT, payload: []})
        }}
      >
        <span className="sr-only">Close</span>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  )
}

export default Alert;
