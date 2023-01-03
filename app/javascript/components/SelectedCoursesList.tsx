import React, {useEffect, useState} from 'react';
import { default as Axios } from 'axios';

const SelectedCoursesList = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchSelectedCourse = async () => {
      Axios.get(`/course_register_records.json`)
        .then((response) => {
          setCourses(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchSelectedCourse()
  }, [])

  return (
    <div className="mt-4 bg-white rounded-md h-96">
      <p>
        {JSON.stringify(courses)}
      </p>
    </div>
  )
}

export default SelectedCoursesList;
