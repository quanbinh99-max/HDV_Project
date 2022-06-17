import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";

function EditCustomer({ customer, getCustomers, setToggleEdit }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const success = () => {
    message.success("Sửa thành công");
  };
  const error = () => {
    message.error("Sửa thất bại");
  };

  const onSubmit = (data) => {
    const { avatar, fullName, address, phoneNumber, email } = data;
    const formDataUploadFile = new FormData();
    formDataUploadFile.append("file", avatar[0]);
    const postImages = async () => {
      const test = {
        fullName: fullName,
        status: 1,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        avatar: customer.avatar,
      };
      try {
        if (avatar.length !== 0) {
          const responseUploadFile = await axios.post(
            "https://shoesstation.herokuapp.com/api/cloudDinary/fileUpload",
            formDataUploadFile
          );
          test = { ...test, avatar: responseUploadFile.data.message };
        }
        const responseInsertCustomers = await axios.put(
          `https://shoesstation.herokuapp.com/api/customers/${customer.id}`,
          test
        );
        setValue("fullName", "");
        setValue("address", "");
        setValue("email", "");
        setValue("phoneNumber", "");
        setValue("avatar", "");
        getCustomers();
        success();
        setToggleEdit();
      } catch (e) {
        error();
      }
    };
    postImages();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <h3 className="text-[16px]">Tên khách hàng:</h3>
          <input
            className="border-2 w-10/12 ml-4 px-4 py-1 rounded"
            placeholder="Tên nhân viên"
            {...register("fullName")}
            defaultValue={customer !== undefined ? customer.fullName : ""}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Địa chỉ:</h3>
          <input
            className="border-2 w-10/12 ml-20 px-4 py-1 rounded"
            placeholder="Địa chỉ"
            {...register("address")}
            defaultValue={customer !== undefined ? customer.address : ""}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">SĐT :</h3>
          <input
            className="border-2 w-10/12 ml-24 px-4 py-1 rounded"
            placeholder="Số điện thoại"
            {...register("phoneNumber")}
            defaultValue={customer !== undefined ? customer.phoneNumber : ""}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Email:</h3>
          <input
            className="border-2 w-10/12 ml-[90px] px-4 py-1 rounded"
            placeholder="Email"
            {...register("email")}
            defaultValue={customer !== undefined ? customer.email : ""}
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

        <button className="mt-4 bg-blue-500 px-4 py-2 rounded text-white mb-4">
          Sửa Khách Hàng
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
