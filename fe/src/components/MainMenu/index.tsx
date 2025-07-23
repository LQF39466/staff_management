import React from "react";
import { Link } from "react-router-dom";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { UserOutlined, InfoCircleOutlined, BarChartOutlined } from "@ant-design/icons";

const MenuContent: MenuProps["items"] = [
  {
    key: "manage",
    icon: React.createElement(UserOutlined),
    label: <Link to="/main">用户管理</Link>,
  },
  {
    key: "statistic",
    icon: React.createElement(BarChartOutlined),
    label: <Link to="/main/statistic">数据统计</Link>,
  },
  {
    key: "about",
    icon: React.createElement(InfoCircleOutlined),
    label: <Link to="/main/about">关于</Link>,
  },
];

const MainMenu: React.FC = () => {
  return (
    <Menu
      id="MainMenu"
      mode="inline"
      defaultSelectedKeys={["manage"]}
      defaultOpenKeys={["manage"]}
      style={{
        height: "100%",
        borderRight: 0,
        paddingTop: "11px",
        zIndex: "1",
        boxShadow: "0 2px 8px #f0f1f2",
        borderColor: "#eeeeee",
        borderRightWidth: "2px",
        borderRightStyle: "solid",
      }}
      items={MenuContent}
    />
  );
};
export default MainMenu;
