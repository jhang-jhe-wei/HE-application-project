import React from 'react';
import { mountToWindow } from '../helpers/helper';
import CourseSearch from './CourseSearch';
import TimeTable from './TimeTable';
import SelectedCoursesList from './SelectedCoursesList';

const Home = () => {
  return (
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
  )
}

mountToWindow(Home, 'Home');
