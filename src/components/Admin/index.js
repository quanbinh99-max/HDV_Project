import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Products from "./Product";
import Employees from "./Employees";
import EmployeeDetail from "./EmployeesDetails";
import DeliveryDocketDetails from "./DeliveryDocketDetails";
import ReceivedDocketDetails from "./ReceivedDocketDetails";
import CustomerDetails from "./CustomerDetails";
import Customers from "./Customers";
import DeliveryDocket from "./DeliveryDocket";
import CustomerDeliveryDocketDetails from "./CustomerDeliveryDocketDetails";
import CreateReceiveDocket from "./CreateReceiveDocket";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { tabState } from "../Store/recoil";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { key } from "../Store/recoil";
import ProfileEmployee from "./ProfileEmployee";

const { Header, Content, Footer, Sider } = Layout;

function Index(props) {
  const [tab, setTab] = useRecoilState(tabState);
  let navigate = useNavigate();
  const [keyValue, setKeyValue] = useRecoilState(key);

  const handleLogout = () => {
    localStorage.removeItem("key");
    setKeyValue(localStorage.getItem("key") || []);
    navigate("/dangnhap");
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        setTab(Number(key));
      },
    };
  }

  const items = [
    getItem("Products", "1", <PieChartOutlined />),
    getItem("Employees", "2", <DesktopOutlined />),
    getItem("Customers", "6", <DesktopOutlined />),
    getItem("Delivery Docket", "9", <DesktopOutlined />),
    getItem("Receive Docket", "11", <DesktopOutlined />),
    getItem("Profile Employees", "12", <DesktopOutlined />),
  ];

  // const items = [UserOutlined, UserOutlined].map((icon, index) => ({
  //   key: String(index + 1),
  //   icon: React.createElement(icon),
  //   label: `nav ${index + 1}`,
  //   onClick: () => {
  //     setTab(index);
  //   },
  // }));

  return (
    <div>
      {" "}
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <div className="flex justify-end mt-4 mr-4">
              <Button type="primary" onClick={handleLogout}>
                <span>Đăng xuất</span>
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              {tab === 1 && <Products></Products>}
              {tab === 2 && <Employees></Employees>}
              {tab === 3 && <EmployeeDetail></EmployeeDetail>}
              {tab === 4 && <DeliveryDocketDetails></DeliveryDocketDetails>}
              {tab === 5 && <ReceivedDocketDetails></ReceivedDocketDetails>}
              {tab === 6 && <Customers></Customers>}
              {tab === 7 && <CustomerDetails></CustomerDetails>}
              {tab === 8 && (
                <CustomerDeliveryDocketDetails></CustomerDeliveryDocketDetails>
              )}
              {tab === 9 && <DeliveryDocket></DeliveryDocket>}
              {tab === 11 && <CreateReceiveDocket></CreateReceiveDocket>}
              {tab === 12 && <ProfileEmployee></ProfileEmployee>}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;
