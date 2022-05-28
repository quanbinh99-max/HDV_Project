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
import CustomerDeliveryDocketDetails from "./CustomerDeliveryDocketDetails";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { tabState } from "../Store/recoil";
const { Header, Content, Footer, Sider } = Layout;

function Index(props) {
  const [tab, setTab] = useRecoilState(tabState);

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
          />
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
