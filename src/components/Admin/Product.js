import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import AddProduct from "./AddProduct";
import { Table, Button, Popconfirm, message } from "antd";
import { useRecoilState } from "recoil";
import { productState } from "../Store/recoil";
import EditProduct from "./EditProduct";

function Products(props) {
  const [products, setProducts] = useRecoilState(productState);
  const [product, setProduct] = useState();
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (text, record) => {
    const deleteProducts = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/products/${record.id}`,
          { ...record, status: 0 }
        );
        getProducts();
      } catch (e) {
        console.log(e);
      }
    };

    deleteProducts();
  };

  const confirm = (text, record) => {
    handleDelete(text, record);
    message.success("Xóa thành công");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Hủy xóa");
  };

  const handleEdit = (text, record) => {
    setToggleEdit(true);
    setProduct(record);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{`${text.toLocaleString()} VNĐ`}</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "inventory",
      key: "inventory",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} className="w-[100px]" />,
    },
    {
      title: "Delete",
      key: "delete",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Bạn có chắc chắn xóa không?"
          onConfirm={() => confirm(text, record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(text, record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" className="mb-10" onClick={handleToggleAdd}>
        Thêm sản phẩm
      </Button>
      <Table
        columns={columns}
        dataSource={products.filter((product) => {
          return product.status === 1;
        })}
      ></Table>
      {toggleAdd === true && (
        <AddProduct products={products} setProducts={setProducts}></AddProduct>
      )}
      {toggleEdit === true && (
        <EditProduct
          products={products}
          setProducts={setProducts}
          product={product}
          getProducts={getProducts}
          setToggleEdit={setToggleEdit}
        ></EditProduct>
      )}
    </div>
  );
}

export default Products;
