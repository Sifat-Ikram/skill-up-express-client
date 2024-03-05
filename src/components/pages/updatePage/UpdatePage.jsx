import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdatePage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
console.log(id);
  const { data: courses = [] } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/cart?email=${user.email}`);
      return res.data;
    },
  });
  
  
  if (!courses) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const filteredCourse = courses.find((course) => course._id === id);
  console.log(filteredCourse);
  if (!filteredCourse) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const {
    title,
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

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.data.display_url) {
      const courseInfo = {
        title: data.title,
        author: data.author,
        category: data.category,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        course_date: data.course_date,
        lectures: parseFloat(data.lectures),
        booking_date: data.booking_date,
        time_period: data.time_period,
        details: data.details,
        image: res.data.data.display_url,
      };

      const courseRes = await axiosPublic.post("/course", courseInfo);

      if (courseRes.data.insertedId) {
        Swal.fire("Course added successfully");
        reset();
      }
    }
  };

  return (
    <div className="my-10">
      <div className="w-5/6 mx-auto py-5">
        <div className="flex-1 text-center py-10 bg-[#04734C] w-full">
          <h1 className="text-5xl font-bold text-white">Update Course</h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/5 mx-auto pt-8 space-y-7"
          >
            <div className="flex justify-center gap-10">
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Name</span>
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Type your course name here"
                  className="w-full input input-bordered"
                  defaultValue={title}
                />
              </div>
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Price</span>
                </label>
                <input
                  {...register("price")}
                  type="text"
                  placeholder="price"
                  className="w-full input input-bordered"
                  defaultValue={price}
                />
              </div>
            </div>
            <div className="flex justify-center gap-10">
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Author</span>
                </label>
                <input
                  {...register("author")}
                  placeholder="Course Author"
                  type="text"
                  className="w-full input input-bordered"
                  defaultValue={author}
                />
              </div>
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Category</span>
                </label>
                <input
                  {...register("category")}
                  type="text"
                  placeholder="Course Category"
                  className="w-full input input-bordered"
                  defaultValue={category}
                />
              </div>
            </div>
            <div className="flex justify-center gap-10">
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Booking Date</span>
                </label>
                <input
                  {...register("booking_date")}
                  type="date"
                  className="w-full input input-bordered"
                  defaultValue={booking_date}
                />
              </div>
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Date</span>
                </label>
                <input
                  {...register("course_date")}
                  type="date"
                  className="w-full input input-bordered"
                  defaultValue={course_date}
                />
              </div>
            </div>
            <div className="flex justify-center gap-10">
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Total Lectures</span>
                </label>
                <input
                  {...register("lectures")}
                  placeholder="type total lectures"
                  type="text"
                  className="w-full input input-bordered"
                  defaultValue={lectures}
                />
              </div>
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Rating</span>
                </label>
                <input
                  {...register("rating")}
                  type="text"
                  placeholder="Course rating initially"
                  className="w-full input input-bordered"
                  defaultValue={rating}
                />
              </div>
            </div>
            <div className="flex justify-center gap-10">
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Photo</span>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="w-full max-w-xs file-input"
                  
                />
              </div>
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course length</span>
                </label>
                <input
                  {...register("time_period")}
                  placeholder="type course duration in weeks"
                  type="text"
                  className="w-full input input-bordered"
                  defaultValue={time_period}
                />
              </div>
            </div>
            <div>
              <label className="label text-2xl py-4 font-semibold">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("details")}
                type="text"
                className="w-full textarea textarea-bordered"
                placeholder="Write a description"
                defaultValue={details}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-[#04734C] hover:bg-[#04734C] rounded-xl py-3 px-7 text-lg font-semibold"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
