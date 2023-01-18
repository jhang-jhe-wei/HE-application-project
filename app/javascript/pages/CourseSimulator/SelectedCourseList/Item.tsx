import React, {useContext} from 'react';
import CourseContext from '../Context';
import { RegisteredCourseRecordState } from '../Reducer';
import GroupIcon from '../../../icons/group';
import { default as Axios } from 'axios';
import { ReducerActions } from '../Reducer';
import DeleteIcon from "../../../icons/delete";

const SelectedCoursesListItem = (props: RegisteredCourseRecordState) => {
  const [, dispatch] = useContext(CourseContext)
  const {
    id,
    className,
    groupName
  } = props;

  const cancelCourseRegistration = async (id: number) => {
    Axios.delete(`/course_register_records/${id}.json`)
      .then((response) => {
        dispatch({ type: ReducerActions.SET_SELECTED_COURSE_LIST, payload: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
      <div className="max-w-[80%] pr-2">
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
        className="px-4 py-2 text-lg text-white bg-red-400 hover:bg-red-500 rounded-md"
        onClick={() => {
          cancelCourseRegistration(id)
        }}
      >
          <DeleteIcon/>
      </button>
    </div>
  )
}

export default SelectedCoursesListItem;
