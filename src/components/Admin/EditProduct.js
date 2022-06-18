import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";
function EditProduct({
  product,
  products,
  setProducts,
  getProducts,
  setToggleEdit,
}) {
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
    const { image, name, price, inventory } = data;
    const formDataUploadFile = new FormData();
    formDataUploadFile.append("file", image[0]);
    const postImages = async () => {
      var test = {
        name: name,
        status: 1,
        price: price,
        inventory: inventory,
        image: product.image,
      };
      try {
        if (image.length !== 0) {
          const responseUploadFile = await axios.post(
            "http://localhost:8080/api/cloudDinary/fileUpload",
            formDataUploadFile
          );
          test = { ...test, image: responseUploadFile.data.message };
        }
        const responseInsertProduct = await axios.put(
          `http://localhost:8080/api/products/${product.id}`,
          test
        );
        setValue("name", "");
        setValue("price", "");
        setValue("inventory", "");
        setValue("image", "");
        success();
        getProducts();
        setToggleEdit(false);
      } catch (e) {
        error();
      }
    };
    postImages();
  };
  console.log(product);
  setValue("name", product !== undefined ? product.name : "");
  setValue("price", product !== undefined ? product.price : "");
  setValue("inventory", product !== undefined ? product.inventory : "");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <h3 className="text-[16px]">Tên sản phẩm:</h3>
        <input
          className="border-2 w-10/12 ml-10 px-4 py-1 rounded"
          placeholder="Tên sản phẩm"
          {...register("name")}
          // defaultValue={product !== undefined ? product.name : ""}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Giá sản phẩm:</h3>
        <input
          className="border-2 w-10/12 ml-10 px-4 py-1 rounded"
          placeholder="Giá sản phẩm"
          // defaultValue={product !== undefined ? product.price : ""}
          {...register("price")}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Tồn kho:</h3>
        <input
          className="border-2 w-10/12 ml-20 px-4 py-1 rounded"
          placeholder="Tồn kho"
          {...register("inventory")}
          // defaultValue={product !== undefined ? product.inventory : ""}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Hình ảnh:</h3>
        <input
          className="border-2 w-10/12 ml-[74px] px-4 py-1 rounded"
          type="file"
          {...register("image")}
        />
      </div>

      <button className="mt-4 bg-blue-500 px-4 py-2 rounded text-white">
        Sửa sản phẩm
      </button>
    </form>
  );
}

export default EditProduct;
