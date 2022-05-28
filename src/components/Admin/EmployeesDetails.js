import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { idEmployeesState } from "../Store/recoil";
import { receivedDocketsState } from "../Store/recoil";
import { deliveryDocketsState } from "../Store/recoil";
import { localtionDeliveryDocketState } from "../Store/recoil";
import { localtionReceivedDocketState } from "../Store/recoil";
import { tabState } from "../Store/recoil";

function EmployeeDetail(props) {
  const [idEmployees, setIdEmployees] = useRecoilState(idEmployeesState);
  const [receivedDocket, setReceivedDocket] =
    useRecoilState(receivedDocketsState);
  const [deliveryDocket, setdeliveryDocket] =
    useRecoilState(deliveryDocketsState);
  const [localtionDeliveryDocket, setLocaltionDeliveryDocket] = useRecoilState(
    localtionDeliveryDocketState
  );
  const [localtionReceivedDocket, setLocaltionReceivedDocketState] =
    useRecoilState(localtionReceivedDocketState);
  const [customers, setCustomers] = useState([]);
  const [tab, setTab] = useRecoilState(tabState);

  useEffect(() => {
    if (idEmployees !== "") {
      const getEmployeeDetail = async () => {
        try {
          const response = await axios.get(
            "https://shoesstation.herokuapp.com/api/employees"
          );
          setdeliveryDocket(response.data[idEmployees].deliveryDockets);
        } catch (error) {
          console.log(error);
        }
      };
      getEmployeeDetail();
    }
  }, []);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios.get(
          "https://shoesstation.herokuapp.com/api/customers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, []);

  let dataDelivery = [];
  if (customers.length !== 0 && deliveryDocket.length !== 0) {
    const listCustomerId = [];
    const listCustomer = [];
    deliveryDocket.forEach((delivery) => {
      listCustomerId.push(delivery.customerId);
    });
    for (let i = 0; i < customers.length; i++) {
      for (let j = 0; j < listCustomerId.length; j++) {
        if (customers[i].id === listCustomerId[j]) {
          listCustomer.push(customers[i]);
        }
      }
    }
    dataDelivery = listCustomer.map((customer, index) => {
      return {
        id: customer.id,
        createdAt: deliveryDocket[index].createdAt,
        customer: customer.fullName,
        customerId: customer.id,
      };
    });
  }

  const findIndex = (id, employees) => {
    return employees
      .map((employee) => {
        return employee.id;
      })
      .indexOf(id);
  };

  useEffect(() => {
    if (idEmployees !== "") {
      const getReceivedDockets = async () => {
        try {
          const response = await axios.get(
            "https://shoesstation.herokuapp.com/api/employees"
          );
          setReceivedDocket(response.data[idEmployees].receivedDockets);
        } catch (error) {
          console.log(error);
        }
      };
      getReceivedDockets();
    }
  }, []);

  const columnsDelivery = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <h1
          onClick={() => {
            setLocaltionDeliveryDocket(findIndex(Number(text), deliveryDocket));
            setTab(4);
          }}
        >
          {text}
        </h1>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Mã Khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
  ];

  const columnsReceived = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <h1
          onClick={() => {
            setLocaltionReceivedDocketState(
              findIndex(Number(text), receivedDocket)
            );
            setTab(5);
          }}
        >
          {text}
        </h1>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
    },
  ];

  return (
    <div>
      <h1>Delivery Dockets</h1>
      <Table columns={columnsDelivery} dataSource={dataDelivery} />
      <h1>Received Dockets</h1>
      <Table columns={columnsReceived} dataSource={receivedDocket} />
    </div>
  );
}

export default EmployeeDetail;
