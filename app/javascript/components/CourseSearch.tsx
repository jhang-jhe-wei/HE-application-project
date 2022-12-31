import React, {useEffect, useState} from 'react';
import { default as Axios } from 'axios';
import { CourseState } from '../courseReducer';

const CourseSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [courses, setCourses] = useState([])

  useEffect(() => {
    console.log(searchText)
    if(!searchText) {
      setCourses([])
      return
    }
    const fetchCourse = async (q: string) => {
      Axios.get<CourseState[]>(`/courses.json`, { params: { q } })
        .then((response) => {
          setCourses(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchCourse(searchText);
  }, [searchText])
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
        className="block w-full p-4 placeholder-gray-400 border border-gray-100 rounded-md bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
      />
      <div className="p-4 pr-2 mt-4 bg-white rounded-md h-96">
        <div className="max-h-full pr-2 overflow-y-auto">
          {
            courses.map(course => (
              <div key={course.id} className="flex justify-between p-2 mb-2 bg-gray-100">
                <div className="max-w-[80%]">
                  <p className="truncate">
                    { course.name }
                  </p>
                  <div>
                    <p className="text-sm">
                      { course.teacher_name }
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-lg bg-gray-200 hover:bg-gray-300">+</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CourseSearch;
