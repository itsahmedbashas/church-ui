import {
  BankOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  FundProjectionScreenOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Input, Button, Table, Space, message, Drawer, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAPI } from "../../apis/AdminAPI";
import "./Projects.css";
const { Search } = Input;
const { confirm } = Modal;

export default function Projects() {
  const columns = [
    {
      title: "Title",
      dataIndex: "projectTitle",
      width: "20%",
    },
    {
      title: "Number",
      dataIndex: "projectNumber",
      width: "10%",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      width: "18%",
    },
    {
      title: "Application Date",
      dataIndex: "applicationDate",
      width: "12%",
    },
    {
      title: "Status",
      dataIndex: ["projectStatus", "projectStatusName"],
      width: "10%",
    },
    {
      title: "Type",
      dataIndex: ["projectType", "projectTypeName"],
      width: "10%",
    },
    {
      title: "Total Cost",
      dataIndex: "totalProjectCost",
      width: "10%",
    },
    {
      title: "Completion Status",
      dataIndex: ["completionStatus", "completionStatusName"],
      width: "15%",
    },
  ];

  const [messageAPI, messageContext] = message.useMessage();

  // page init calls
  useEffect(() => {
    getProjects();
  }, []);
  // setting navigator object details
  const navigation = useNavigate();
  //setting project details
  const [projects, setProjects] = useState([]);
  //setting selected projects
  const [selectedProjects, setSelectedProjects] = useState([]);

  // --- drawer related
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const projectsSelection = {
    onChange: (selectedProjectIds, selectedProjects) => {
      setSelectedProjects(selectedProjects);
    },
  };

  // function to get list of saved projects
  const getProjects = (searchString) => {
    AdminAPI.getProjects(searchString)
      .then((res) => {
        if (res) {
          // assigning projects to table
          setProjects(res);
          // binding click events to table rows
          setTimeout(() => {
            bindClickToTableRow();
          }, 100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // javascript function to bind click events to table row
  const bindClickToTableRow = () => {
    // assigning click event to table
    document.querySelectorAll(".ant-table-row").forEach((element) => {
      element.addEventListener("click", (ev) => {
        ev.currentTarget.firstChild
          .getElementsByClassName("ant-checkbox-input")[0]
          .click();
      });
    });
  };

  // function call to handle proposals
  const onProposals = () => {
    if (selectedProjects.length === 0) {
      messageAPI.error("Please Select Project to Propose");
      return;
    }

    if (selectedProjects.length > 1) {
      messageAPI.error("Please Select Single Project to Propose");
      return;
    }

    showDrawer();
  };
  // function call to add projects
  const onAddProject = () => {
    navigation("/mainHome/project");
  };
  // function call to edit projects
  const onEditProject = () => {
    if (selectedProjects.length === 0) {
      messageAPI.error("Please Select Project to Edit");
      return;
    }

    if (selectedProjects.length > 1) {
      messageAPI.error("Please Select Single Project to Edit");
      return;
    }

    navigation(`/mainHome/project/${selectedProjects[0].projectId}`);
  };
  // function call to delete projects
  const onDeleteProjects = () => {
    if (selectedProjects.length === 0) {
      messageAPI.error("Please Select Project(s) to Delete");
      return;
    }
    showDeleteConfirm(selectedProjects);
  };

  // delete confirm dialog
  const showDeleteConfirm = (projectsToDelete) => {
    confirm({
      title: `Selected Project(s) : ${projectsToDelete.length} will be deleted permanently?`,
      icon: <ExclamationCircleFilled />,
      okText: "Continue",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const projectIds = projectsToDelete.map((m) => m.projectId);
        projectIds &&
          projectIds.length > 0 &&
          deleteSelectedProjects(projectIds);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // function to delete projects
  const deleteSelectedProjects = (projectIds) => {
    AdminAPI.deleteProjects(projectIds)
      .then((res) => {
        messageAPI.success("Project Deleted Successfully");
        getProjects();
      })
      .catch((err) => {});
  };

  // function call to search projec
  const onSearchProject = (searchText) => {
    getProjects(searchText);
  };

  return (
    <div className="projects mainWindow">
      {messageContext}
      <div className="space-up-down">
        <h3>
          <FundProjectionScreenOutlined /> Projects
        </h3>
      </div>
      <div className="windowAdd searchButtons">
        <Space>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={onProposals}
          >
            Proposals <BankOutlined />
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={onAddProject}
          >
            Add <FundProjectionScreenOutlined />
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<EditOutlined />}
            onClick={onEditProject}
          >
            Edit <FundProjectionScreenOutlined />
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<DeleteOutlined />}
            onClick={onDeleteProjects}
          >
            Delete <FundProjectionScreenOutlined />
          </Button>
        </Space>
      </div>
      <div className="windowAdd">
        <Search
          style={{ width: "25%" }}
          placeholder="Search Project ...."
          onSearch={onSearchProject}
          size="large"
          enterButton
        />
      </div>
      <div className="windowTable space-up-down">
        <Table
          rowSelection={projectsSelection}
          rowKey="projectId"
          columns={columns}
          dataSource={projects}
          size="small"
          bordered
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
      <Drawer
        width={500}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      ></Drawer>
    </div>
  );
}
