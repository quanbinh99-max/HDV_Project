import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";
import { useRecoilState } from "recoil";
import { localtionCustomerState } from "../Store/recoil";
import { customersState } from "../Store/recoil";
import { customersDetailState } from "../Store/recoil";
import { localtionCustomerDocketDetailsState } from "../Store/recoil";
import { employeesState } from "../Store/recoil";
import { tabState } from "../Store/recoil";

function CustomerDetails(props) {
  const [customers, setCustomers] = useRecoilState(customersState);
  const [localtionCustomerDocketDetails, setLocaltionCustomerDocketDetails] =
    useRecoilState(localtionCustomerDocketDetailsState);
  const [localtionCustomer, setLocaltionCustomer] = useRecoilState(
    localtionCustomerState
  );
  const [tab, setTab] = useRecoilState(tabState);
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [customersDetail, setCustomersDetailState] =
    useRecoilState(customersDetailState);

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
      name: employee.fullName,
      employeeId: employee.id,
      id: customers[localtionCustomer].deliveryDockets[index].id,
      createdAt: customers[localtionCustomer].deliveryDockets[index].createdAt,
    };
  });

  useEffect(() => {
    setCustomersDetailState(customers[localtionCustomer].deliveryDockets);
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
      title: "M?? phi???u xu???t",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <h1
          onClick={() => {
            setLocaltionCustomerDocketDetails(
              findIndex(Number(text), listEmployees)
            );
            setTab(8);
          }}
        >
          {text}
        </h1>
      ),
    },
    {
      title: "M?? nh??n vi??n",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Ng??y t???o",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "T??n nh??n vi??n",
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

export default CustomerDetails;
