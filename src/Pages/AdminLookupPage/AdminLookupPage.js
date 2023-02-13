import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Form } from "antd";
import "./AdminLookupPage.css";
import {
  ExclamationCircleFilled,
  PlusCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { AdminAPI } from "../../apis/AdminAPI";
import AdminTableDetails from "../../shared/AdminMenus";
import { useParams } from "react-router-dom";
const { Search } = Input;
const { confirm } = Modal;

export default function AdminLookupPage() {
  const { id } = useParams();

  const columns = [
    {
      title: AdminTableDetails.getColumn(id).title,
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },
    {
      title: "Edit",
      fixed: "right",
      width: "5%",
      render: (adminLookup) => (
        <a
          onClick={() => {
            onEdit(adminLookup);
          }}
        >
          Edit
        </a>
      ),
    },
    {
      title: "Delete",
      fixed: "right",
      width: "5%",
      render: (adminLookup) => (
        <a
          onClick={() => {
            showDeleteConfirm(adminLookup);
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [adminLookUp, setAdminLookup] = useState([]);
  const [selectedAdminLookup, setSelectedAdminLookup] = useState(null);

  // code to load at page load
  useEffect(() => {
    // get admin lkp list
    onSearch(null);
  }, [id]);

  // api to get admin lk[] list
  const onSearch = (searchText) => {
    AdminAPI.getAdminLookup(+id, searchText)
      .then((res) => {
        const adminLkpList = [];
        res.forEach((lkp) => {
          const adminLkp = {
            name: lkp[`${AdminTableDetails.getColumn(id).refString}Name`],
            description:
              lkp[`${AdminTableDetails.getColumn(id).refString}Desc`],
            id: lkp[`${AdminTableDetails.getColumn(id).refString}Id`],
          };
          adminLkpList.push(adminLkp);
        });
        setAdminLookup(adminLkpList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on add admin lkp click
  const onAdd = () => {
    setOpenModal(true);
  };

  const onEdit = (adminLookup) => {
    setSelectedAdminLookup(adminLookup);
    Modal.destroyAll();
    setOpenModal(true);
  };

  // on save/update click from add popup
  const onSaveOrUpdate = (form) => {
    form
      .validateFields()
      .then((adminLookUp) => {
        form.resetFields();
        if (isEditMode()) {
          editAdminLookup(selectedAdminLookup, adminLookUp);
        } else {
          addAdminLookup(adminLookUp);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // check whether the current mode is edit or add
  const isEditMode = () => {
    return (
      selectedAdminLookup &&
      selectedAdminLookup.id &&
      selectedAdminLookup.id > 0
    );
  };

  // function to handle modal close
  const onModalClose = () => {
    setSelectedAdminLookup(null);
    setOpenModal(false);
    Modal.destroyAll();
  };

  // function to add admin lookup
  const addAdminLookup = (adminLookup) => {
    var adminLookUp = {
      lookupId: +id,
      name: adminLookup.name,
      desc: adminLookup.description,
    };

    AdminAPI.saveAdminLookup(adminLookUp)
      .then((res) => {
        if (res) {
          setOpenModal(false);
          Modal.destroyAll();
          setSelectedAdminLookup(null);
          onSearch(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to edit admin lkp
  const editAdminLookup = (selectedAdminLookup, adminLookup) => {
    var adminLookUp = {
      lookupId: +id,
      id: selectedAdminLookup.id,
      name: adminLookup.name,
      desc: adminLookup.description,
    };

    AdminAPI.updateAdminLookup(adminLookUp)
      .then((res) => {
        if (res) {
          setOpenModal(false);
          Modal.destroyAll();
          setSelectedAdminLookup(null);
          onSearch(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete confirm dialog
  const showDeleteConfirm = (adminLookup) => {
    confirm({
      title: `${AdminTableDetails.getColumn(id).title} '${
        adminLookup.name
      }' will be deleted?`,
      icon: <ExclamationCircleFilled />,
      okText: "Continue",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteAdminLookUp(adminLookup);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // delete admin lkp from database
  const deleteAdminLookUp = (adminLookup) => {
    AdminAPI.deleteAdminLookup({
      lookupId: +id,
      id: adminLookup.id,
    })
      .then((res) => {
        if (res) {
          setSelectedAdminLookup(null);
          onSearch(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   *
   * Code related to admin lkp Modal
   */
  const AdminLookupModal = () => {
    const [form] = Form.useForm();
    return (
      <Modal
        title={
          (isEditMode() ? "Edit" : "Add") +
          ` ${AdminTableDetails.getColumn(id).title}`
        }
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
            name: selectedAdminLookup ? selectedAdminLookup.name : "",
            description: selectedAdminLookup
              ? selectedAdminLookup.description
              : "",
          }}
        >
          <Form.Item
            name="name"
            label={AdminTableDetails.getColumn(id).title}
            rules={[
              {
                required: true,
                message: `Please enter ${
                  AdminTableDetails.getColumn(id).title
                }`,
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
    <div className="adminLkp">
      <div className="pageHeading space-up-down">
        <h3>
          <ProfileOutlined /> {AdminTableDetails.getColumn(id).title}
        </h3>
      </div>
      <div className="adminLkpAdd space-up-down">
        <Button
          style={{ float: "right" }}
          type="primary"
          shape="round"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={onAdd}
        >
          Add {AdminTableDetails.getColumn(id).title}
        </Button>
      </div>
      <div className="adminLkpSearchBar space-up-down">
        <Search
          placeholder={`Search ${AdminTableDetails.getColumn(id).title} ....`}
          onSearch={onSearch}
          size="large"
          enterButton
        />
      </div>
      <div className="adminLkpTable space-up-down">
        <Table
          columns={columns}
          dataSource={adminLookUp}
          size="small"
          bordered
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
      <div>
        <AdminLookupModal />
      </div>
    </div>
  );
}
