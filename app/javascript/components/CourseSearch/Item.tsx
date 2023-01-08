import React, {useContext} from "react";
import { CourseState, ReducerActions } from "../../courseReducer";
import GroupIcon from "../../icons/group";
import { default as Axios } from 'axios';
import CourseContext from "../../courseContext";

const CourseSearchResultItem = (course: CourseState) => {
  const [, dispatch] = useContext(CourseContext)
  const {
    id,
    className,
    groupName,
    type
  } = course;

  const postCourseRegisteration = async (id: number, type: string) => {
    Axios.post(`/course_register_records.json`, { course_register_record: { registerable_id: id, registerable_type: type }})
      .then((response) => {
          dispatch({ type: ReducerActions.SET_SELECTED_COURSE_LIST, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: ReducerActions.SET_ALERT_TEXT, payload: error })
      })
  }

  return(
    <li className="flex justify-between p-2 mb-2 bg-gray-100">
      <div className="max-w-[80%]">
        <p className="truncate">
          { className }
        </p>
        <div>
          <p className="flex items-center text-sm">
            <GroupIcon/>
            <span className="ml-1">
              { groupName }
            </span>
          </p>
        </div>
      </div>
      <button
        className="px-4 py-2 text-lg bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          postCourseRegisteration(id, type);
        }}
        onMouseEnter={()=> dispatch({ type: ReducerActions.SET_HOVERED_COURSE, payload: course })}
        onMouseLeave={()=> dispatch({ type: ReducerActions.SET_HOVERED_COURSE, payload: undefined })}
      >
        +
      </button>
    </li>
  )

}

export default CourseSearchResultItem;
