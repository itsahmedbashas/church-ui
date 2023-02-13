import {
  FundProjectionScreenOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Input, Button, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";
const { Search } = Input;

export default function Projects() {
  const columns = [
    {
      title: "Project Status",
      dataIndex: "projectStatusName",
      width: "30%",
      key: "projectStatusId",
    },
    {
      title: "Description",
      dataIndex: "projectStatusDesc",
      width: "30%",
      key: "projectStatusId",
    },
  ];

  const data = [{ projectStatusName: "sample", projectStatusDesc: "asdsa" }];

  const navigation = useNavigate();
  const onAddProject = () => {
    navigation("/mainHome/newProj");
  };
  const onSearchProject = () => {};

  return (
    <div className="projects mainWindow">
      <div className="space-up-down">
        <h3>
          <FundProjectionScreenOutlined /> Projects
        </h3>
      </div>
      <div className="windowAdd space-up-down">
        <Button
          style={{ float: "right" }}
          type="primary"
          shape="round"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={onAddProject}
        >
          Add New Project
        </Button>
      </div>
      <div className="windowSearchBar space-up-down">
        <Search
          placeholder="Search Project ...."
          onSearch={onSearchProject}
          size="large"
          enterButton
        />
      </div>
      <div className="windowTable space-up-down">
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          bordered
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
}
