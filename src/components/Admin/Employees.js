import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { idEmployeesState } from "../Store/recoil";
import { employeesState } from "../Store/recoil";
import { tabState } from "../Store/recoil";

function Products(props) {
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [idEmployees, setIdEmployees] = useRecoilState(idEmployeesState);
  const [tab, setTab] = useRecoilState(tabState);
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
            setIdEmployees(findIndex(Number(text), employees));
            setTab(3);
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      key: "avatar",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={employees} />
    </div>
  );
}

export default Products;
