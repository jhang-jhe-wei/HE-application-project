import React, {useContext} from 'react';
import CourseContext from '../courseContext';

const SelectedCoursesList = () => {
  const [state, ] = useContext(CourseContext)

  return (
    <div className="mt-4 bg-white rounded-md h-96">
      <p>
        {JSON.stringify(state.selectedCourseList)}
      </p>
    </div>
  )
}

export default SelectedCoursesList;
