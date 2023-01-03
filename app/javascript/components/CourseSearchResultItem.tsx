import React from "react";
import {CourseGroupState} from "../courseReducer";
import GroupIcon from "../icons/group";

export interface CourseSearchResultItemProps {
  className: string;
  group?: CourseGroupState;
}

const CourseSearchResultItem = (props: CourseSearchResultItemProps) => {
  const {
    className,
    group
  } = props;

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
      <button className="px-4 py-2 text-lg bg-gray-200 hover:bg-gray-300">+</button>
    </div>
  )

}

export default CourseSearchResultItem;
