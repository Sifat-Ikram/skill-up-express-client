import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiFoldersDuotone } from "react-icons/pi";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const DetailsPage = () => {
  const id = useParams();
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
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const filteredCourse = courses.find((course) => course._id === id.id);

  if (!filteredCourse) {
    return <span className="loading loading-dots loading-lg"></span>;
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
        courseId: _id,
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
    <div className="space-y-10">
      <div>
        <img src={image} alt={title} className="w-11/12 mx-auto h-96" />
        <div className="w-4/5 mx-auto py-8 flex flex-wrap justify-between bg-base-200 border-2 border-solid rounded">
          <div className="px-8 border-r-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Author</h1>
            {author}
          </div>
          <div className="px-8 border-r-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Booking Date</h1>
            {booking_date}
          </div>
          <div className="px-8 border-r-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Course starts</h1>
            {course_date}
          </div>
          <div className="px-8 border-r-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Lectures</h1>
            {lectures}
          </div>
          <div className="px-8 border-r-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Duration</h1>
            {time_period}
          </div>
          <div className="px-8 border-r-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Rating</h1>
            {rating}
          </div>
          <div className="px-8 flex flex-col justify-center items-center text-center">
            <h1 className="font-bold ">Price</h1>$ {price}
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-10">
          <div className="flex justify-between pr-10">
            <h1 className="text-4xl font-extrabold">{title}</h1>
            <button
              onClick={handleApply}
              className="text-white bg-[#04734C] hover:bg-[#04734C] rounded-xl py-3 px-7 text-lg font-semibold"
            >
              Enroll
            </button>
          </div>
          <h1 className="mt-10 text-2xl font-semibold">Description</h1>
          <p className="mt-5 text-lg">{details}</p>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <h1 className="text-5xl font-bold mb-10">Popular courses</h1>
        <div className="flex gap-3 items-center">
          {courses.slice(0, 4).map((course) => (
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
        <div className="flex justify-center">
          <Link to="/allCourse">
            <button className="btn btn-outline hover:text-white text-[#04734C] hover:bg-[#04734C] rounded-xl py-2 px-7 mt-10 text-lg font-semibold">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
