import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table, Button, Popconfirm, message } from "antd";
import { useRecoilState } from "recoil";
import { localtionCustomerState } from "../Store/recoil";
import { customersState } from "../Store/recoil";
import { tabState } from "../Store/recoil";
import AddCustomer from "./AddCustomer";

import { employeesState } from "../Store/recoil";
import EditCustomer from "./EditCustomer";

function Customers(props) {
  const [customers, setCustomers] = useRecoilState(customersState);
  const [customer, setCustomer] = useState();
  const [localtionCustomer, setLocaltionCustomer] = useRecoilState(
    localtionCustomerState
  );
  const [tab, setTab] = useRecoilState(tabState);
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

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

  useEffect(() => {
    getCustomers();
  }, []);

  const handleDelete = (text, record) => {
    const deleteCustomer = async () => {
      try {
        const response = await axios.put(
          `https://shoesstation.herokuapp.com/api/customers/${record.id}`,
          { ...record, status: 0 }
        );
        getCustomers();
      } catch (e) {
        console.log(e);
      }
    };
    deleteCustomer();
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
    setCustomer(record);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const findIndex = (id, employees) => {
    return employees
      .map((employee) => {
        return employee.id;
      })
      .indexOf(id);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <img src={text} className="w-[100px]" />,
    },
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
        Thêm khách hàng
      </Button>
      <Table
        columns={columns}
        dataSource={customers.filter((customer) => customer.status === 1)}
      />
      {toggleAdd === true && (
        <AddCustomer getCustomers={getCustomers}></AddCustomer>
      )}
      {toggleEdit === true && (
        <EditCustomer
          customer={customer}
          getCustomers={getCustomers}
          setToggleEdit={setToggleEdit}
        ></EditCustomer>
      )}
    </div>
  );
}

export default Customers;
