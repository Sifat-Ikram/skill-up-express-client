import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { MdDelete, MdNoteAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/cart?email=${user.email}`);
      return res.data;
    },
  });
  if (!courses) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/cart/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            // Add additional error handling as needed
          });
      }
    });
  };

  return (
    <div className="container w-4/5 mx-auto py-10">
      <h1 className="text-5xl font-bold mb-8 text-[#04734C]">Your enrolled courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => (
          <div key={course._id} className="bg-white w-96 rounded-lg shadow-md overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-[#04734C]">{course.title}</h2>
              <p className="text-gray-600 mb-2">Category: {course.category}</p>
              <p className="text-gray-600 mb-2">Course Author: {course.author}</p>
              <p className="text-gray-600 mb-4">Start Date: {course.course_date}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => handleDelete(course)} className="bg-red-500 flex items-center text-white px-5 py-3 rounded-md hover:bg-red-600 transition-colors duration-300">
                  <MdDelete className="text-2xl font-bold mr-1" /> Delete
                </button>
                <Link to={`/update/${course._id}`} className="bg-yellow-500 flex items-center text-white px-5 py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300">
                  <MdNoteAlt className="text-2xl font-bold mr-1" /> Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
