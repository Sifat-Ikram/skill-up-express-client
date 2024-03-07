import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Instructors = () => {
  const axiosPublic = useAxiosPublic();
  const { data: instructors = [] } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await axiosPublic.get("/instructor");
      return res.data;
    },
  });

  if (!instructors) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10 text-center">Our Instructors</h1>
      <div className="w-11/12 mx-auto mb-10">
        {instructors.map((instructor) => (
          <Link key={instructor._id}>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="flex items-center mb-4">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{instructor.name}</h3>
                    <p className="text-gray-600">{instructor.email}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{instructor.bio}</p>
              </SwiperSlide>
            </Swiper>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
