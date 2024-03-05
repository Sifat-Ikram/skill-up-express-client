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
        console.log("nothing");
        axiosPublic
          .delete(`/cart/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              console.log(res.data);
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
    <div className="w-11/12 mx-auto space-y-10">
      <h1 className="text-2xl font-bold">Your enrolled courses</h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 h-52">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex gap-7 border-2 border-solid rounded-lg"
          >
            <img src={course.image} alt={course.title} className="w-52 h-full" />
            <div className="flex justify-center items-center gap-10 py-2 pr-4">
              <div className="pt-3 space-y-2">
                <h1 className="text-xl font-semibold">{course.title}</h1>
                <h1 className="text-xl">
                  <span className="font-semibold">Category :</span>{" "}
                  {course.category}
                </h1>
                <h1 className="text-xl">
                  <span className="font-semibold">Course Author :</span>{" "}
                  {course.author}
                </h1>
                <h1 className="text-xl">
                  <span className="font-semibold">start date:</span>{" "}
                  {course.course_date}
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-4 items-center">
                <button onClick={() => handleDelete(course)} className="btn-outline rounded-lg border-2 border-solid hover:border-red-500 border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2">
                  <MdDelete className="text-2xl font-extrabold" />
                </button>
                <button className="btn-outline rounded-lg border-2 border-solid border-yellow-500 hover:border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white p-2">
                  <Link to={`/update/${course._id}`}>
                  <MdNoteAlt className="text-2xl font-extrabold" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
