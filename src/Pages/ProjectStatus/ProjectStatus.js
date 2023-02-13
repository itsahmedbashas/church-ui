import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Form } from "antd";
import "./ProjectStatus.css";
import {
  ExclamationCircleFilled,
  PlusCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { AdminAPI } from "../../apis/AdminAPI";
const { Search } = Input;
const { confirm } = Modal;

export default function ProjectStatus() {
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
    {
      title: "Edit",
      key: "operation",
      fixed: "right",
      width: "5%",
      render: (projectStatus) => (
        <a
          onClick={() => {
            onEdit(projectStatus);
          }}
        >
          Edit
        </a>
      ),
    },
    {
      title: "Delete",
      key: "operation",
      fixed: "right",
      width: "5%",
      render: (projectStatus) => (
        <a
          onClick={() => {
            showDeleteConfirm(projectStatus);
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [projectStatus, setProjectStatus] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState(null);

  useEffect(() => {
    // get project status list
    onSearch(null);
  }, []);

  // api to get project status list
  const onSearch = (searchText) => {
    AdminAPI.getAdminLookup(4, searchText)
      .then((res) => {
        console.log(res);
        setProjectStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on add project status click
  const onAdd = () => {
    setOpenModal(true);
  };

  const onEdit = (projectStatus) => {
    debugger;
    setSelectedProjectStatus(projectStatus);
    setOpenModal(true);
    console.log(projectStatus);
  };

  // on save/update click from add popup
  const onSaveOrUpdate = (form) => {
    form
      .validateFields()
      .then((projectStatus) => {
        form.resetFields();
        console.log(projectStatus);
        if (
          selectedProjectStatus &&
          selectedProjectStatus.projectStatusId &&
          selectedProjectStatus.projectStatusId > 0
        ) {
          editProjectStatus(selectedProjectStatus, projectStatus);
        } else {
          addProjectStatus(projectStatus);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // check whether the current mode is edit or add
  const isEditMode = () => {
    return (
      selectedProjectStatus &&
      selectedProjectStatus.projectStatusId &&
      selectedProjectStatus.projectStatusId > 0
    );
  };

  // function to handle modal close
  const onModalClose = () => {
    setSelectedProjectStatus(null);
    setOpenModal(false);
  };

  // function to add project status
  const addProjectStatus = (projectStatus) => {
    var adminLookUp = {
      lookupId: 4,
      name: projectStatus.projectStatus,
      desc: projectStatus.description,
    };

    AdminAPI.saveAdminLookup(adminLookUp)
      .then((res) => {
        if (res) {
          setOpenModal(false);
          setSelectedProjectStatus(null);
          onSearch(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to edit project status
  const editProjectStatus = (selectedProjectStatus, projectStatus) => {
    var adminLookUp = {
      lookupId: 4,
      id: selectedProjectStatus.projectStatusId,
      name: projectStatus.projectStatus,
      desc: projectStatus.description,
    };

    AdminAPI.updateAdminLookup(adminLookUp)
      .then((res) => {
        if (res) {
          setOpenModal(false);
          setSelectedProjectStatus(null);
          onSearch(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete confirm dialog
  const showDeleteConfirm = (projectStatus) => {
    confirm({
      title: `Project Status '${projectStatus.projectStatusName}' will be deleted?`,
      icon: <ExclamationCircleFilled />,
      okText: "Continue",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteProjectStatus(projectStatus);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // delete project status from database
  const deleteProjectStatus = (projectStatus) => {
    AdminAPI.deleteAdminLookup({ lookupId: 4, id: projectStatus.projectStatusId})
      .then((res) => {
        if (res) {
          setSelectedProjectStatus(null);
          onSearch(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   *
   * Code related to Project Modal
   */
  const ProjectStatusModal = () => {
    const [form] = Form.useForm();
    return (
      <Modal
        title={(isEditMode() ? "Edit" : "Add") + " Project Status"}
        centered
        open={openModal}
        okText={isEditMode() ? "Update" : "Save"}
        onOk={() => {
          onSaveOrUpdate(form);
        }}
        onCancel={() => onModalClose()}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            projectStatus: selectedProjectStatus
              ? selectedProjectStatus.projectStatusName
              : "",
            description: selectedProjectStatus
              ? selectedProjectStatus.projectStatusDesc
              : "",
          }}
        >
          <Form.Item
            name="projectStatus"
            label="Project Status"
            rules={[
              {
                required: true,
                message: "Please enter Project Status",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="projectStatus">
      <div className="pageHeading space-up-down">
        <h3>
          <ProfileOutlined /> Project Status
        </h3>
      </div>
      <div className="projectStatusAdd space-up-down">
        <Button
          style={{ float: "right" }}
          type="primary"
          shape="round"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={onAdd}
        >
          Add Project Status
        </Button>
      </div>
      <div className="projectStatusSearchBar space-up-down">
        <Search
          placeholder="Search Project Status ...."
          onSearch={onSearch}
          size="large"
          enterButton
        />
      </div>
      <div className="projectTypesTable space-up-down">
        <Table
          columns={columns}
          dataSource={projectStatus}
          size="small"
          bordered
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
      <div>
        <ProjectStatusModal />
      </div>
    </div>
  );
}
