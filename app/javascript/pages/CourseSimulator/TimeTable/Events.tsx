import React, {useContext} from 'react';
import CourseContext from '../Context';
import { TIME_LIST } from ".";
import Event from './Event';
import {GroupEventState} from '../Reducer';

const colipseEvents = (newEvent: GroupEventState, currentEvents: GroupEventState[]): boolean => {
  const result = currentEvents.find(event => {
    if((newEvent.wday !== event.wday)) return false;
    if(
      (newEvent.startedMinuteAt >= event.startedMinuteAt && newEvent.startedMinuteAt < event.endedMinuteAt) ||
      (newEvent.endedMinuteAt > event.startedMinuteAt && newEvent.endedMinuteAt <= event.endedMinuteAt) ||
      (newEvent.startedMinuteAt <= event.startedMinuteAt && newEvent.endedMinuteAt >= event.endedMinuteAt)
    ) return true
    return false;
  })
  if(result) return true
  return false
}

const Events = () => {
  const [state, ] = useContext(CourseContext)
  const {
    selectedCourseList,
    hoveredCourse
  } = state;


  return (
    <ol
      className="z-20 col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
      style={{ gridTemplateRows: `repeat(${TIME_LIST.length * 12}, 1fr)` }}
    >
      {
        selectedCourseList.map(course => (
          course.events.map(event => (
            <Event key={event.id} event={event} courseName={course.className}/>
            ))
        ))
      }
      {
        hoveredCourse && hoveredCourse.events.map(event => (
          <Event
            key={event.id}
            event={event}
            courseName={hoveredCourse.className}
            focus={true}
            hasConflict={colipseEvents(event, selectedCourseList.map(course => course.events).flat())}
          />
          ))
      }
</ol>
  )
}

export default Events;
