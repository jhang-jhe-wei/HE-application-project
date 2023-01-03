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

export interface CourseState {
  id: number;
  name: string;
  class_url: string;
  semester: string;
  groups: CourseGroupState[];
}
