import React from "react";
import { Button, Form, Input, Layout } from "antd";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function LoginPage() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values.username && values.password) {
      navigate("/mainHome");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginParent">
      <Header>
        <span className="loginHeader">Church</span>
      </Header>
      <div className="loginChild">
        <Form
          className="loginForm"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="Login">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
