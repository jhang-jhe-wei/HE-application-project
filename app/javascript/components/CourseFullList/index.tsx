import React, {useEffect, useState, useCallback, useRef} from 'react';
import InfiniteScroll from "react-infinite-scroller";
import {default as Axios} from "axios";
import {CourseState} from "../../courseReducer";
import CourseSearch from "../CourseSearch";

const CourseFullList = () => {


  return (
    <div className="container mx-auto width mt-[4.5rem]">
      <CourseSearch contentSize={"big"}/>
    </div>
  )
}


export default CourseFullList