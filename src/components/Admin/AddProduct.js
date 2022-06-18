import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";

function AddProduct({ products, setProducts }) {
  const success = () => {
    message.success("Thêm thành công");
  };
  const error = () => {
    message.error("Thêm thất bại");
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { image, name, price, inventory } = data;
    const formDataUploadFile = new FormData();
    formDataUploadFile.append("file", image[0]);
    const postImages = async () => {
      try {
        const responseUploadFile = await axios.post(
          "http://localhost:8080/api/cloudDinary/fileUpload",
          formDataUploadFile
        );
        if (responseUploadFile.status === 200) {
          console.log(responseUploadFile.data.message);
          const responseInsertProduct = await axios.post(
            "http://localhost:8080/api/products",
            {
              name: name,
              status: 1,
              price: price,
              inventory: inventory,
              image: responseUploadFile.data.message,
            }
          );
          setProducts([...products, responseInsertProduct.data]);
          setValue("name", "");
          setValue("price", "");
          setValue("inventory", "");
          setValue("image", "");
          success();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <h3 className="text-[16px]">Tên sản phẩm:</h3>
        <input
          className="border-2 w-10/12 ml-10 px-4 py-1 rounded"
          placeholder="Tên sản phẩm"
          {...register("name", { required: true })}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Giá sản phẩm:</h3>
        <input
          className="border-2 w-10/12 ml-10 px-4 py-1 rounded"
          placeholder="Giá sản phẩm"
          {...register("price", { required: true })}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Tồn kho:</h3>
        <input
          className="border-2 w-10/12 ml-20 px-4 py-1 rounded"
          placeholder="Tồn kho"
          {...register("inventory", { required: true })}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Hình ảnh:</h3>
        <input
          className="border-2 w-10/12 ml-[74px] px-4 py-1 rounded"
          type="file"
          {...register("image", { required: true })}
        />
      </div>

      <button className="mt-4 bg-blue-500 px-4 py-2 rounded text-white mb-3">
        Thêm sản phẩm
      </button>
    </form>
  );
}

export default AddProduct;
