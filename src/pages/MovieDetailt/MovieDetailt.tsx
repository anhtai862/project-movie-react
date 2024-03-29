import { useEffect, useState } from "react";
import { GiTicket } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getInfoMovie } from "slices/info-movie";
import { AppDispatch, RootState } from "store";
import { useParams } from "react-router-dom";
import moment from "moment";
import MovieShowTime from "./MovieShowTime";
import { IInfoMovie } from "interfaces/info-movie";
import { replaceUrlIframe } from "utils/common";
import Trailer from "components/IFrame/Trailer";
import Loading from "pages/LoadingPage/Loading";
const MovieDetail = () => {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.info_movie
  );
  const urlParams = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const [detail, setDetail] = useState<IInfoMovie>(data);
  const [isOpenIframe, setIsOpenIframe] = useState<boolean>(false);
  const [trailer, setTrailer] = useState(detail.trailer);

  useEffect(() => {
    const maPhim = Number(urlParams.movieId);
    // mang thong tin cua 1 bo phim di cat
    /**
     * 1: phai co thong tin cua bo phim
     * 2: de co thong tin cua 1 bo phim thi cong viec la get API thong tin cua bo phim can maPhim
     *
     */
    dispatch(getInfoMovie(maPhim));
  }, [dispatch, urlParams.movieId]);

  useEffect(() => {
    setDetail(data);
  }, [setDetail, data]);

  const playOrCloseTrailer = (type: string) => {
    switch (type) {
      case "close":
        setTrailer(detail.trailer);
        break;
      case "play":
        const newTrailer = replaceUrlIframe(detail.trailer);
        setTrailer(newTrailer);
        break;
    }
    setIsOpenIframe(!isOpenIframe);
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error) {
    return <h1>error</h1>;
  }
  if (isOpenIframe) {
    return (
      <Trailer
        title={detail.tenPhim}
        isOpenIframe={isOpenIframe}
        trailer={trailer}
        playOrCloseTrailer={playOrCloseTrailer}
      />
    );
  }
  return (
    <div className="movie__detail text-slate-50 pt-8 text-2xl ">
      <div className="2xl:max-w-7xl 2xl:mx-auto xl:max-w-6xl xl:mx-auto lg:max-w-4xl lg:mx-auto md:max-w-3xl md:mx-auto sm:max-w-xl sm:mx-auto">
        <div className="flex">
          <a href="#">Home</a>
          <span className="px-2"> | </span>
          <h3>{detail.tenPhim}</h3>
        </div>
        <div className="movie__detail__content flex pt-7">
          <div className="text-base flex leading-10 sm:max-w-xl sm:flex-wrap md:max-w-3xl  lg:max-w-4xl xl:max-w-6xl">
            <div className="relative bg-red-300 flex items-center justify-center sm:flex-none sm:max-w-xl sm:w-[70vw] sm:h-full sm:max-h-[50vh] md:flex-1 md:max-w-xs lg:max-w-sm xl:max-w-md">
              <div className="cursor-pointer absolute ">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABvFBMVEUAAABPT08AAAAAAABFRUX////+/v5RUVFLS0s/Pz9NTU3///8KCgpKSkr5+fn+/v7////////////////////////8/Pz///////9paWlXV1eWlpYQEBD7+/v///+6uroqKirX19eVlZWIiIhQUFAfHx/////19fX39/f////////////////////////n5+fZ2dnj4+O4uLiNjY09PT3///////////////////////////+zs7P///8VFRX///9HR0cxMTH////////////p6en////n5+fb29vq6urU1NTAwMCnp6d5eXlxcXFzc3NeXl5qamoeHh5BQUE4ODj////8/Pzt7e3a2trQ0ND///////+9vb3Pz8/GxsacnJyYmJiUlJSmpqZ2dnb////////////+/v7x8fH09PT///+5ubnU1NSsrKyhoaGJiYmcnJxaWlqRkZE4ODj////x8fHn5+f////////U1NTIyMj///+/v7+1tbWJiYn///+fn5////9BQUEyMjJgYGD////////s7Ozc3NzJycna2tq/v7+GhoZCQkIWFhb///////////////////8kNpXEAAAAk3RSTlNrawBnaPz6a2pmagZraPP8KRY59PIM9M+ti22La/PMnWu3hoCAawLx6+aomoZZGsrJxq+dawT2xLaxo5yciW5ra2toXAre1tXOzcajl5SQi4V0c2trTfbc1MXBvrSvpqShm4x5ZE9A7Onj1Lewq6aaj4aDeDjezsm9sqygoJ+cl5J/enZvQyLj1MC7tIt7Z04kIw15AUOJAAAFPElEQVRYw6XZd3/SQBgH8NBcEgKEQJiitIW2tBXpslRrl917L23VWq177733Hr837KnVEAOXEJ//+X6eu+dy44GrYIY3GMj1xGONYUEIN8biPblA0Mv+BcfStK0H5wUYQjj/YEvzOgG9gT2VYQokbzWnjnVPPX061X0s1XwrKQDhyj0Bb5ng0HI8BPhHj56YT0gehRBZJkTxSIn5E0dH/UAovjxUBpjPrQHi+KMaRSYelyE8RCY1j8ZFYC2XtwtqnQL8remErhnCTeREutUPoVOzBTZlQ1hJ1RC3WdPzdJOa1ApC2SZrULsDtTmtEJdFECXdrOKOZgFmts6goUrRx8rIkihVDTizlWGBkSfA6nXZZTPk66vAk0hpMLgb6r2XxGU7yMt7KnYHS4Gv15GcVNyuMsKtTCax/ro4GLyLaJVp9ixnsiqKu8FiYGQ3og8V6pUpKg+j2B0pAmZpfgyPIdIcs2awD+okcbschJtMquj7FzwdxkVWPdiVuYjwaSPYFENrgnoOxUQrYk2FYKYLDSeJy3GQkw3oyhSAN0WxSveciFWiqOmgdz+a9fE6G3Uz9nv/gjkhmib/B5J0VMj9ASP7kCKe/+EkyaWksC+yDS6r/hriHKPjXVzq/zxXry7/BjNxtBKnmbkPtlfX7fJxHMcfRjzzCwyExLTbmdbeX7eL2w5+TgwFfoF7MJ7wMD8td7GBupcoVhi+Mez5CQ5VoltmeAdPXjdVjOZWTTVj8HtROUTBmyF2SeSrZ+4niGGoi7pWCNbWh25ScACjiocF7gRu18j6WBerfbpiEA9hoILzHsBR2cUERdCT0PV7IunMUa4E2IYDXi54XjhBLEGI7+dlml17ndnRwVl1JMgFhOi8xxoEVneSRZodKxb8QoA7hXMJlx0Qyfu9PMeOVeS4ZxiX7IHAWK2F2IIeLo6Uxy6Ihg2ORfJH0MnFcEyxDUJ9d4NngJcR4xrRTeyDwPAMXxp8jEYujKmyQKx8WCgJTiPMAVdllifJHwUY4xJfCpwBrEDp4K4dRtC/0csxQKsht+/ijeDoDp5jDpldlCUfZwBXLtHFzSwKe9n0+zgD+GaaZ67DDcQYC1ty0X2qEBQmTIvQvLBZn141xxWCDZs+6ll+evrmYPYM4Fv6IVvFMAYN25fJ08GoXg2L7Ss4QjfYEp4ODs/q1WBvsCWOAKnfp4O0Gi8MHPMI+HlImQ/edh+ng+eumKrBOKQqNPMxKi0WbvUvPrE44zGq6Qe98fu1A5Q66OlV5LbxKuKuc8DpV5GKQIfxsiRVO/L4a2JH4BeYN17npCWfM5Be5/LFLpysCWSXRP1ScCXWrzd1nDPwAr0SF7m0S/0OvbmkMGh6VrBXDBts0Z8VNLTth4/zAW+KolbkaSa1O/RunEVX3vx4lNwOB+ybQKypyPPW47QibQifLvYAlx0u6Q3R/ACvyGSRnOKdbQpJZDNFmxj+47wD77i/eBOjIrgO/16+/Pz8WA8WbwR9W2PkyMhv7SujVSW2+fgyOF+byGhV0XnMAhPPedve8wkg+53V7sv3hXF2k+dtcfzmWYT78hYNyVeVUFvmKGnJzbWoqHxlo2Xa1YHkhVpKMrnaC0l0dDXZa+ruF1B/+FovNUtovdcO10PYr9ltO3sH9wHi2N5a3mzyNLm9YyKwb9BbRmM8cireAdQfaptd8FFkO+i2sjDbdqge6Iifijho3YcA1T/ccuTylemZmekrl4+0DPtVIFRm6143tYEDI/gnRg4MMP9csP77Y7CnM9YYAkKNsc6eQcu/P34ANod6sZ/pavoAAAAASUVORK5CYII="
                  alt="play"
                  className=""
                  onClick={() => playOrCloseTrailer("play")}
                />
              </div>
              <img src={detail.hinhAnh} className="w-full h-full " />
            </div>
            <div className="sm:flex-none sm:max-w-xl md:flex-1 md:max-w-2xl md:px-8">
              <div className="text-2xl">
                <h3 className="">{detail.tenPhim}</h3>
              </div>
              <div className="text-slate-400 py-4 leading-7 ">
                <p>{detail.moTa}</p>
              </div>
              <div>
                <div>
                  <span className="">Phân Loại:</span>
                  <span className="text-red-600 ">
                    C18 - PHIM DÀNH CHO KHÁN GIẢ TỪ 18 TUỔI TRỞ LÊN
                  </span>
                </div>
                <div>
                  <span className="">Đánh Giá:</span>
                  <span className="">{detail.danhGia} / 10</span>
                </div>
                <div>
                  <span className="">Khởi Chiếu:</span>
                  <span className="">
                    {moment(detail.ngayKhoiChieu).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div>
                  <span className="">Thể Loại:</span>
                </div>
                <div>
                  <span className="">Thời Gian:</span>
                  <span>120 Phút</span>
                </div>
                <div>
                  <span className="">Phụ Đề:</span>
                  <span>Tiếng Việt</span>
                </div>
              </div>
              <div className=" pt-5 sm:pb-40 md:pb-20 lg:pb-10 flex">
                <a
                  className="btn__booking w-32 mr-4 pt-0"
                  href={detail.trailer}
                >
                  <span>Trailer</span>
                </a>
                <a className="btn__booking w-32 pt-0" href="#">
                  <i className="pr-2">
                    <GiTicket />
                  </i>
                  <span>Mua Vé</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          {Object.keys(detail).length > 0 && (
            <MovieShowTime maPhim={detail.maPhim} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
