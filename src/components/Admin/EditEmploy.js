import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";
function EditEmployee({ getEmployees, employee, setToggleEdit }) {
  const success = () => {
    message.success("Sửa thành công");
  };
  const error = () => {
    message.error("Sửa thất bại");
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { avatar, fullName, address, dateOfBirth, phoneNumber, password } =
      data;
    const formDataUploadFile = new FormData();
    formDataUploadFile.append("file", avatar[0]);
    const postImages = async () => {
      const test = {
        fullName: fullName,
        status: 1,
        address: address,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        password: password,
        avatar: employee.avatar,
      };
      try {
        if (avatar.length !== 0) {
          const responseUploadFile = await axios.post(
            "https://shoesstation.herokuapp.com/api/cloudDinary/fileUpload",
            formDataUploadFile
          );
          test = { ...test, avatar: responseUploadFile.data.message };
        }
        const responseInsertProduct = await axios.put(
          `https://shoesstation.herokuapp.com/api/employees/${employee.id}`,
          test
        );
        setValue("fullName", "");
        setValue("address", "");
        setValue("dateOfBirth", "");
        setValue("password", "");
        setValue("phoneNumber", "");
        setValue("avatar", "");
        getEmployees();
        success();
        setToggleEdit(false);
      } catch (e) {
        error();
      }
    };
    postImages();
  };

  setValue("fullName", employee !== undefined ? employee.fullName : "");
  setValue("address", employee !== undefined ? employee.address : "");
  setValue("dateOfBirth", employee !== undefined ? employee.dateOfBirth : "");
  setValue("password", employee !== undefined ? employee.password : "");
  setValue("phoneNumber", employee !== undefined ? employee.phoneNumber : "");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <h3 className="text-[16px]">Tên nhân viên:</h3>
          <input
            className="border-2 w-10/12 ml-8 px-4 py-1 rounded"
            placeholder="Tên nhân viên"
            // defaultValue={employee !== undefined ? employee.fullName : ""}
            {...register("fullName")}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Địa chỉ:</h3>
          <input
            className="border-2 w-10/12 ml-20 px-4 py-1 rounded"
            placeholder="Địa chỉ"
            // defaultValue={employee !== undefined ? employee.address : ""}
            {...register("address")}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Ngày sinh:</h3>
          <input
            type="date"
            className="border-2 w-10/12 ml-14 px-4 py-1 rounded"
            placeholder="Ngày sinh"
            // defaultValue={employee !== undefined ? employee.dateOfBirth : ""}
            {...register("dateOfBirth")}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Mật khẩu:</h3>
          <input
            className="border-2 w-10/12 ml-14 px-4 py-1 rounded"
            placeholder="Mật khẩu"
            // defaultValue={employee !== undefined ? employee.password : ""}
            {...register("password")}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Số điện thoại:</h3>
          <input
            className="border-2 w-10/12 ml-8 px-4 py-1 rounded"
            // defaultValue={employee !== undefined ? employee.phoneNumber : ""}
            placeholder="Số điện thoại"
            {...register("phoneNumber")}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Hình ảnh:</h3>
          <input
            className="border-2 w-10/12 ml-[60px] px-4 py-1 rounded"
            type="file"
            {...register("avatar")}
          />
        </div>

        <button className="mt-4 bg-blue-500 px-4 py-2 rounded text-white">
          Sửa Nhân Viên
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
