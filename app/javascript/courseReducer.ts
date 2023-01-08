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

export interface RegisteredCourseRecordState {
  id: number;
  className: string;
  groupName: string;
  events: GroupEventState[];
}

export interface ReducerStateProps {
  selectedCourseList: RegisteredCourseRecordState[];
  hoveredCourse: CourseState;
  alertText: string;
}

export const ReducerActions = {
  SET_SELECTED_COURSE_LIST: 'course$set_selected_course_list',
  SET_HOVERED_COURSE: 'course$set_hovered_course',
  SET_ALERT_TEXT: 'course$set_alert_text'
} as const

export type ReducerActionProps =
  | { type: typeof ReducerActions.SET_SELECTED_COURSE_LIST; payload: RegisteredCourseRecordState[] }
  | { type: typeof ReducerActions.SET_HOVERED_COURSE; payload: CourseState }
  | { type: typeof ReducerActions.SET_ALERT_TEXT; payload: string }

export const initReducer = (): ReducerStateProps => {
  return {
    selectedCourseList: [],
    hoveredCourse: undefined,
    alertText: 'Has conflict with OOS2'
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
    case ReducerActions.SET_HOVERED_COURSE: {
      return {
        ...state,
        hoveredCourse: action.payload
      };
    }
    case ReducerActions.SET_ALERT_TEXT: {
      return {
        ...state,
        alertText: action.payload
      };
    }
    default:
      return state
  }
}

export default Reducer;
