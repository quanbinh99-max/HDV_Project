import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table, Button } from "antd";
import { useRecoilState } from "recoil";
import { idEmployeesState } from "../Store/recoil";
import { employeesState } from "../Store/recoil";
import { tabState } from "../Store/recoil";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmploy";

function Products(props) {
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [employee, setEmployee] = useState();
  const [idEmployees, setIdEmployees] = useRecoilState(idEmployeesState);
  const [tab, setTab] = useRecoilState(tabState);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
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
  useEffect(() => {
    getEmployees();
  }, []);
  const findIndex = (id, employees) => {
    return employees
      .map((employee) => {
        return employee.id;
      })
      .indexOf(id);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const handleDelete = (text, record) => {
    const deleteEmployee = async () => {
      try {
        const response = await axios.put(
          `https://shoesstation.herokuapp.com/api/employees/${record.id}`,
          { ...record, status: 0 }
        );
        getEmployees();
      } catch (e) {
        console.log(e);
      }
    };
    deleteEmployee();
  };

  const handleEdit = (text, record) => {
    setToggleEdit(true);
    setEmployee(record);
  };

  const columns = [
    {
      title: "Hình ảnh",
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
      title: "Delete",
      key: "delete",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => handleDelete(text, record)}>
          Delete
        </Button>
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
        Thêm nhân viên
      </Button>
      <Table
        columns={columns}
        dataSource={employees.filter((employee) => employee.status === 1)}
      />

      {toggleAdd === true && (
        <AddEmployee getEmployees={getEmployees}></AddEmployee>
      )}
      {toggleEdit === true && (
        <EditEmployee
          getEmployees={getEmployees}
          employee={employee}
          setToggleEdit={setToggleEdit}
        ></EditEmployee>
      )}
    </div>
  );
}

export default Products;
