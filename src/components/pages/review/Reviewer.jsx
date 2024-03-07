import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Reviewer = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();

  const { data: courses = [] } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  if (!courses) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (!user) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const filteredCourse = courses.find((course) => course._id === id);

  if (!filteredCourse) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  

  const onSubmit = async (data) => {
    

    const reviewInfo = {
      title: data.title,
      user: data.user,
      email: user.email,
      review: data.review,
      photo: user.photoURL
    };

    const reviewRes = await axiosPublic.post("/review", reviewInfo);

    if (reviewRes.data.insertedId) {
      Swal.fire("Review added successfully");
      reset();
    }
  };

  return (
    <div className="my-10">
      <div className="w-5/6 mx-auto py-5">
        <div className="flex-1 text-center py-10 bg-[#04734C] w-full">
          <h1 className="text-5xl font-bold text-white">Add A Review</h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/5 mx-auto pt-8 space-y-7"
          >
            <div className="flex justify-center gap-10">
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  {...register("user")}
                  type="text"
                  className="w-full input input-bordered"
                  defaultValue={user.displayName}
                />
              </div>
              <div className="flex-1">
                <label className="label text-2xl py-4 font-semibold">
                  <span className="label-text">Course Name</span>
                </label>
                <input
                  {...register("title")}
                  type="text"
                  className="w-full input input-bordered"
                  defaultValue={filteredCourse.title}
                />
              </div>
            </div>
            <div>
              <label className="label text-2xl py-4 font-semibold">
                <span className="label-text">Review</span>
              </label>
              <textarea
                {...register("review")}
                type="text"
                className="w-full textarea textarea-bordered"
                placeholder="Write a review"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-[#04734C] hover:bg-[#04734C] rounded-xl py-3 px-7 text-lg font-semibold"
              >
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviewer;
