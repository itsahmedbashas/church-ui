import React from "react";
import {
  BankOutlined,
  FundProjectionScreenOutlined,
  HddOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const Sidebar = () => {
  const navigate = useNavigate();
  const navi = (key) => {
    navigate(`${key}`);
  };
  return (
    <div>
      <Menu
        onClick={({ key }) => {
          navi(key);
        }}
        mode="inline"
        style={{ width: 256, height: "90vh" }}
        items={[
          {
            title: "Projects",
            label: "Projects",
            key: "/mainHome/proj",
            icon: <FundProjectionScreenOutlined />,
          },
          {
            title: "Agencies",
            label: "Agencies",
            key: "/mainHome/agencies",
            icon: <BankOutlined />,
          },
          {
            type: "divider",
          },
          {
            title: "Admin",
            label: "Admin",
            key: "/admin",
            icon: <HddOutlined />,
            children: [
              {
                title: "Agencies",
                label: "Agencies",
                key: "/mainHome/admin/6",
                icon: <ProfileOutlined />,
              },
              {
                title: "Applicant Community",
                label: "Applicant Community",
                key: "/mainHome/admin/1",
                icon: <ProfileOutlined />,
              },
              {
                title: "Applying Entity",
                label: "Applying Entity",
                key: "/mainHome/admin/2",
                icon: <ProfileOutlined />,
              },
              {
                title: "Completion Status",
                label: "Completion Status",
                key: "/mainHome/admin/3",
                icon: <ProfileOutlined />,
              },
              {
                title: "Project Status",
                label: "Project Status",
                key: "/mainHome/admin/4",
                icon: <ProfileOutlined />,
              },
              {
                title: "Project Types",
                label: "Project Types",
                key: "/mainHome/admin/5",
                icon: <ProfileOutlined />,
              },
            ],
          },
          {
            label: "Signout",
            key: "/",
            icon: <LogoutOutlined />,
            danger: true,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default Sidebar;
