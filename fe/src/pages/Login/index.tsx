import React from "react";
import { Layout, Form, Input, Button, message } from "antd";
import { post } from "../../requests";
import { LoginInfo } from "../../types";
import { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

interface Navigation {
  navigate: NavigateFunction;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout style={{ display: "flex", height: "100%" }}>
        <Header
          style={{
            zIndex: "10",
            background: "white",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <h1 className="MainTitle">人员管理系统</h1>
        </Header>
        <Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
          }}
        >
          <div id="LoginContainer">
            <h2 id="LoginTitle">管理员登录</h2>
            <LoginForm navigate={navigate} />
          </div>
        </Content>
      </Layout>
    </>
  );
};

const LoginForm: React.FC<Navigation> = (props) => {
  const onFinish = async (values: LoginInfo) => {
    const response: AxiosResponse<any, any> | undefined = await post(
      "/api/user/login",
      JSON.stringify(values)
    );
    if (response !== undefined && response.data.code === 0) {
      props.navigate("main");
    } else {
      message.error("用户名或密码错误");
    }
  };
  return (
    <>
      <Form
        name="userLogin"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: false }}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        style={{ margin: "30px", width: "80%", maxWidth: "400px" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block={true}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
