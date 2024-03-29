import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllCourses = () => {
  const axiosPublic = useAxiosPublic();
  const { data: categories = [] } = useQuery({
    queryKey: ["course._id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  return (
    <div>
      <div className="w-full mx-auto space-y-4">
        <div>
          <img src="https://i.ibb.co/9N5mW0m/courses.jpg" className="w-full h-[300]" alt="" />
        </div>
        <div className="md:flex">
          <div className="lg:w-1/4 border-2 border-solid bg-[#04734C] rounded-md pt-5 h-fit">
            <h1 className="text-3xl text-center font-bold mb-7 text-white">Categories</h1>
            <div className="max-md:flex max-md:flex-wrap gap-1 bg-white">
              <h1 className="text-2xl py-3 bg-white font-semibold text-center">All Courses</h1>
              {categories.map((category) => (
                <NavLink
                  to={`/allCourse/${category.name}`}
                  key={category._id}
                  className="block hover:bg-gray-200 rounded-md transition-colors duration-300"
                >
                  <div className="md:mt-1">
                    <h1 className="text-2xl py-3 font-semibold text-center">{category.name}</h1>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;