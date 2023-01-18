import { createContext, Dispatch } from "react"
import { initReducer, ReducerActionProps, ReducerStateProps } from "./Reducer"
type CourseContextProps = [
  ReducerStateProps,
  Dispatch<ReducerActionProps>
]
const CourseContext = createContext<CourseContextProps>([
  initReducer(),
  () => {}
])
export default CourseContext

