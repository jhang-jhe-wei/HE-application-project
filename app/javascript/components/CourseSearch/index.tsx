import React, {useEffect, useState, useCallback, useRef} from 'react';
import {default as Axios} from 'axios';
import {CourseState} from '../../courseReducer';
import {default as ResultItem} from './Item';
import InfiniteScroll from 'react-infinite-scroller';

interface FetchCoursesResponseState {
  courses: CourseState[];
  nextPage: null | number;
}

const fetchCourses = async (q: string, page: number) => {
  return Axios.get<FetchCoursesResponseState>(`/courses.json`, {params: {q, page}})
}

const CourseSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [courses, setCourses] = useState<CourseState[]>([])
  const [fetching, setFetching] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const scrollParentRef = useRef();

  const fetchMoreCourses = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      if (searchText === '') {
        setCourses([]);
        return;
      }

      setFetching(true);
      fetchCourses(searchText, nextPage)
        .then((response) => {
          const {courses: newCourses, nextPage} = response.data
          setCourses([...courses, ...newCourses])
          setNextPage(nextPage)
        })
        .catch((error) => console.log(error))
        .finally(() => setFetching(false))

    }, [searchText, nextPage, fetching]
  );

  useEffect(() => {
    fetchCourses(searchText, 1)
      .then((response) => {
        const {courses: newCourses, nextPage} = response.data
        setCourses(newCourses)
        setNextPage(nextPage)
      })
      .catch((error) => console.log(error))
      .finally(() => setFetching(false))
  }, [searchText])

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  return (
    <div>
      <input
        type="Search"
        placeholder="Start typing to search HS courses..."
        onChange={(e) => setSearchText(e.target.value)}
        className="block w-full p-4 placeholder-gray-400 border-2 border-gray-400 rounded-[12px] bg-white sm:text-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <div className="p-4 pr-2 mt-4 overflow-y-auto bg-white rounded-[12px] h-96" ref={scrollParentRef}>
        <InfiniteScroll
          loadMore={fetchMoreCourses}
          hasMore={!!nextPage}
          loader={loader}
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          <ul className="max-h-full pr-2 rounded-md">
            {
              courses.map(course => (
                <ResultItem key={`${course.type}-${course.id}`} {...course}/>
              ))
            }
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default CourseSearch;
