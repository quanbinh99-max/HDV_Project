import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { deliveryDocketsState } from "../Store/recoil";
import { productState } from "../Store/recoil";
import { localtionDeliveryDocketState } from "../Store/recoil";

function DeliveryDocketDetails(props) {
  const [deliveryDockets, setdeliveryDockets] =
    useRecoilState(deliveryDocketsState);

  const [products, setProducts] = useRecoilState(productState);

  const [localtionDeliveryDocket, setLocaltionDeliveryDocket] = useRecoilState(
    localtionDeliveryDocketState
  );

  console.log(deliveryDockets);
  console.log(localtionDeliveryDocket);

  let listIdDeliveryDocket = [];
  deliveryDockets[localtionDeliveryDocket].deliveryDocketDetails.map(
    (deliveryDocketDetail) => {
      listIdDeliveryDocket.push(deliveryDocketDetail.productId);
    }
  );

  const listProducts = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < listIdDeliveryDocket.length; j++) {
      if (products[i].id == listIdDeliveryDocket[j]) {
        listProducts.push(products[i]);
      }
    }
  }

  const dataSource = listProducts.map((product, index) => {
    return {
      name: product.name,
      inventory: product.inventory,
      id: deliveryDockets[localtionDeliveryDocket].deliveryDocketDetails[index]
        .id,
      quantity:
        deliveryDockets[localtionDeliveryDocket].deliveryDocketDetails[index]
          .quantity,
      price:
        deliveryDockets[localtionDeliveryDocket].deliveryDocketDetails[index]
          .price,
    };
  });

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
      render: (text) => <p>{`${text.toLocaleString()} VNĐ`}</p>,
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

export default DeliveryDocketDetails;
