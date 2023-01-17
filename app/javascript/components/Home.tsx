import React, {useReducer, useEffect} from 'react';
import {mountToWindow} from '../helpers/helper';
import CourseSearch from './CourseSearch';
import TimeTable from './TimeTable';
import SelectedCourseList from './SelectedCourseList';
import CourseContext from '../courseContext';
import {default as CourseReducer, initReducer, ReducerActions, RegisteredCourseRecordState} from '../courseReducer';
import {default as Axios} from 'axios';
import Alert from './TimeTable/Alert';
import NavBar from "./NavBar";
import CourseFullList from "./CourseFullList";

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
      <NavBar activePage={"index"}/>
      <div className="mt-[4.5rem] mb-[-4.5rem] ">
        <Alert/>
        <div className="container mx-auto width">
          <div id="grid" className="full-page-max-height grid grid-cols-4 gap-6">

            <div id="left-panel" className="col-span-1 flex flex-col">
              <CourseSearch contentSize={"small"}/>
              <SelectedCourseList/>
            </div>

            <div id="timetable" className="col-span-3">
              <TimeTable/>
            </div>

          </div>
        </div>
      </div>
    </CourseContext.Provider>
  )
}

mountToWindow(Home, 'Home');

const CoursesPage = () => {

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
    <div>
      <NavBar activePage={"courses_list"}/>
      <div className="full-page-max-height container mx-auto width">
        <div className="pt-6 pb-20">
          <CourseFullList/>
        </div>
      </div>
    </div>
  )
}

mountToWindow(CoursesPage, 'courses_list');
