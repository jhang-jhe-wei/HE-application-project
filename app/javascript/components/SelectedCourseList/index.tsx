import React, {useContext} from 'react';
import CourseContext from '../../courseContext';
import SelectedCoursesListItem from './Item';

const SelectedCoursesList = () => {
  const [state, ] = useContext(CourseContext)

  return (
    <div className="p-4 pr-2 mt-4 bg-white rounded-md h-96">
      <div className="max-h-full pr-2 overflow-y-auto">
        {
          state.selectedCourseList.map(course => (
            <SelectedCoursesListItem key={course.id} {...course} />
            )
          )
        }
      </div>
    </div>
  )
}

export default SelectedCoursesList;
