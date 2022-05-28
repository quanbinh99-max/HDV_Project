import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { receivedDocketsState } from "../Store/recoil";
import { productState } from "../Store/recoil";
import { localtionReceivedDocketState } from "../Store/recoil";

function ReceivedDocketDetails(props) {
  const [products, setProducts] = useRecoilState(productState);
  const [receivedDockets, setReceivedDockets] =
    useRecoilState(receivedDocketsState);

  const [localtionReceivedDocket, setLocaltionReceivedDocketState] =
    useRecoilState(localtionReceivedDocketState);

  console.log(receivedDockets);

  let listIdReceivedDocket = [];
  receivedDockets[localtionReceivedDocket].receivedDocketDetails.map(
    (receivedDocketDetail) => {
      listIdReceivedDocket.push(receivedDocketDetail.productId);
    }
  );

  const listProducts = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < listIdReceivedDocket.length; j++) {
      if (products[i].id == listIdReceivedDocket[j]) {
        listProducts.push(products[i]);
      }
    }
  }

  const dataSource = listProducts.map((product, index) => {
    return {
      name: product.name,
      inventory: product.inventory,
      id: receivedDockets[localtionReceivedDocket].receivedDocketDetails[index]
        .id,
      quantity:
        receivedDockets[localtionReceivedDocket].receivedDocketDetails[index]
          .quantity,
      price:
        receivedDockets[localtionReceivedDocket].receivedDocketDetails[index]
          .price,
    };
  });

  //   const dataSource = [];

  const columnsDelivery = [
    {
      title: "Mã phiếu xuất",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tồn kho",
      dataIndex: "inventory",
      key: "inventory",
    },
  ];

  return (
    <div>
      <h1>Delivery Dockets</h1>
      <Table columns={columnsDelivery} dataSource={dataSource} />
    </div>
  );
}

export default ReceivedDocketDetails;
