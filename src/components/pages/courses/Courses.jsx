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
    <div className="w-4/5 mx-auto">
      <h1 className="text-5xl font-bold mb-10">Select your course</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {filteredCourse.map((course) => (
          <Link key={course._id} to={`/courseDetails/${course._id}`}>
            <div className="card card-compact w-72 h-96 bg-base-100 border-2 shadow-xl">
              <figure>
                <img src={course.image} alt={course.title} className="h-60" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <h2> by {course.author}</h2>
                <h2>Course starts : {course.course_date}</h2>
                <div className="flex justify-between items-center">
                  <h2 className="flex items-center gap-2">
                    <MdOutlineWatchLater /> {course.time_period}
                  </h2>
                  <h2 className="flex items-center gap-2">
                    <PiFoldersDuotone /> {course.lectures}
                  </h2>
                  <h2>$ {course.price}</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
