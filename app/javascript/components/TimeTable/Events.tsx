import React, {useContext} from 'react';
import CourseContext from '../../courseContext';
import { TIME_LIST } from ".";
import Event from './Event';

const Events = () => {
  const [state, ] = useContext(CourseContext)

  return (
    <ol
      className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
      style={{ gridTemplateRows: `repeat(${TIME_LIST.length * 12}, 1fr)` }}
    >
      {
        state.selectedCourseList.map(course => (
          course.events.map(event => (
            <Event event={event} courseName={course.className}/>
            ))
        ))
      }
    </ol>
  )
}

export default Events;
