import React, {useContext} from 'react';
import CourseContext from '../../courseContext';
import SelectedCoursesListItem from './Item';
import CourseSearch from "../CourseSearch";

const SelectedCoursesList = () => {
  const [state,] = useContext(CourseContext)

  // If there are no courses selected, show the course search
  if (state.selectedCourseList.length === 0) {
    return (
      <div className="p-4 pr-2 mb-6 bg-white rounded-[12px] h-96">
        <div className="max-h-full pr-2 overflow-y-auto">
          <p className="text-gray-500">No courses selected yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 pr-2 bg-white rounded-[12px] h-96">
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
