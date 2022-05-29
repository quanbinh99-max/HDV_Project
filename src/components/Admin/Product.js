import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { productState } from "../Store/recoil";

function Products(props) {
  const [products, setProducts] = useRecoilState(productState);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://shoesstation.herokuapp.com/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

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
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Products;
