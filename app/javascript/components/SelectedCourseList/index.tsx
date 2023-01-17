import React, {useContext} from 'react';
import CourseContext from '../../courseContext';
import SelectedCoursesListItem from './Item';
import CourseSearch from "../CourseSearch";

const SelectedCoursesList = () => {
  const [state,] = useContext(CourseContext)

  // If there are no courses selected, show the course search
  if (state.selectedCourseList.length === 0) {
    return (
      <div className="">
        <style jsx>
          {`
          .custom-height {
            height: calc(50vh - 4.5rem - 1.5rem);
          }
        `}
        </style>
        <h1 className="mb-2 mt-4 text-lg text-gray-600 h-8">My Courses</h1>
        <div className="grow p-4 pr-2 bg-white rounded-[12px] h-96">
          <div className="max-h-full pr-2 overflow-y-auto">
            <p className="text-gray-500">No courses selected yet</p>
          </div>
        </div>
      </div>

    )
  }

  return (
    <div className="">
      <style jsx>
        {`
          .custom-height {
            height: 24rem;
            max-height: calc(50vh - 4.5rem - 1.5rem - 2.5rem);
          }
        `}
      </style>
      <h1 className="mb-2 mt-4 text-lg text-gray-600 h-8">My Courses</h1>
      <div className="p-4 pr-2 bg-white rounded-[12px] custom-height">
        <div className="max-h-full pr-2 overflow-y-auto">
          {
            state.selectedCourseList.map(course => (
                <SelectedCoursesListItem key={course.id} {...course} />
              )
            )
          }
        </div>
      </div>
    </div>

  )
}

export default SelectedCoursesList;
