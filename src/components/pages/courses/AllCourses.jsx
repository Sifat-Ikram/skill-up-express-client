import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllCourses = () => {
  const [value, setValue] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: courses = [] } = useQuery({
    queryKey: ["course._id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  const handleSearch = (e) =>{
    setValue(e.target.value);
       
}

  const getFilteredDistrict = () => {
    if (!value) {
      return courses;
    } else {
      return courses.filter((course) =>
        course.title.toLowerCase().includes(value)
      );
    }
  };

  const filteredCourse = getFilteredDistrict();

  return (
    <div className="space-y-10">
      <div className='flex items-center justify-center mt-10'>
                <input value={value} onChange={handleSearch}  type="text" placeholder="Type here" className="w-full max-w-xs border-[#04734C] input" />
            </div>
      <div className="w-5/6 mx-auto space-y-4">
        <h1 className="text-5xl font-bold">Select your course</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {filteredCourse.map((course) => (
            <Link key={course._id} to={`/courseDetails/${course._id}`}>
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                  <img src={course.image} className="w-60 h-60" alt="Album" />
                </figure>
                <div className="card-body">
                  <h1 className="card-title">{course.title}</h1>
                  <h2>
                    <span className="text-lg font-semibold">
                      Booking Deadline:{" "}
                    </span>
                    {course.booking_date}
                  </h2>
                  <h2>
                    <span className="text-lg font-semibold">course date:</span>{" "}
                    {course.course_date}
                  </h2>
                  <h2>
                    <span className="text-lg font-semibold">Price:</span> $
                    {course.price}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
