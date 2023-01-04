import { createContext, Dispatch } from "react"
import { initReducer, ReducerActionProps, ReducerStateProps } from "./courseReducer"
type CourseContextProps = [
  ReducerStateProps,
  Dispatch<ReducerActionProps>
]
const CourseContext = createContext<CourseContextProps>([
  initReducer(),
  () => {}
])
export default CourseContext

