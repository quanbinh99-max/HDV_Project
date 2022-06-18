import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Drawer } from "antd";
import { useRecoilState } from "recoil";
import { key } from "../Store/recoil";
import { profileEmployeeState } from "../Store/recoil";
import "antd/dist/antd.css";
import Register from "../Admin/Register";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [keyValue, setKeyValue] = useRecoilState(key);
  const [profileEmployee, setProfileEmployee] =
    useRecoilState(profileEmployeeState);
  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const success = () => {
    message.success("Đăng nhập thành công");
  };

  const error = () => {
    message.error("Đăng nhập thất bại");
  };

  const onSubmit = (data) => {
    const login = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/login?phoneNumber=${data.username}&password=${data.password}`
        );
        if (response.status === 200) {
          setProfileEmployee(response.data);
          localStorage.setItem("key", "123");
          setKeyValue(localStorage.getItem("key"));
          success();
          navigate("/admin");
        }
      } catch (e) {
        error();
      }
    };
    login();
  };

  return (
    <div className="h-[100vh] flex justify-center bg-[#64B0F2] relative">
      <div className="absolute border-[8px] border-[white] w-[436px] bg-[white] rounded-[8px] mt-[90px]">
        <div className="border-[5px] border-[#64b0f2] p-[20px] rounded-[8px]">
          <div className="mt-[20px] flex justify-center">
            <i className="fa-solid fa-user-tie text-[24px] text-[#1BB99A] flex self-center mr-[5px]"></i>
            <span className="text-[24px] text-[#1BB99A] font-[700]">
              SHOE STORE
            </span>
          </div>
          <div className="p-[20px] mt-[10px] flex flex-col">
            <span className="text-[16px] text-[#6c757d] font-[500] mb-[8px] text-center">
              ADMIN SIGN IN
            </span>
            <span className="text-[14.4px] text-[#212529] font-[400]">
              Bạn phải đăng nhập để sử dụng chức năng này
            </span>
            <form className="mt-[20px] " onSubmit={handleSubmit(onSubmit)}>
              <input
                className="py-[6px] px-[12px] w-[100%] border-[2px] rounded-[4px] mb-[16px]"
                type="text"
                placeholder="Username"
                // name="username
                defaultValue=""
                {...register("username")}
              />
              <input
                className="py-[6px] px-[12px] w-[100%] border-[2px] rounded-[4px] mb-[16px]"
                type="password"
                placeholder="Password"
                // name="password"
                defaultValue=""
                {...register("password")}
              />

              <h4>
                Vui lòng đăng kí{" "}
                <a
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  tại đây
                </a>
              </h4>

              <button
                className="w-[100%] px-[12px] py-[6px] bg-[#1BB99A] text-white rounded-[4px] text-[16px] font-[400]"
                onClick={handleSubmit}
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
      {show === true && <Register show={show} setShow={setShow}></Register>}
    </div>
  );
}

export default Login;
