import React, { useReducer } from 'react';
import { mountToWindow } from '../helpers/helper';
import CourseSearch from './CourseSearch';
import TimeTable from './TimeTable';
import SelectedCoursesList from './SelectedCoursesList';
import CourseContext from '../courseContext';
import { default as CourseReducer, initReducer } from '../courseReducer';

const Home = () => {
  const [state, dispatch] = useReducer(CourseReducer, 0, initReducer)

  return (
    <CourseContext.Provider value={[state, dispatch]}>
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <CourseSearch/>
            <SelectedCoursesList/>
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
