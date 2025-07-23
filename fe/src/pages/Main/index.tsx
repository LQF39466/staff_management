import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Avatar, Dropdown } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import { ConfirmModalLogout } from "../../components/ConfirmModal/index";
import MainMenu from "../../components/MainMenu/index";

const { Header, Sider, Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <div>退出登录</div>,
  },
];
//这个onClick专门用于处理Logout的弹出窗口

function Main() {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = () => ConfirmModalLogout(navigate);
  return (
    <>
      <Layout style={{ display: "flex", height: "100%" }}>
        <Header
          style={{
            zIndex: "10",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "0 3px 8px #f0f1f2",
            borderColor: "#eeeeee",
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            position: 'sticky',
            top: 0,
          }}
        >
          <h1 className="MainTitle">人员管理系统</h1>
          <div id="UserInfo">
            <h3 id="Username">Admin</h3>
            <Dropdown menu={{ items, onClick }} placement="bottom">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Layout style={{ flex: 1, overflow: "hidden" }}>
          <Sider 
            width={200} 
            className="site-layout-background" 
            breakpoint="lg" 
            style={{ overflow: "auto" }}
          >
            <MainMenu />
          </Sider>
          <Content
            style={{ overflow: "auto", background: "white", padding: "20px 24px 24px" }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default Main;
