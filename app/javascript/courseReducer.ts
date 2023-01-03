interface GroupEventState {
  id: number;
  started_date_on: Date | null;
  ended_date_on: Date | null;
  csi_url: string | null;
  teacher_name: string | null;
  place_url: string | null;
  place: string | null;
  frequency: string | null;
  wday: number | null;
  started_minute_at: number | null;
  ended_minute_at: number | null;
}

export interface CourseGroupState {
  id: number;
  name: string;
  events: GroupEventState[];
}

export interface Coursetate {
  id: number;
  name: string;
  class_url: string;
  semester: string;
  groups: CourseGroupState[];
}

export interface SelectedCourseState {
  id: number;
  className: string;
  groupName: string;
}

export interface ReducerStateProps {
  selectedCourseList: SelectedCourseState[];
}

export const ReducerActions = {
  SET_SELECTED_COURSE_LIST: 'course$set_selected_course_list',
} as const

export type ReducerActionProps =
    | { type: typeof ReducerActions.SET_SELECTED_COURSE_LIST; payload: SelectedCourseState[] }

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
