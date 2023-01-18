import React, {useReducer, useEffect} from 'react';
import {mountToWindow} from '../../helpers/helper';
import CourseSearch from './CourseSearch';
import TimeTable from './TimeTable';
import SelectedCourseList from './SelectedCourseList';
import CourseContext from './Context';
import {default as CourseReducer, initReducer, ReducerActions, RegisteredCourseRecordState} from './Reducer';
import {default as Axios} from 'axios';
import Alert from './TimeTable/Alert';
import CourseFullList from "./CourseFullList";

const CourseSimulator = () => {
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
      <div className="mt-[4.5rem] mb-[-4.5rem] ">
        <Alert/>
        <div className="container mx-auto width">
          <div id="grid" className="full-page-max-height grid grid-cols-4 gap-6">

            <div id="left-panel" className="flex flex-col col-span-1">
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

mountToWindow(CourseSimulator, 'CourseSimulator');

const CoursesPage = () => {

  const [_state, dispatch] = useReducer(CourseReducer, 0, initReducer)

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
      <div className="container mx-auto full-page-max-height width">
        <div className="pt-6 pb-20">
          <CourseFullList/>
        </div>
      </div>
    </div>
  )
}

mountToWindow(CoursesPage, 'courses_list');
