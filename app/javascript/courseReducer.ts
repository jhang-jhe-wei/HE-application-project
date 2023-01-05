export interface GroupEventState {
  id: number;
  wday: number;
  endedMinuteAt: number;
  startedMinuteAt: number;
  place: string;
}

export interface CourseState {
  id: number;
  type: 'Course'| 'CourseTerminGroup';
  className: string;
  groupName: string;
  events: GroupEventState[];
}

export interface ReducerStateProps {
  selectedCourseList: CourseState[];
}

export const ReducerActions = {
  SET_SELECTED_COURSE_LIST: 'course$set_selected_course_list',
} as const

export type ReducerActionProps =
  | { type: typeof ReducerActions.SET_SELECTED_COURSE_LIST; payload: CourseState[] }

export const initReducer = (): ReducerStateProps => {
  return {
    selectedCourseList: []
  }
}

const Reducer = (state: ReducerStateProps, action: ReducerActionProps) => {
  switch (action.type) {
    case ReducerActions.SET_SELECTED_COURSE_LIST: {
      return {
        ...state,
        selectedCourseList: action.payload
      };
    }
    default:
      return state
  }
}

export default Reducer;
