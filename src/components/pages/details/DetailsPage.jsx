import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiFoldersDuotone } from "react-icons/pi";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import StarRating from "./StarRating";

const DetailsPage = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  if (!courses) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const filteredCourse = courses.find((course) => course._id === id);

  if (!filteredCourse) {
    return <div className="text-center mt-10">Course not found</div>;
  }

  const {
    _id,
    title,
    image,
    author,
    category,
    price,
    rating,
    course_date,
    lectures,
    booking_date,
    time_period,
    details,
  } = filteredCourse;

  const handleApply = () => {
    if (user && user.email) {
      const cartItem = {
        courseId: id,
        email: user.email,
        title,
        image,
        author,
        category,
        price,
        rating,
        course_date,
        lectures,
        booking_date,
        time_period,
        details,
      };
      axiosPublic.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Enrolled Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not signed in",
        text: "Please sign in to book test",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signIn");
        }
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex justify-center">
            <img
              src={image}
              alt={title}
              className="w-full md:w-4/5 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-gray-600 mb-4">{details}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
                <div>
                  <h2 className="font-bold">Author:</h2>
                  <p>{author}</p>
                </div>
                <div>
                  <h2 className="font-bold">Lectures:</h2>
                  <p>{lectures}</p>
                </div>
                <div>
                  <h2 className="font-bold">Category:</h2>
                  <p>{category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold">Course starts:</h2>
                  <p>{course_date}</p>
                </div>
                <div>
                  <h2 className="font-bold">Rating:</h2>
                  <StarRating rating={rating} />
                </div>
                <div>
                  <h2 className="font-bold">Price:</h2>
                  <p>${price}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-10 mt-8">
              <button
                onClick={handleApply}
                className="bg-[#04734C] w-1/2 text-white px-6 py-2 rounded-md mt-4 hover:bg-[#056141] transition-colors duration-300"
              >
                Enroll
              </button>
              <button className="bg-[#04734C]  w-1/2 text-white px-6 py-2 rounded-md mt-4 hover:bg-[#056141] transition-colors duration-300">
                <Link to={`/reviewerPage/${_id}`}>Review</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Popular courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course) => (
            <Link key={course._id} to={`/courseDetails/${course._id}`}>
              <div className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600">{course.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="flex items-center gap-1 text-gray-600">
                    <MdOutlineWatchLater />
                    {course.time_period}
                  </p>
                  <p className="flex items-center gap-1 text-gray-600">
                    <PiFoldersDuotone />
                    {course.lectures}
                  </p>
                  <p className="font-bold text-green-700">${course.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/allCourse">
            <button className="bg-[#04734C] text-white px-6 py-2 rounded-md mt-4 hover:bg-[#056141] transition-colors duration-300">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
