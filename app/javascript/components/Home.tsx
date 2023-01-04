import React, { useReducer, useEffect } from 'react';
import { mountToWindow } from '../helpers/helper';
import CourseSearch from './CourseSearch';
import TimeTable from './TimeTable';
import SelectedCourseList from './SelectedCourseList';
import CourseContext from '../courseContext';
import { default as CourseReducer, initReducer, ReducerActions, SelectedCourseState } from '../courseReducer';
import { default as Axios } from 'axios';

const Home = () => {
  const [state, dispatch] = useReducer(CourseReducer, 0, initReducer)

  useEffect(() => {
    const fetchSelectedCourseList = async () => {
      Axios.get<SelectedCourseState[]>(`/course_register_records.json`)
        .then((response) => {
          dispatch({ type: ReducerActions.SET_SELECTED_COURSE_LIST, payload: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchSelectedCourseList()
  }, [])

  return (
    <CourseContext.Provider value={[state, dispatch]}>
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col justify-between col-span-1">
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
