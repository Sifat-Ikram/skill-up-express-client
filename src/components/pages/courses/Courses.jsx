import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiFoldersDuotone } from "react-icons/pi";

const Courses = () => {
  const category = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: courses = [] } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  const filteredCourse = category.id ? courses.filter((course) => course.category === category.id) : courses;

  return (
    <div className="container w-4/5 mx-auto py-10">
      <h1 className="text-5xl font-bold mb-10 text-[#04734C]">Select your course</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {filteredCourse.map((course) => (
          <Link key={course._id} to={`/courseDetails/${course._id}`}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-[#04734C]">{course.title}</h2>
              <p className="text-gray-600 mb-2">by {course.author}</p>
              <p className="text-gray-600 mb-4">Course starts: {course.course_date}</p>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-gray-600">
                  <MdOutlineWatchLater />
                  {course.time_period}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <PiFoldersDuotone />
                  {course.lectures}
                </p>
                <p className="font-bold text-[#04734C]">${course.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
