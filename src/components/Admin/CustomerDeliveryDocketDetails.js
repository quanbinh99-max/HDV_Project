import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { localtionCustomerDocketDetailsState } from "../Store/recoil";
import { customersDetailState } from "../Store/recoil";
import { productState } from "../Store/recoil";

function CustomerDeliveryDocketDetails(props) {
  const [localtionCustomerDocketDetails, setLocaltionCustomerDocketDetail] =
    useRecoilState(localtionCustomerDocketDetailsState);

  const [products, setProducts] = useRecoilState(productState);

  const [customersDetail, setCustomersDetailState] =
    useRecoilState(customersDetailState);

  console.log(
    customersDetail[localtionCustomerDocketDetails].deliveryDocketDetails
  );

  const listIdDeliveryDocketDetails = [];
  customersDetail[localtionCustomerDocketDetails].deliveryDocketDetails.forEach(
    (idDeliveryDocketDetails) => {
      listIdDeliveryDocketDetails.push(idDeliveryDocketDetails.productId);
    }
  );

  const listDeliveryDocketDetails = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < listIdDeliveryDocketDetails.length; j++) {
      if (products[i].id === listIdDeliveryDocketDetails[j]) {
        listDeliveryDocketDetails.push(products[i]);
      }
    }
  }

  const columns = [
    {
      title: "Mã phiếu xuất chi tiết",
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
      title: "Mã sản phẩm",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
  ];

  const dataSource = listDeliveryDocketDetails.map((data, index) => {
    return {
      name: data.name,
      productId: data.id,
      image: data.image,
      id: customersDetail[localtionCustomerDocketDetails].deliveryDocketDetails[
        index
      ].id,
      quantity:
        customersDetail[localtionCustomerDocketDetails].deliveryDocketDetails[
          index
        ].quantity,
      price:
        customersDetail[localtionCustomerDocketDetails].deliveryDocketDetails[
          index
        ].price,
    };
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default CustomerDeliveryDocketDetails;
