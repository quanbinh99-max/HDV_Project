import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Drawer } from "antd";

function Register({ show, setShow }) {
  const [visible, setVisible] = useState(true);
  const [placement, setPlacement] = useState("top");

  const onClose = () => {
    setVisible(false);
    setShow(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const success = () => {
    message.success("Đăng kí thành công");
  };

  const error = () => {
    message.error("Đăng kí thất bại");
  };

  const onSubmit = (data) => {
    const { avatar, fullName, address, dateOfBirth, phoneNumber, password } =
      data;
    const formDataUploadFile = new FormData();
    formDataUploadFile.append("file", avatar[0]);
    const postImages = async () => {
      try {
        const responseUploadFile = await axios.post(
          "http://localhost:8080/api/cloudDinary/fileUpload",
          formDataUploadFile
        );
        if (responseUploadFile.status === 200) {
          console.log(responseUploadFile.data.message);
          const responseInsertProduct = await axios.post(
            "http://localhost:8080/api/employees",
            {
              fullName: fullName,
              status: 1,
              address: address,
              dateOfBirth: dateOfBirth,
              phoneNumber: phoneNumber,
              password: password,
              avatar: responseUploadFile.data.message,
            }
          );
          setValue("fullName", "");
          setValue("address", "");
          setValue("dateOfBirth", "");
          setValue("password", "");
          setValue("phoneNumber", "");
          setValue("avatar", "");
          success();
          setShow(false);
          setVisible(false);
        } else {
          error();
        }
      } catch (e) {
        error();
      }
    };
    postImages();
  };

  return (
    <div>
      {" "}
      <Drawer
        title="Basic Drawer"
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
                {...register("fullName")}
              />

              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="address"
                placeholder="Address"
                {...register("address")}
              />

              <input
                type="date"
                className="border-2 w-full  px-4 py-1 rounded mb-4"
                placeholder="Ngày sinh"
                {...register("dateOfBirth")}
              />

              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
              />

              <div className="flex items-center mt-4 justify-center mb-4">
                <input
                  className="border-2  px-4 py-1 rounded hidden"
                  type="file"
                  {...register("avatar")}
                  id="files"
                />
                <label
                  for="files"
                  className="border-2 bg-blue-400 rounded px-4 py-2 "
                >
                  Chọn hình đại diện
                </label>
              </div>

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
