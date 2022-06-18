import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { profileEmployeeState } from "../Store/recoil";
import { useRecoilState } from "recoil";

function CreateReceiveDocket(props) {
  const [profileEmployee, setProfileEmployee] =
    useRecoilState(profileEmployeeState);
  const onFinish = (values) => {
    const postReceiveDocket = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/receivedDockets",
          {
            supplierName: values.supplierName,
            employeeId: profileEmployee.id,
          }
        );
        console.log(response);
        for (var i = 0; i < values.users.length; i++) {
          const responseDetails = await axios.post(
            "http://localhost:8080/api/receivedDocketDetails",
            {
              ...values.users[i],
              productId: values.users[i].productId.value,
              receivedDocketId: response.data.id,
            }
          );
        }
        message.success("Thêm phiếu nhập thành công!");
      } catch (error) {
        message.warning("Thêm phiếu nhập lỗi!");
        console.log(error);
      }
    };
    postReceiveDocket();
  };

  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/employees");
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
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
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
      .filter((customer) => customer.status === 1)
      .map((product) => {
        return {
          value: product.id,
          label: product.name,
        };
      });
  }
  const [selectedOptionEmployees, setSelectedOptionEmployees] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  return (
    <div>
      <h1>Tạo phiếu nhập</h1>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex">
          <h3 className="mr-5">Nhà cung cấp: </h3>
          <Form.Item
            name="supplierName"
            rules={[{ required: true }]}
            className="flex-1 mb-2"
          >
            <Input />
          </Form.Item>
        </div>
        <h1>Chi tiết phiếu nhập</h1>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div>
                  <div className="flex justify-between px-4">
                    <span>{`Sản phẩm ${index + 1}`}</span>
                    <i
                      className="fa-solid fa-trash-can text-red-500"
                      onClick={() => remove(name)}
                    ></i>
                  </div>
                  <hr className=" mb-4" />
                  <div className="flex">
                    <h3 className="text-[16px] mr-[107px]">Nhập số lượng:</h3>
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
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="form-group flex ">
                    <h3 className="text-[16px] mr-[148px]">Nhập giá:</h3>
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
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="flex">
                    <h3 className="text-[16px]">Chọn sản phẩm :</h3>
                    <Form.Item
                      className="flex-1"
                      {...restField}
                      name={[name, "productId"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing product",
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
              <div className="flex justify-center">
                <Form.Item className="w-32">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </div>
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
