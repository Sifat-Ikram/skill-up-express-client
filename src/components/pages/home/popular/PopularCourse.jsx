import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

const PopularCourse = () => {
  const axiosPublic = useAxiosPublic();
  const { data: courses = [] } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  if (!courses) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
        <h1 className="text-4xl font-bold mb-10 text-center">Popular Courses</h1>
        <div>
            <Swiper
                effect={'coverflow'}
                slidesPerView={4}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {
                    courses.map(course => <Link to={`/courseDetails/${course._id}`} key={course._id}>
                        <SwiperSlide>
                            <div style={{
                                backgroundImage: `url(${course.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>
                                <div className="hero-overlay bg-opacity-50 w-full"></div>
                                <div className="pl-5 pb-4">
                                    <div className="pt-32 w-1/3">
                                        <Link to={`/courseDetails/${course._id}`}>
                                            <h1 className="text-xl left-2 text-white font-bold">{course.title}</h1>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Link>
                    )
                }
            </Swiper>
        </div>
    </div>
);
  
};

export default PopularCourse;
