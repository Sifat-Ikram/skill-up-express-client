import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <>
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
        <SwiperSlide><img src="https://i.ibb.co/gPr7qXR/360-F-479044691-1z-ADj-ZLdxo-Gu8-Kslrv-YZC4el-Yij-Ijt-Ry.jpg" alt="" className='h-96 w-full' /></SwiperSlide>
        <SwiperSlide><img src="https://i.ibb.co/wpVhKST/digital-courses-web-banner-design-student-watching-online-courses-online-education-digital-classroom.jpg" alt="" className='h-96 w-full' /></SwiperSlide>
        <SwiperSlide><img src="https://i.ibb.co/hLhY6D9/4f7709e2-afeb-452e-8e84-6597b1fc4561-e-learning-tools-and-technologies.png" alt="" className='h-96 w-full' /></SwiperSlide>
        <SwiperSlide><img src="https://i.ibb.co/FXn2pjL/TLMS-20210122-1200x628-A.png" alt="" className='h-96 w-full' /></SwiperSlide>
        <SwiperSlide><img src="https://i.ibb.co/v4xk6Tw/Nz-Az-MTZi-ZWIt-Ym-Ez-OS00-M2-Mw-LWIy-Mj-Ut-ZTlh-N2-Jk-MTUx-ODQz-interactive-elearning-tools.jpg" alt="" className='h-96 w-full' /></SwiperSlide>
      </Swiper>
    </>
  );
}
export default Banner;