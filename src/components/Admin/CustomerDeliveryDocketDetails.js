import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { localtionCustomerState } from "../Store/recoil";
import { customersState } from "../Store/recoil";
import { employeesState } from "../Store/recoil";

function CustomerDeliveryDocketDetails(props) {
  const [customers, setCustomers] = useRecoilState(customersState);
  const [localtionCustomer, setLocaltionCustomer] = useRecoilState(
    localtionCustomerState
  );

  const [employees, setEmployees] = useRecoilState(employeesState);

  const listIdDeliveryDocket = [];
  customers[localtionCustomer].deliveryDockets.forEach((deliveryDocket) => {
    listIdDeliveryDocket.push(deliveryDocket.id);
  });

  const listEmployees = [];
  for (let i = 0; i < employees.length; i++) {
    for (let j = 0; j < listIdDeliveryDocket.length; j++) {
      if (employees[i].id === listIdDeliveryDocket[j]) {
        listEmployees.push(employees[i]);
      }
    }
  }

  const dataSource = listEmployees.map((employee, index) => {
    return {
      employeeId: employee.id,
      name: employee.fullName,
      id: customers[localtionCustomer].deliveryDockets[index].id,
      createdAt: customers[localtionCustomer].deliveryDockets[index].createdAt,
    };
  });

  const columns = [
    {
      title: "Mã phiếu xuất",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default CustomerDeliveryDocketDetails;
