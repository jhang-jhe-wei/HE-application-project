import React, {useReducer, useEffect} from 'react';
import {mountToWindow} from '../helpers/helper';
import CourseSearch from './CourseSearch';
import TimeTable from './TimeTable';
import SelectedCourseList from './SelectedCourseList';
import CourseContext from '../courseContext';
import {default as CourseReducer, initReducer, ReducerActions, RegisteredCourseRecordState} from '../courseReducer';
import {default as Axios} from 'axios';
import Alert from './TimeTable/Alert';

import HochschuleEsslingenLogo from "../icons/hs-logo";
import GroupIcon from "../icons/group";
import DeleteIcon from "../icons/delete";
import NavBar from "./NavBar";

const Home = () => {
  const [state, dispatch] = useReducer(CourseReducer, 0, initReducer)

  useEffect(() => {
    const fetchSelectedCourseList = async () => {
      Axios.get<RegisteredCourseRecordState[]>(`/course_register_records.json`)
        .then((response) => {
          dispatch({type: ReducerActions.SET_SELECTED_COURSE_LIST, payload: response.data})
        })
        .catch((error) => {
          dispatch({type: ReducerActions.SET_ALERT_TEXT, payload: error.response.data})
        })
    }
    fetchSelectedCourseList()
  }, [])

  return (
    <CourseContext.Provider value={[state, dispatch]}>
      <NavBar/>
      <Alert/>
      <div className="container mx-auto width">
        <div className="grid grid-cols-4 gap-6 max-h-full">

          <div className="pl-4 flex flex-col justify-between col-span-1 max-h-full">

            <CourseSearch/>

            <SelectedCourseList/>
          </div>

          <div className="col-span-3">
            <TimeTable/>
          </div>

        </div>
      </div>
    </CourseContext.Provider>
  )
}

mountToWindow(Home, 'Home');
