import React, {useEffect, useState} from 'react';
import { default as Axios } from 'axios';
import { CourseState } from '../courseReducer';
import { default as ResultItem } from './CourseSearchResultItem';

const CourseSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [courses, setCourses] = useState<CourseState[]>([])

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
        type="Search"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
        className="block w-full p-4 placeholder-gray-400 border border-gray-100 rounded-md bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
      />
      <div className="p-4 pr-2 mt-4 bg-white rounded-md h-96">
        <div className="max-h-full pr-2 overflow-y-auto">
          {
            courses.map(course => (
              course.groups.length === 0 ?
              <ResultItem key={`course-${course.id}`} className={course.name}/>
              :
              course.groups.map(group => (
                <ResultItem key={`course-${course.id}-group-${group.id}`} className={course.name} group={group}/>
                ))
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CourseSearch;
