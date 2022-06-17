import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Form, Input, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { profileEmployeeState } from "../Store/recoil";
import { useRecoilState } from "recoil";

function CreateReceiveDocket(props) {
  const [profileEmployee, setProfileEmployee] =
    useRecoilState(profileEmployeeState);
  const onFinish = (values) => {
    const postReceiveDocket = async () => {
      try {
        const response = await axios.post(
          "https://shoesstation.herokuapp.com/api/deliveryDockets",
          {
            customerId: selectedOptionCustoms.value,
            employeeId: profileEmployee.id,
          }
        );
        console.log(response);
        for (var i = 0; i < values.users.length; i++) {
          const responseDetails = await axios.post(
            "https://shoesstation.herokuapp.com/api/deliveryDocketDetails",
            {
              ...values.users[i],
              productId: values.users[i].productId.value,
              deliveryDocketId: response.data.id,
            }
          );
        }
        message.success("Thêm phiếu xuất thành công");
      } catch (error) {
        message.warning("Thêm phiếu xuất thất bại.Vượt quá số lượng tồn kho");
      }
    };
    postReceiveDocket();
  };

  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get(
          "https://shoesstation.herokuapp.com/api/employees"
        );
        setEmployees(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getEmployees();
  }, []);

  var optionsEmployee = [];
  if (employees.length !== 0) {
    optionsEmployee = employees.map((employee) => {
      return {
        value: employee.id,
        label: employee.fullName,
      };
    });
  }

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios.get(
          "https://shoesstation.herokuapp.com/api/customers"
        );
        setCustomers(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getCustomers();
  }, []);

  var optionsCustomers = [];
  if (customers.length !== 0) {
    optionsCustomers = customers
      .filter((customer) => customer.status === 1)
      .map((customer) => {
        return {
          value: customer.id,
          label: customer.fullName,
        };
      });
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://shoesstation.herokuapp.com/api/products"
        );
        setProducts(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getProducts();
  }, []);

  var optionsProducts = [];
  if (products.length !== 0) {
    optionsProducts = products
      .filter((product) => product.status === 1)
      .map((product) => {
        return {
          value: product.id,
          label: product.name,
        };
      });
  }
  const [selectedOptionEmployees, setSelectedOptionEmployees] = useState(null);
  const [selectedOptionCustoms, setSelectedOptionCustoms] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  return (
    <div>
      <h1 className="mb-4">Tạo phiếu xuất</h1>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex items-center">
          <span>Chọn khách hàng : </span>
          <Select
            className="flex-1 ml-3 mt-4 mb-4"
            defaultValue={selectedOptionCustoms}
            onChange={setSelectedOptionCustoms}
            options={optionsCustomers}
          />
        </div>
        <h1>Chi tiết phiết xuất</h1>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div>
                  <div className="flex justify-between px-4">
                    <span>{`Phiếu ${index + 1}`}</span>
                    <i
                      className="fa-solid fa-trash-can text-red-500"
                      onClick={() => remove(name)}
                    ></i>
                  </div>
                  <hr className=" mb-4" />
                  <div className="flex">
                    <h3 className="text-[16px] mr-4">Nhập số lượng:</h3>
                    <Form.Item
                      {...restField}
                      className="flex-1"
                      name={[name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing quantity",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập Giá:" />
                    </Form.Item>
                  </div>
                  <div className="form-group flex ">
                    <h3 className="text-[16px] mr-14">Nhập giá:</h3>
                    <Form.Item
                      className="flex-1"
                      {...restField}
                      name={[name, "price"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing price",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập giá:" />
                    </Form.Item>
                  </div>
                  <div className="flex">
                    <h3>Chọn sản phẩm :</h3>
                    <Form.Item
                      className="flex-1"
                      {...restField}
                      name={[name, "productId"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing price",
                        },
                      ]}
                    >
                      <Select
                        className="w-10/12 ml-20 px-4 py-1"
                        defaultValue={selectedProducts}
                        onChange={setSelectedProducts}
                        options={optionsProducts}
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateReceiveDocket;
