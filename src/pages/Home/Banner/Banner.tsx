import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieBanner } from "slices/banner";
import { AppDispatch, RootState } from "store";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Autoplay, Mousewheel, Keyboard } from "swiper";

const Banner: React.FC = () => {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.banner
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMovieBanner());
  }, []);
  if (isLoading) {
    return <h1>Banner Loading ...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      loop={true}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {data?.map((banner) => {
        return (
          <SwiperSlide key={banner.maPhim}>
            <img src={banner.hinhAnh} className="w-full h-full" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;
