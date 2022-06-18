import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Drawer } from "antd";

function Register({ show, setShow }) {
  const [visible, setVisible] = useState(true);
  const [placement, setPlacement] = useState("right");

  const onClose = () => {
    setVisible(false);
    setShow(false);
  };

  // const ProfilePasswordSchema = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required(("error.field-is-required", { field: "password" })),
  //   passwordConfirm: yup
  //     .string()
  //     .oneOf(
  //       [yup.ref("password"), null],
  //       "error.password-confirmation-not-match"
  //     )
  //     .required(("error.field-is-required", { field: "password-confirm" })),
  //   currentPassword: yup
  //     .string()
  //     .required(("error.field-is-required", { field: "current-password" })),
  // });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const success = () => {
    message.success("Đăng kí thành công");
  };

  const onSubmit = (data) => {
    const {
      avatar,
      fullName,
      address,
      phoneNumber,
      password,
      confirm_password,
    } = data;
    if (confirm_password === password) {
      const postImages = async () => {
        try {
          const responseInsertProduct = await axios.post(
            "http://localhost:8080/api/employees",
            {
              fullName: fullName,
              status: 1,
              address: address,
              phoneNumber: phoneNumber,
              password: password,
            }
          );
          setValue("fullName", "");
          setValue("address", "");
          setValue("password", "");
          setValue("phoneNumber", "");
          setValue("avatar", "");
          success();
          setShow(false);
          setVisible(false);
        } catch (e) {
          message.error("Số điện thoại bị trùng!");
        }
      };
      postImages();
    } else {
      message.error("Mật khẩu chưa trùng khớp !");
    }
  };

  return (
    <div>
      {" "}
      <Drawer
        title="Đăng kí"
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={placement}
      >
        <form
          class="bg-grey-lighter min-h-screen flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 text-3xl text-center">Sign up</h1>
              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                {...register("fullName", { required: true })}
              />

              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="address"
                placeholder="Address"
                {...register("address", { required: true })}
              />

              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="phoneNumber"
                placeholder="phoneNumber"
                {...register("phoneNumber", { required: true })}
              />

              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
                {...register("confirm_password", { required: true })}
              />

              <button
                type="submit"
                class="w-full text-center py-3 rounded bg-blue-500 text-white  hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

export default Register;
