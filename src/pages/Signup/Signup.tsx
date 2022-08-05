import { useForm, FieldErrors } from "react-hook-form";
import { TextInput, Button, Space } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { login } from "slices/auth";
import { AiFillLock } from "react-icons/ai";

interface LoginValues {
  taiKhoan: string;
  matKhau: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: { taiKhoan: "", matKhau: "" },
    // mode: cách để trigger validation, mặc định là onSubmit
    mode: "onTouched",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmit = (values: LoginValues) => {
    dispatch(login(values));
  };

  const onError = (errors: FieldErrors<LoginValues>) => {
    console.log(errors);
  };

  // Kiểm tra currentUser có phải là object rỗng hay không, nếu không phải => user đã đăng nhập
  if (Object.keys(currentUser).length) {
    // Redirect user về trang Home
    return <Navigate to="/" replace />;
  }

  return (
    <div className="signin-bg">
      <div className="signin-tb flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Đăng Kí</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="taiKhoan" className="block mb-2 text-sm">
                Tài Khoản
              </label>
              <TextInput
                type="text"
                placeholder="Tài Khoản"
                error={errors.taiKhoan?.message}
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Tài khoản không được để trống",
                  },
                })}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Mật Khẩu
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  Quên Mật Khẩu?
                </a>
              </div>
              <TextInput
                type="password"
                placeholder="Mật Khẩu"
                error={errors.matKhau?.message}
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                  // pattern: {
                  //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  //   message:
                  //     "Mật khẩu ít nhất 8 kí tự, có ít nhất một chữ cái và một số",
                  // },
                })}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          {error && <span>{error}</span>}

          <div className="space-y-2">
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-orange-400 text-white"
              >
                Đăng Kí
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">
              Bạn Đã Có Tài Khoản ?
              <Link
                rel="noopener noreferrer"
                to="/login"
                className="hover:underline text-orange-400"
              >
                Đăng Nhập
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
