import React, {useContext} from "react";
import { CourseGroupState, ReducerActions } from "../courseReducer";
import GroupIcon from "../icons/group";
import { default as Axios } from 'axios';
import CourseContext from "../courseContext";

export interface CourseSearchResultItemProps {
  classId?: number;
  className: string;
  group?: CourseGroupState;
}

const CourseSearchResultItem = (props: CourseSearchResultItemProps) => {
  const [, dispatch] = useContext(CourseContext)
  const {
    classId,
    className,
    group
  } = props;

  const postCourseRegisteration = async (id: number, type: string) => {
    Axios.post(`/course_register_records.json`, { course_register_record: { registerable_id: id, registerable_type: type }})
      .then((response) => {
          dispatch({ type: ReducerActions.SET_SELECTED_COURSE_LIST, payload: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return(
    <div className="flex justify-between p-2 mb-2 bg-gray-100">
      <div className="max-w-[80%]">
        <p className="truncate">
          { className }
        </p>
        <div>
          <p className="flex items-center text-sm">
            <GroupIcon/>
            <span className="ml-1">
              { group? group.name: 'No Grouping' }
            </span>
          </p>
        </div>
      </div>
      <button
        className="px-4 py-2 text-lg bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          const type = group? 'CourseTerminGroup': 'Course';
          const id = group? group.id: classId;
          postCourseRegisteration(id, type);
        }}
      >
        +
      </button>
    </div>
  )

}

export default CourseSearchResultItem;
