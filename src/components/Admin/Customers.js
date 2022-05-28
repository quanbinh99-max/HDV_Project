import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { localtionCustomerState } from "../Store/recoil";
import { customersState } from "../Store/recoil";
import { tabState } from "../Store/recoil";

import { employeesState } from "../Store/recoil";

function Customers(props) {
  const [customers, setCustomers] = useRecoilState(customersState);
  const [localtionCustomer, setLocaltionCustomer] = useRecoilState(
    localtionCustomerState
  );
  const [tab, setTab] = useRecoilState(tabState);
  const [employees, setEmployees] = useRecoilState(employeesState);
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

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get(
          "https://shoesstation.herokuapp.com/api/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployees();
  }, []);

  const findIndex = (id, employees) => {
    return employees
      .map((employee) => {
        return employee.id;
      })
      .indexOf(id);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <h1
          onClick={() => {
            setLocaltionCustomer(findIndex(Number(text), customers));
            setTab(7);
          }}
        >
          {text}
        </h1>
      ),
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={customers} />
    </div>
  );
}

export default Customers;
